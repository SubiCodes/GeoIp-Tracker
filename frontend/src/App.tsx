import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import AuthLayout from './layouts/AuthLayout';
import MainLayout from './layouts/MainLayout';
import SignIn from './pages/auth/SignIn';
import SignUp from './pages/auth/SignUp';
// import SignIn from './pages/SignIn';
// import SignUp from './pages/SignUp';

function App() {
  return (
    <Router>
      <Routes>

        <Route element={<AuthLayout><Outlet /></AuthLayout>}>
          <Route path="/" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
        </Route>

        <Route element={<MainLayout><Outlet /></MainLayout>}>
          <Route path="/home" element={<div>Home Placeholder</div>} />
          <Route path="/history" element={<div>History Placeholder</div>} />
        </Route>

      </Routes>
    </Router>
  );
}

export default App;
