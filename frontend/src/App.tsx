import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AuthPages from './layouts/AuthPages';
// import SignIn from './pages/SignIn'; // You will add this page later
import { Button } from './components/ui/button'

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <AuthPages>
              {/* Replace with <SignIn /> when you create the page */}
              <div>SignIn Page Placeholder</div>
            </AuthPages>
          }
        />
      </Routes>
      <Button className='bg-red-500'>Hello World</Button>
    </Router>
  );
}

export default App;
