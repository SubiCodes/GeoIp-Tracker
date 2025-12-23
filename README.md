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

Upload use credentials 

---

### 3. Home Screen - User IP & Geolocation Display

**Task:** Display IP and geolocation information of the logged-in user using the provided API URL.

**Implementation:**

[Space for your description]

---

### 4. IP Address Search

**Task:** 
- Allow user to enter a new IP address
- Display geolocation information on the same screen
- Show error if entered data is not a valid IP address

**Implementation:**

[Space for your description]

---

### 5. Clear Search Functionality

**Task:** Ability to clear the search and revert geolocation to the logged-in user's information.

**Implementation:**

[Space for your description]

---

### 6. Search History List

**Task:** Display a list of history searches entered by the user.

**Implementation:**

[Space for your description]

---

### 7. Click History to Display (Optional)

**Task:** Click on history items to display their geolocation information again.

**Implementation:**

[Space for your description]

---

### 8. Multiple History Deletion (Optional)

**Task:** Add checkbox on history list to enable deletion of multiple history items.

**Implementation:**

[Space for your description]

---

### 9. Map Display with Location Pin (Optional - Big Plus)

**Task:** Display a map and pin the exact location of the specified IP address.

**Implementation:**

[Space for your description]

---

## 🧪 Test Credentials

After running the seeder, you can use these credentials to login:

- **Email:** [Add seeded email]
- **Password:** [Add seeded password]

## 🛠️ Technologies Used

### Frontend
- [List your frontend technologies]

### Backend
- [List your backend technologies]

### Database
- [Database technology used]

## 📝 Notes

[Add any additional notes or considerations here]
