import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Courses from "./pages/Courses";
import CourseDetail from "./pages/CourseDetail";
import ModulePage from "./pages/ModulePage";
import Blog from "./pages/Blog";
import About from "./pages/About";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/about" element={<About />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route path="/courses/:id" element={<CourseDetail />} />
        <Route path="/courses/:id/module/:moduleIndex" element={<ModulePage />} />
        <Route path="/courses/:id/module/:moduleIndex/topic/:topicIndex" element={<ModulePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
