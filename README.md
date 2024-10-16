# README

**College ID Number: 123456789**

## Project Overview

This project is a web application built using **React** and **Chakra UI** for the frontend, and it interacts with a backend API to manage scheduling and booking of sports courts. Users can log in, view available slots, and book them accordingly.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [Project Structure](#project-structure)
- [Deployment](#deployment)
- [Assumptions and Limitations](#assumptions-and-limitations)
- [Special Instructions](#special-instructions)
- [Dependencies](#dependencies)

---

## Prerequisites

Before you begin, ensure you have met the following requirements:

- **Node.js** and **npm** installed on your machine. You can download them from [Node.js Official Website](https://nodejs.org/).
- A running instance of the backend API. Update the API endpoints in the code if necessary.
- **Git** installed for version control (optional but recommended).

## Installation

1. **Clone the Repository**

   ```bash
   git clone https://github.com/yourusername/your-repo-name.git
   ```

2. **Navigate to the Project Directory**

   ```bash
   cd your-repo-name
   ```

3. **Install Dependencies**

   ```bash
   npm install
   ```

## Running the Application

### Development Mode

To run the application in development mode with hot-reloading:

```bash
npm start
```

The application will start on `http://localhost:3000` by default.

### Production Build

To create a production build:

```bash
npm run build
```

This will generate optimized static files in the `build` directory.

## Project Structure

- **src/**
  - **components/**
    - `Login.jsx`
    - `ScheduleGrid.jsx`
  - **utils/**
    - `dateUtils.js`
  - **AuthContext.js**
  - **App.js**
- **public/**
  - `index.html`
- **package.json**
- **README.md**

## Deployment

To deploy the application:

1. Ensure that the backend API is accessible from the deployment environment.
2. Upload the `build` directory to your hosting provider.
3. Configure your server to serve `index.html` for all routes (necessary for React Router).

## Assumptions and Limitations

- **Authentication**: The application assumes that user authentication is handled via JWT tokens stored in `localStorage`.
- **API Endpoints**: The frontend expects specific API endpoints (e.g., `/api/user/login`, `/api/centre/getCentre`). Ensure these endpoints are available.
- **Date Range**: The application displays the next 7 days for booking availability.
- **Data Structure**: The code assumes certain structures for the data returned from the API. Modify the code if your API responses differ.

## Special Instructions

- **Environment Variables**: If your API endpoints differ or are hosted elsewhere, update the fetch URLs in the code.
- **Styling Conflicts**: The application uses Chakra UI for styling. Avoid mixing external CSS and Chakra UI styles to prevent conflicts.
- **Booking Limitations**: Users cannot book slots if they are not authenticated.
- **Error Handling**: Basic error handling is implemented. Further enhancements might be necessary for production.

## Dependencies

- **React**: A JavaScript library for building user interfaces.
- **Chakra UI**: A simple, modular, and accessible component library for React.
- **React Router DOM**: For handling routing in the application.
- **Node.js** and **npm**: For running and managing the project.
- **Other Dependencies**: Check `package.json` for a complete list of dependencies.
