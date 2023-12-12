# SwiftEntry: A Financial Management Web App

## Overview

SwiftEntry is a web-based application designed for individuals seeking a seamless and secure way to manage their finances. This app serves as a tool to practice and showcase the integration of Google Authenticator and a full-stack development approach using React for the frontend and Python (Flask) for the backend.

## Key Features

- **User Authentication:** Users can sign up, sign in, and sign out securely. Integration of Google Authenticator provides an additional layer of security and convenience.
- **Financial Management Tools:** Users have access to a variety of tools to track and manage their financial data, including expenses, incomes, and savings.
- **Responsive Design:** The app is fully responsive, providing a consistent experience across various devices and screen sizes.

## Technologies Used

- **Frontend:** React.js, a powerful JavaScript library for building user interfaces.
- **Backend:** Python with Flask framework, offering simplicity and flexibility in server-side processing.
- **Database:** MySQL, for reliable and efficient data storage.
- **Authentication:** Google Authenticator, ensuring secure access to the app.

## Getting Started

To use SwiftEntry from GitHub:

1. **Clone the Repository:**
   ```
   git clone https://github.com/davidd3web/swiftentry.git
   ```
2. **Install Dependencies:**
   - Navigate to the frontend directory and install npm packages:
     ```
     cd swiftentry/frontend
     npm install
     ```
   - Navigate to the backend directory and set up the Python environment:
     ```
     cd ../backend
     python -m venv venv
     source venv/bin/activate  # For Unix or MacOS
     venv\Scripts\activate  # For Windows
     pip install -r requirements.txt
     ```
3. **Set Up Environment Variables:**

   - Create a `.env` file in the backend directory and add your database and email credentials.

4. **Run the Application:**

   - Start the backend server:
     ```
     python app.py
     ```
   - In a new terminal, start the frontend:
     ```
     cd ../frontend
     npm start
     ```

5. **Access the App:**
   - The app should now be running at `http://localhost:3000/`

## Purpose of the Project

This project was developed to practice integrating Google Authenticator into a web application and to refine skills in React and Python web development. It serves as a practical example of implementing user authentication and CRUD operations in a full-stack application.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.
