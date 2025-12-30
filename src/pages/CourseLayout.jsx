import { useParams, useNavigate, Outlet, Link } from "react-router-dom";
import { useState, useEffect } from 'react';
import { getCourse } from '../services/courses';
import './CourseLayout.css';

export default function CourseLayout() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourse = async () => {
      if (!courseId) return;
      try {
        setLoading(true);
        const courseData = await getCourse(courseId);
        setCourse(courseData);
      } catch (error) {
        console.error('Failed to load course:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchCourse();
  }, [courseId]);

  if (loading) {
    return <div className="course-layout"><div className="course-loading">Loading course...</div></div>;
  }

  if (!course) {
    return <div className="course-layout"><div className="course-error">Course not found</div></div>;
  }

  return (
    <div className="course-layout">
      <header className="course-header">
        <button 
          className="back-btn"
          onClick={() => navigate('/dashboard')}
          aria-label="Back to dashboard"
        >
          ← Back to Dashboard
        </button>
        <div className="course-info">
          <h1>{course.title}</h1>
          <p className="course-description">{course.description}</p>
          <span className="course-modules-count">
            {(course.modules || []).length} modules
          </span>
        </div>
      </header>

      <div className="course-content">
        <aside className="module-sidebar" aria-label="Course modules navigation">
          <div className="sidebar-header">
            <h2>Course Modules</h2>
            <span className="module-count">{(course.modules || []).length}</span>
          </div>
          
          <nav className="module-nav">
            <ul className="module-list" role="list">
              {course.modules?.map((module, index) => {
                const moduleSlug = module.slug || module._id || module.id || `module-${index}`;
                return (
                  <li key={module._id || module.id || index} role="listitem">
                    <Link 
                      to={`/dashboard/courses/${courseId}/${moduleSlug}`}
                      className={({ isActive }) => `module-link ${isActive ? 'active' : ''}`}
                    >
                      <span className="module-number">0{index + 1}</span>
                      <span className="module-title">{module.title}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </aside>

        <main className="module-content-area">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
