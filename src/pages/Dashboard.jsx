import { useState, useEffect, useMemo, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getCourses } from '../services/courses';
import { useAuth } from '../context/AuthContext';
import './Dashboard.css';

export default function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState('');
  const [selectedCourseId, setSelectedCourseId] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    
    const fetchCourses = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getCourses({ signal: controller.signal });
        const filteredData = (data || []).filter(course => 
          course.title !== 'Python for Data Science — STEMtribe Africa'
        );
        setCourses(filteredData);
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError('Failed to load courses. Please try refreshing.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
    return () => controller.abort();
  }, []);

  const filteredCourses = useMemo(() => {
    if (!query.trim()) return courses;
    const q = query.toLowerCase();
    return courses.filter(course => 
      course.title?.toLowerCase().includes(q) ||
      course.description?.toLowerCase().includes(q) ||
      course.slug?.toLowerCase().includes(q)
    );
  }, [courses, query]);

  const pluralize = (count, singular, plural = `${singular}s`) => 
    `${count} ${count === 1 ? singular : plural}`;

  const handleLogout = useCallback(() => logout(), [logout]);

  const handleCourseSelect = (courseId) => {
    setSelectedCourseId(courseId);
  };

  const handleOpenCourse = (course) => {
    navigate(`/dashboard/courses/${course._id || course.id}`);
  };

  if (loading) {
    return <div className="dashboard-loading">Loading your courses...</div>;
  }

  return (
    <main className="dashboard">
      {/* Header */}
      <header className="dashboard-header">
        <div className="header-welcome">
          <h1>Welcome, {user?.name || 'Guest'}</h1>
          <p className="role">Role: {user?.role || 'student'}</p>
        </div>
        <div className="header-actions">
          <input
            className="course-search"
            placeholder="Search courses…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button className="btn-logout" onClick={handleLogout}>Logout</button>
        </div>
      </header>

      {error && (
        <section className="error-banner">
          <p>{error}</p>
          <button className="btn-retry" onClick={() => window.location.reload()}>
            Retry
          </button>
        </section>
      )}

      {/* Main Layout */}
      <div className="dashboard-main">
        {/* LEFT SIDEBAR */}
        <aside className="courses-sidebar">
          <div className="sidebar-header">
            <h2>Courses ({courses.length})</h2>
          </div>
          <div className="course-list">
            {filteredCourses.map(course => (
              <button
                key={course._id || course.id}
                className={`course-selector ${selectedCourseId === (course._id || course.id) ? 'active' : ''}`}
                onClick={() => handleCourseSelect(course._id || course.id)}
              >
                <span className="course-number">
                  {filteredCourses.indexOf(course) + 1}
                </span>
                <div className="course-info-sidebar">
                  <div className="course-title-sidebar">{course.title}</div>
                  <div className="course-modules-sidebar">
                    {pluralize((course.modules || []).length, 'module')}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </aside>

        {/* MAIN CONTENT */}
        <section className="dashboard-content">
          <section className="courses-meta">
            <p className="count">
              Showing {pluralize(filteredCourses.length, 'course')}
            </p>
          </section>

          <section className="courses-grid">
            {filteredCourses.length > 0 ? (
              filteredCourses.map(course => (
                <article
                  key={course._id || course.id}
                  className={`course-card ${selectedCourseId === (course._id || course.id) ? 'selected' : ''}`}
                >
                  <header className="course-header">
                    <h3 className="course-title">{course.title}</h3>
                    <p className="course-desc">{course.description}</p>
                  </header>
                  <footer className="card-footer">
                    <button
                      className="open-course btn"
                      onClick={() => handleOpenCourse(course)}
                    >
                      Open Course →
                    </button>
                    <span className="modules-count">
                      {pluralize((course.modules || []).length, 'module')}
                    </span>
                  </footer>
                </article>
              ))
            ) : (
              <div className="no-courses">
                <p>{query ? `No courses match "${query}"` : 'No courses available.'}</p>
              </div>
            )}
          </section>
        </section>
      </div>
    </main>
  );
}
