import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import AuthLayout from './layouts/AuthLayout';
import MainLayout from './layouts/MainLayout';
import SignIn from './pages/auth/SignIn';
import SignUp from './pages/auth/SignUp';
import Home from './pages/main/Home';

function App() {
  return (
    <Router>
      <Routes>

        <Route element={<AuthLayout><Outlet /></AuthLayout>}>
          <Route path="/" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
        </Route>

        <Route element={<MainLayout><Outlet /></MainLayout>}>
          <Route path="/home" element={<Home />} />
        </Route>

      </Routes>
    </Router>
  );
}

export default App;
