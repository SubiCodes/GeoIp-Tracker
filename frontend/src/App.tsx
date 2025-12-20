import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import AuthLayout from './layouts/AuthLayout';
import MainLayout from './layouts/MainLayout';
import SignIn from './pages/auth/SignIn';
// import SignIn from './pages/SignIn';
// import SignUp from './pages/SignUp';

function App() {
  return (
    <Router>
      <Routes>

        <Route element={<AuthLayout><Outlet /></AuthLayout>}>
          <Route path="/" element={<SignIn />} />
          <Route path="/signup" element={<div>SignUp Page Placeholder</div>} />
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
