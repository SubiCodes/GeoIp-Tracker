import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import AuthPages from './layouts/AuthPages';
// import SignIn from './pages/SignIn';
// import SignUp from './pages/SignUp';

function App() {
  return (
    <Router>
      <Routes>

        <Route element={<AuthPages><Outlet /></AuthPages>}>
          <Route path="/" element={<div>SignIn Page Placeholder</div>} />
          <Route path="/signup" element={<div>SignUp Page Placeholder</div>} />
        </Route>

      </Routes>
    </Router>
  );
}

export default App;
