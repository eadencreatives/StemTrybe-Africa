import { useState, useEffect, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
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
  const handleCourseSelect = (courseId) => setSelectedCourseId(courseId);
  const handleOpenCourse = (course) => navigate(`/dashboard/courses/${course._id || course.id}`);

  if (loading) {
    return <div className="dashboard-loading">Loading your courses...</div>;
  }

  return (
    <main className="dashboard">
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

      <div className="dashboard-main">
        {/* TOP: Course Selector (Vertical List Style) */}
        <section className="courses-selector">
          <div className="selector-header">
            <h2>Courses ({pluralize(courses.length, 'course')})</h2>
          </div>
          <div className="courses-vertical-list">
            {filteredCourses.map(course => (
              <article
                key={course._id || course.id}
                className={`course-item ${selectedCourseId === (course._id || course.id) ? 'selected' : ''}`}
              >
                <div className="course-preview">
                  <span className="course-number">{filteredCourses.indexOf(course) + 1}</span>
                  <div className="course-details">
                    <h3 className="course-title">{course.title}</h3>
                    <p className="course-desc">{course.description}</p>
                  </div>
                </div>
                <div className="course-actions">
                  <button
                    className="select-btn"
                    onClick={() => handleCourseSelect(course._id || course.id)}
                  >
                    Select
                  </button>
                  <button
                    className="open-btn"
                    onClick={() => handleOpenCourse(course)}
                  >
                    Open →
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>

      {filteredCourses.length === 0 && (
        <div className="no-courses">
          <p>{query ? `No courses match "${query}"` : 'No courses available.'}</p>
        </div>
      )}
    </main>
  );
}
