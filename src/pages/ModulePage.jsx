import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getCourseById } from '../services/courses';
import './CourseModules.css';

export default function CourseModules() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    
    const fetchCourse = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getCourseById(courseId, { signal: controller.signal });
        setCourse(data);
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError('Failed to load course details.');
          console.error('Course fetch error:', err);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
    return () => controller.abort();
  }, [courseId]);

  if (loading) {
    return (
      <main className="course-modules" role="main">
        <div className="loading" aria-live="polite">
          Loading course modules...
        </div>
      </main>
    );
  }

  if (error || !course) {
    return (
      <main className="course-modules" role="main">
        <div className="error-state" role="alert">
          <p>{error || 'Course not found'}</p>
          <Link to="/dashboard" className="btn-back">
            ← Back to Dashboard
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="course-modules" role="main">
      <header className="course-header">
        <button 
          onClick={() => navigate('/dashboard')} 
          className="btn-back"
          aria-label="Back to dashboard"
        >
          ← Back to Dashboard
        </button>
        <h1>{course.title}</h1>
        <p className="course-description">{course.description}</p>
      </header>

      <section className="modules-section" aria-label="Course modules">
        <h2>Modules ({course.modules?.length || 0})</h2>
        
        {course.modules && course.modules.length > 0 ? (
          <div className="modules-list">
            {course.modules.map((module, index) => (
              <article 
                key={module._id || module.id || index} 
                className="module-card"
              >
                <div className="module-number">
                  <span aria-label={`Module ${index + 1}`}>
                    {index + 1}
                  </span>
                </div>
                <div className="module-content">
                  <h3>{module.title}</h3>
                  {module.description && (
                    <p className="module-description">{module.description}</p>
                  )}
                  {module.duration && (
                    <span className="module-duration" aria-label={`Duration: ${module.duration}`}>
                      ⏱️ {module.duration}
                    </span>
                  )}
                </div>
                <div className="module-actions">
                  <Link
                    to={`/dashboard/courses/${courseId}/modules/${module._id || module.id}`}
                    className="btn-start"
                    aria-label={`Start module: ${module.title}`}
                  >
                    Start Module →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="no-modules" role="status">
            <p>No modules available for this course yet.</p>
          </div>
        )}
      </section>
    </main>
  );
}
