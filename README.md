Certainly! I'll update the previously provided `README.md` to include a **"Live Demo"** section where you can provide links to your deployed frontend and backend applications. This addition will help users and collaborators quickly access and interact with your project.

Below is the **updated `README.md`** with the new section included. I've also highlighted where to insert your actual deployment links.

---

# README

**College ID Number: IEC2021057**

## Project Overview

This project is a web application built using **React** and **Chakra UI** for the frontend, and **Express.js** with **MongoDB** for the backend. It allows users to log in, view available sports court slots, and make bookings accordingly. The application ensures secure authentication, real-time slot availability, and a user-friendly interface.

## Table of Contents

- [Live Demo](#live-demo)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [Project Structure](#project-structure)
- [Deployment](#deployment)
- [Assumptions and Limitations](#assumptions-and-limitations)
- [Special Instructions](#special-instructions)
- [Dependencies](#dependencies)

---

## Live Demo

Access the live versions of the frontend and backend applications through the links below:

- **Frontend Application:** [https://game-theory-alpha.vercel.app/login](https://game-theory-alpha.vercel.app/login)
- **Backend API:** [https://game-theory-7pdf.onrender.com](https://game-theory-7pdf.onrender.com)

*Replace the placeholder URLs with your actual deployed application links.*

---

## Prerequisites

Before you begin, ensure you have met the following requirements:

- **Node.js** and **npm** installed on your machine. You can download them from [Node.js Official Website](https://nodejs.org/).
- A running instance of the backend API. Update the API endpoints in the code if necessary.
- **Git** installed for version control (optional but recommended).

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

The frontend application will start on `http://localhost:3000` by default, and the backend API will run on `http://localhost:5000`.

### Production Build

To create a production build for the frontend:

```bash
npm run build
```

This will generate optimized static files in the `build` directory.

---

## Project Structure

- **frontend/**
  - **src/**
    - **components/**
      - `Login.jsx`
      - `Register.jsx`
      - `ScheduleGrid.jsx`
      - `...`
    - **utils/**
      - `dateUtils.js`
    - **contexts/**
      - `AuthContext.js`
    - `App.js`
    - `index.js`
  - **public/**
    - `index.html`
  - `package.json`
  - `README.md`
  
- **backend/**
  - **controllers/**
    - `userController.js`
    - `...`
  - **routes/**
    - `userRoute.js`
    - `...`
  - `server.js`
  - `package.json`
  - `.env`
  
- `.gitignore`
- `README.md`

---

## Deployment

The application is deployed using [Render.com](https://render.com/). Below are the steps to deploy both the frontend and backend applications.

### Frontend Deployment

1. **Connect Repository:**
   - Log in to Render.com and connect your GitHub repository.

2. **Create a New Static Site:**
   - Select the `frontend` directory.
   - Set the build command to `npm run build`.
   - Set the publish directory to `build`.

3. **Environment Variables:**
   - If required, set environment variables in Render.com's dashboard.

4. **Deploy:**
   - Render.com will automatically build and deploy your frontend application.

### Backend Deployment

1. **Connect Repository:**
   - Log in to Render.com and connect your GitHub repository.

2. **Create a New Web Service:**
   - Select the `backend` directory.
   - Set the build command to `npm install`.
   - Set the start command to `npm start`.

3. **Environment Variables:**
   - Add necessary environment variables such as:
     - `PORT=5000`
     - `MONGO_URI=your_mongodb_connection_string`
     - `JWT_SECRET=your_jwt_secret`
     - Any other required variables.

4. **Deploy:**
   - Render.com will automatically install dependencies and start your backend server.

---

## Assumptions and Limitations

- **Authentication:** The application assumes that user authentication is handled via JWT tokens stored securely in `localStorage`.
- **API Endpoints:** The frontend expects specific API endpoints (e.g., `/api/user/login`, `/api/centre/getCentre`). Ensure these endpoints are available and correctly configured.
- **Date Range:** The application displays the next 7 days for booking availability.
- **Data Structure:** The code assumes certain structures for the data returned from the API. Modify the code if your API responses differ.
- **Deployment Environment:** The backend is deployed on a Linux-based environment. Ensure all native modules are compatible or use pure JavaScript alternatives.

---

## Special Instructions

- **Environment Variables:** 
  - For security, set environment variables directly in the deployment environment (Render.com dashboard) instead of using `.env` files in production.
  
- **Styling Conflicts:** 
  - The application uses Chakra UI for styling. Avoid mixing external CSS and Chakra UI styles to prevent conflicts.

- **Booking Limitations:** 
  - Users cannot book slots if they are not authenticated. Ensure proper authentication flow is maintained.

- **Error Handling:** 
  - Basic error handling is implemented. Further enhancements might be necessary for production, such as more descriptive error messages and logging.

---

## Dependencies

- **Frontend:**
  - **React:** A JavaScript library for building user interfaces.
  - **Chakra UI:** A simple, modular, and accessible component library for React.
  - **React Router DOM:** For handling routing in the application.
  
- **Backend:**
  - **Express.js:** A fast, unopinionated, minimalist web framework for Node.js.
  - **MongoDB & Mongoose:** For database management.
  - **bcryptjs:** For hashing passwords (replacing `bcrypt` to avoid native module issues).
  - **jsonwebtoken:** For handling JWT tokens.
  - **dotenv:** For loading environment variables.
  - **cors:** For enabling Cross-Origin Resource Sharing.
  - **body-parser:** For parsing incoming request bodies.
  
- **Other Tools:**
  - **Nodemon:** For automatically restarting the server during development.
  - **Axios:** For making HTTP requests from the frontend.

*For a complete list of dependencies and their versions, refer to the respective `package.json` files in the `frontend` and `backend` directories.*

---

## Additional Notes

- **Responsive Design:** 
  - The application is responsive and should display well on various screen sizes due to the use of Chakra UI and flexible CSS units.

- **Consistent Styling Across Components:** 
  - Ensure that similar styling adjustments are made to other components to maintain a consistent look and feel throughout the application.

- **Security Best Practices:** 
  - Always manage sensitive information through environment variables set in your deployment environment rather than committing `.env` files to version control.

- **Regularly Update Dependencies:** 
  - Keep your dependencies up-to-date to benefit from security patches and new features.
