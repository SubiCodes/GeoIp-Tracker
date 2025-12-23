# IP Geolocation Application

A full-stack application for tracking IP address geolocation information with user authentication and search history.

## 🚀 Deployment Links

- **Frontend:** (https://geoip-tracker.vercel.app/)
- **Backend API:** (https://geoip-tracker-production.up.railway.app)

## 💻 Running Locally

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- 
### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the backend directory with the following variables:
```env
JWT_SECRET=your_secret_key
MONGO_URI=your_database_connection_string
FRONTEND_URI=defaults to localhsot if not provided
```

4. Start the development server:
```bash
npm run dev
```

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the frontend directory with the following variables:
```env
VITE_API_URL=link to your backend default to 3000
```

4. Start the development server:
```bash
npm run dev
```

The application should now be running on `http://localhost:5173` (frontend) and `http://localhost:3000` (backend).

## ✅ Task Implementation

### 1. App Routing & Authentication

**Task:** On every app open, redirect user to Login Page if not logged in, or Home Screen if logged in.

**Implementation:**

Implemented JWT authentication with route protection. Auth pages check for valid tokens on mount and redirect authenticated users to the dashboard automatically.

---

### 2. Login Screen

**Task:** 
- Implement a simple login form requiring email and password
- Validate credentials against the database
- Create a User Seeder for login testing
- Redirect to home upon successful authentication

**Implementation:**

Ask users for the email and login then check if it already exists or match the format we need. Redirect the uer to the home page once successful. Use this commands to seed a user: cd backend, npm run seed.

---

### 3. Home Screen - User IP & Geolocation Display

**Task:** Display IP and geolocation information of the logged-in user using the provided API URL.

**Implementation:**

Valdite user cookie with JWT and used the open source API '`https://ipwho.is/' to get location information about the current IP of the user. Use the geo location data to dispaly the map using react-leaflet library

---

### 4. IP Address Search

**Task:** 
- Allow user to enter a new IP address
- Display geolocation information on the same screen
- Show error if entered data is not a valid IP address

**Implementation:**

Used a global state management(zustand) to trach the newly added IP's and used the latest uploaded one as the displayed IP.  Passed it in the database as well to keep track of what the users IP's are.

---

### 5. Clear Search Functionality

**Task:** Ability to clear the search and revert geolocation to the logged-in user's information.

**Implementation:**

Fetch the users IP's from the backend and store them to the global state management to prevent the need of refresh to update the UI. Once the user removed a IP in the history the app checks again whats the lates IP exists. If there are no IP left in the store or DB, the app reeverts back to the use of the current users IP

---

### 6. Search History List

**Task:** Display a list of history searches entered by the user.

**Implementation:**

Used zustand and mongodb to handle the history of IP's gracefully.
---

### 7. Click History to Display (Optional)

**Task:** Click on history items to display their geolocation information again.

**Implementation:**

Able to set an IP in the history list as the current IP again by simply pusing it to the top.

---

### 8. Multiple History Deletion (Optional)

**Task:** Add checkbox on history list to enable deletion of multiple history items.

**Implementation:**

Added the checkbox feature using the ShadCN library

---

### 9. Map Display with Location Pin (Optional - Big Plus)

**Task:** Display a map and pin the exact location of the specified IP address.

**Implementation:**

Displayed the map by getting the geolocation information (longitude, latitude) and passing it to the reac-leaflet library to display and pin the exact location

---


