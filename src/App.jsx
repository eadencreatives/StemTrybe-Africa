import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Courses from "./pages/Courses";
import Blog from "./pages/Blog";
import About from "./pages/About";
import ProtectedRoute from "./components/ProtectedRoute";
import CourseLayout from "./pages/CourseLayout"; // NEW: Course layout with module sidebar
import ModulePage from "./pages/ModulePage";     // NEW: Individual module content

// Layout wrapper to conditionally show Navbar
function Layout({ children }) {
  const location = useLocation();
  
  // Don't show Navbar on login and dashboard pages
  const hideNavbar = location.pathname === '/login' || 
                     location.pathname.startsWith('/dashboard');
  
  return (
    <>
      {!hideNavbar && <Navbar />}
      {children}
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/about" element={<About />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/login" element={<Login />} />
          
          {/* Protected Dashboard Routes with Nested Course Navigation */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          >
            {/* Nested routes for course modules */}
            <Route path="courses/:courseId" element={<CourseLayout />} />
            <Route path="courses/:courseId/:moduleId" element={<ModulePage />} />
          </Route>
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
