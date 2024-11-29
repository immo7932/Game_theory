## **Instructions for Using the Sports Court Booking System**

### For Customers (Users)

1. **Registration**:
   - Go to the **Registration** page.
   - Enter your **Name**, **Email**, and **Password**.
   - Click **Register**. Confirm your email to activate your account.

2. **Login**:
   - Go to the **Login** page.
   - Enter your **Email** and **Password**.
   - Click **Login** to access your account.
   - If you forget your password, use **Forgot Password** to reset it.

3. **Browse Available Court Slots**:
   - After logging in, view available slots on the **Dashboard**.
   - Filter by date, time, and court type (Tennis, Basketball, etc.).

4. **Booking a Court**:
   - Select a court and time.
   - Click **Book Now** and confirm the details.
   - Once booked, you will receive a confirmation email.

5. **View Your Bookings**:
   - On the **Dashboard**, view and manage your bookings.

6. **Logout**:
   - Click **Logout** when you're done.

---

### For Managers (Admin)

1. **Login**:
   - Go to the **Manager Login** page.
   - Enter your **Manager Email** and **Password**.
   - Click **Login**.

2. **Managing Court Slots**:
   - Add or remove available slots in the **Admin Dashboard**.
   - Modify or delete slots as needed.

3. **Managing User Bookings**:
   - View and manage all customer bookings.
   - Cancel or modify bookings if necessary.

4. **View Reports and Analytics**:
   - View reports on court usage, booking trends, and user activity.

5. **Logout**:
   - Click **Logout** when you're done.

---

### Additional Notes:
- **Booking Confirmation**: Both customers and managers will receive email confirmations upon booking.
- **Court Availability**: Only available slots are shown to users.

---

## Project Overview
This project is a web application built using React for the frontend, and Express.js with MongoDB for the backend. It allows users to log in, view available sports court slots, and make bookings accordingly. The application ensures secure authentication, real-time slot availability, and a user-friendly interface.

---

## Table of Contents
1. Live Demo
2. Project Report
3. Prerequisites
4. Installation
5. Running the Application
6. Project Structure
7. Deployment
8. Assumptions and Limitations
9. Special Instructions
10. Dependencies

---

## Live Demo
Access the live versions of the frontend and backend applications through the links below:

- **Frontend Application**: [https://game-theory-alpha.vercel.app/login](https://game-theory-alpha.vercel.app/login)
- **Backend API**: [https://game-theory-7pdf.onrender.com](https://game-theory-7pdf.onrender.com)

## Project Report
- **[Project Report Link](https://drive.google.com/file/d/1a9qBbro1KgwunFma3TKujofIxAJraKNu/view?usp=sharing)**

---

## Prerequisites
Before you begin, ensure you have met the following requirements:

- Node.js and npm installed on your machine. You can download them from [Node.js Official Website](https://nodejs.org).
- A running instance of the backend API. Update the API endpoints in the code if necessary.
- Git installed for version control (optional but recommended).

---

## Installation
1. **Clone the Repository**
   ```bash
   git clone https://github.com/immo7932/Game_theory.git
   ```

2. **Navigate to the Project Directory**
   ```bash
   cd Game_theory
   ```

3. **Install Dependencies**
   ```bash
   npm install
   ```

---

## Running the Application

### Development Mode
To run the application in development mode with hot-reloading:
```bash
npm start
```
The frontend application will start on [http://localhost:3000](http://localhost:3000) by default, and the backend API will run on [http://localhost:5000](http://localhost:5000).

### Production Build
To create a production build for the frontend:
```bash
npm run build
```
This will generate optimized static files in the `build` directory.

---

## Project Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   └── ScheduleGrid.jsx
│   ├── utils/
│   │   └── dateUtils.js
│   ├── contexts/
│   │   └── AuthContext.js
│   ├── App.js
│   └── index.js
└── public/
    └── index.html

backend/
├── controllers/
│   ├── userController.js
├── routes/
│   ├── userRoute.js
└── server.js
```

---

## Deployment

### Frontend Deployment
1. **Connect Repository**: Log in to Render.com and connect your GitHub repository.
2. **Create a New Static Site**: Select the frontend directory.
3. **Set Build Command**: `npm run build`
4. **Set Publish Directory**: `build`
5. **Deploy**: Render.com will automatically build and deploy your frontend application.

### Backend Deployment
1. **Connect Repository**: Log in to Render.com and connect your GitHub repository.
2. **Create a New Web Service**: Select the backend directory.
3. **Set Build Command**: `npm install`
4. **Set Start Command**: `npm start`
5. **Add Environment Variables**: 
   - `PORT=5000`
   - `MONGO_URI=your_mongodb_connection_string`
   - `JWT_SECRET=your_jwt_secret`
6. **Deploy**: Render.com will automatically install dependencies and start your backend server.

---

## Assumptions and Limitations
- **Authentication**: The application assumes that user authentication is handled via JWT tokens stored securely in localStorage.
- **API Endpoints**: The frontend expects specific API endpoints (e.g., `/api/user/login`, `/api/centre/getCentre`). Ensure these endpoints are available and correctly configured.
- **Date Range**: The application displays the next 7 days for booking availability.
- **Data Structure**: The code assumes certain structures for the data returned from the API. Modify the code if your API responses differ.
- **Deployment Environment**: The backend is deployed on a Linux-based environment. Ensure all native modules are compatible or use pure JavaScript alternatives.

---

## Special Instructions

- **Environment Variables**: For security, set environment variables directly in the deployment environment (Render.com dashboard) instead of using `.env` files in production.
- **Styling Conflicts**: The application uses Chakra UI for styling. Avoid mixing external CSS and Chakra UI styles to prevent conflicts.
- **Booking Limitations**: Users cannot book slots if they are not authenticated. Ensure proper authentication flow is maintained.
- **Error Handling**: Basic error handling is implemented. Further enhancements might be necessary for production, such as more descriptive error messages and logging.

---

## Dependencies

### Frontend:
- React
- React Router DOM

### Backend:
- Express.js
- MongoDB & Mongoose
- bcryptjs
- jsonwebtoken
- dotenv
- cors
- body-parser

### Other Tools:
- Nodemon
- Axios

For a complete list of dependencies and their versions, refer to the respective `package.json` files in the frontend and backend directories.

---



### Regularly Update Dependencies:
Keep your dependencies up-to-date to benefit from security patches and new features.

---

Now, the **instructions** are added first, followed by the rest of the README content.
