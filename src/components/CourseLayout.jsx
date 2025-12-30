// components/CourseLayout.jsx
import { useParams, useNavigate, Outlet, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getCourseById } from '../services/courses'; // Update your service
import './CourseLayout.css';

export default function CourseLayout() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const courseData = await getCourseById(courseId);
        setCourse(courseData);
      } catch (error) {
        console.error('Failed to load course:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchCourse();
  }, [courseId]);

  if (loading) return <div className="course-loading">Loading course...</div>;

  if (!course) return <div className="course-error">Course not found</div>;

  return (
    <div className="course-layout">
      {/* Course Header */}
      <header className="course-header">
        <button 
          className="back-btn" 
          onClick={() => navigate(-1)}
          aria-label="Back to dashboard"
        >
          ← Back
        </button>
        <div className="course-info">
          <h1>{course.title}</h1>
          <p>{course.description}</p>
        </div>
      </header>

      <div className="course-content">
        {/* Module Navigation Sidebar */}
        <aside className="module-sidebar">
          <nav aria-label="Course modules">
            <h2>Modules ({course.modules?.length || 0})</h2>
            <ul className="module-list">
              {course.modules?.map((module, index) => {
                const modulePath = `/courses/${courseId}/${module._id || module.id || index}`;
                return (
                  <li key={module._id || module.id || index}>
                    <Link 
                      to={modulePath}
                      className="module-link"
                      aria-current={window.location.pathname === modulePath ? 'page' : undefined}
                    >
                      <span className="module-number">0{index + 1}</span>
                      {module.title}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </aside>

        {/* Module Content Area */}
        <main className="module-content">
          <Outlet /> {/* Renders ModulePage or fallback */}
        </main>
      </div>
    </div>
  );
}
