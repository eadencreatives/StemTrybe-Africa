import { useState, useEffect, useMemo, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { getCourses } from '../services/courses';
import { useAuth } from '../context/AuthContext';
import './Dashboard.css';

export default function Dashboard() {
  const { user, logout } = useAuth();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState('');

  useEffect(() => {
    const controller = new AbortController();
    
    const fetchCourses = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getCourses({ signal: controller.signal });
        // Filter out the specific course
        const filteredData = (data || []).filter(course => 
          course.title !== 'Python for Data Science — STEMtribe Africa'
        );
        setCourses(filteredData);
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError('Failed to load courses. Please try refreshing.');
          console.error('Dashboard fetch error:', err);
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

  const handleLogout = useCallback(() => {
    logout();
  }, [logout]);

  if (loading) {
    return (
      <main className="dashboard" role="main" aria-label="Loading dashboard">
        <div className="dashboard-loading" aria-live="polite">
          Loading your courses...
        </div>
      </main>
    );
  }

  return (
    <main className="dashboard" role="main" aria-label="Course dashboard">
      <header className="dashboard-header">
        <div className="header-welcome">
          <h1>Welcome, {user?.name || 'Guest'}</h1>
          <p className="role" aria-label={`User role: ${user?.role || 'student'}`}>
            Role: <span aria-hidden="true">{user?.role || 'student'}</span>
          </p>
        </div>
        <div className="header-actions">
          <label htmlFor="course-search" className="sr-only">Search courses</label>
          <input
            id="course-search"
            aria-label="Search courses by title, description or slug"
            className="course-search"
            placeholder="Search courses by title or description…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            type="search"
          />
          <button className="btn-logout" onClick={handleLogout} aria-label="Log out">
            Logout
          </button>
        </div>
      </header>

      {error && (
        <section className="error-banner" role="alert" aria-live="assertive">
          <p>{error}</p>
          <button onClick={() => window.location.reload()} className="btn-retry">
            Retry
          </button>
        </section>
      )}

      <section className="courses-meta" aria-label="Courses metadata">
        <p className="count" aria-live="polite">
          Showing {pluralize(filteredCourses.length, 'course')}
        </p>
      </section>

      <section className="courses-grid" role="grid" aria-label="Courses grid">
        {filteredCourses.length > 0 ? (
          filteredCourses.map(course => (
            <article
              key={course._id || course.id}
              className="course-card"
              role="gridcell"
              tabIndex={0}
            >
              <header className="course-header">
                <h3 className="course-title">{course.title}</h3>
                <p className="course-desc">{course.description}</p>
              </header>
              <footer className="card-footer">
                <Link
                  className="open-course btn"
                  to={`/dashboard/courses/${course._id || course.id}`}
                  aria-label={`Open course: ${course.title}`}
                >
                  Open Course →
                </Link>
                <span 
                  className="modules-count" 
                  aria-label={`${pluralize((course.modules || []).length, 'module')} available`}
                >
                  {pluralize((course.modules || []).length, 'module')}
                </span>
              </footer>
            </article>
          ))
        ) : (
          <div className="no-courses" role="status" aria-live="polite">
            <p>{query ? `No courses match "${query}"` : 'No courses available yet.'}</p>
            {query && (
              <button className="btn-clear-search" onClick={() => setQuery('')}>
                Clear search
              </button>
            )}
          </div>
        )}
      </section>
    </main>
  );
}
