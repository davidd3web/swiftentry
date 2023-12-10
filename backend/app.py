from flask import Flask, request, jsonify, current_app
from itsdangerous import URLSafeTimedSerializer
from flask_mail import Mail, Message
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash
from werkzeug.security import check_password_hash
from dotenv import load_dotenv
import os

load_dotenv()

app = Flask(__name__)
CORS(app)

app.config['SECRET_KEY'] = os.getenv('SECRET_KEY')
app.config['SECURITY_PASSWORD_SALT'] = os.getenv('SECURITY_PASSWORD_SALT')

app.config['SQLALCHEMY_DATABASE_URI'] = f"mysql+mysqlconnector://{os.getenv('DB_USER')}:{os.getenv('DB_PASSWORD')}@{os.getenv('DB_HOST')}/{os.getenv('DB_NAME')}"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

# Configure Flask-Mail
app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 587
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USE_SSL'] = False
app.config['MAIL_USERNAME'] = os.getenv('EMAIL_USER')
app.config['MAIL_PASSWORD'] = os.getenv('EMAIL_PASSWORD')
app.config['MAIL_DEFAULT_SENDER'] = ('SwiftEntry', os.getenv('EMAIL_USER'))

mail = Mail(app)

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    full_name = db.Column(db.String(120), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(256), nullable=False)

@app.route('/api/signin', methods=['POST'])
def signin():
    data = request.json
    user = User.query.filter_by(email=data['email']).first()
    
    if user and check_password_hash(user.password, data['password']):
        return jsonify({'message': 'Successfully signed in'}), 200
    else:
        return jsonify({'error': 'Invalid email or password'}), 401


@app.route('/api/submit-form', methods=['POST'])
def submit_form():
    data = request.json
    print("Received data:", data)
    hashed_password = generate_password_hash(data['password'])

    # Perform your validation and processing here
    new_user = User(full_name=data['fullName'], email=data['email'], password=hashed_password)
    try:  
      db.session.add(new_user)
      db.session.commit()
      return jsonify({'message': 'User created successfully'}), 200
    except KeyError as e:
        return jsonify({'error': f'Missing field: {e.args[0]}'}), 400
    except Exception as e:
        return jsonify({'error': str(e)}), 400
    
@app.route('/api/request-password-reset', methods=['POST'])
def request_password_reset():
    data = request.json
    user_email = data['email']
    user = User.query.filter_by(email=user_email).first()
    if user:
        # User exists, proceed with token creation and email sending
        token = create_token(user_email)
        send_reset_email(user_email, token)
    return jsonify({'message': 'If your email is in our system, you will receive a password reset link.'}), 200

def create_token(email):
    serializer = URLSafeTimedSerializer(current_app.config['SECRET_KEY'])
    return serializer.dumps(email, salt=current_app.config['SECURITY_PASSWORD_SALT'])

def confirm_token(token, expiration=3600):
    serializer = URLSafeTimedSerializer(current_app.config['SECRET_KEY'])
    try:
        email = serializer.loads(
            token,
            salt=current_app.config['SECURITY_PASSWORD_SALT'],
            max_age=expiration
        )
    except:
        return False
    return email

def send_reset_email(user_email, token):
    reset_url = f'http://localhost:3000/reset-password/{token}'
    msg = Message('Password Reset Request', recipients=[user_email])
    msg.body = f'''To reset your password, visit the following link: {reset_url}
                If you did not make this request then simply ignore this email and no changes will be made.
                '''
    mail.send(msg)

@app.route('/api/reset-password', methods=['POST'])
def reset_password():
    data = request.json
    token = data.get('token')
    new_password = data.get('newPassword')
    
    email = confirm_token(token)
    if email:
        user = User.query.filter_by(email=email).first()
        if user:
            hashed_password = generate_password_hash(new_password)
            user.password = hashed_password
            db.session.commit()
            return jsonify({'message': 'Your password has been updated.'}), 200
        return jsonify({'error': 'User not found'}), 404
    return jsonify({'error': 'Invalid or expired token'}), 400

if __name__ == '__main__':
    app.run(debug=True)
