import { useEffect, useState, useMemo } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { getCourses } from '../services/courses';
import { useAuth } from "../context/AuthContext";
import './Dashboard.css';

export default function Dashboard() {
  const { user, logout } = useAuth();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Fetch courses from API
  useEffect(() => {
    let isMounted = true;

    async function fetchCourses() {
      try {
        const data = await getCourses();
        if (isMounted) setCourses(data || []);
      } catch (err) {
        console.error('Failed to fetch courses:', err);
        if (isMounted) setError('Failed to load courses. Please try again later.');
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    fetchCourses();
    return () => { isMounted = false; };
  }, []);

  // Filter courses based on search query
  const filteredCourses = useMemo(() => {
    if (!searchQuery) return courses;
    const query = searchQuery.toLowerCase();
    return courses.filter(course =>
      (course.title || '').toLowerCase().includes(query) ||
      (course.description || '').toLowerCase().includes(query) ||
      (course.slug || '').toLowerCase().includes(query)
    );
  }, [courses, searchQuery]);

  if (loading) return <div className="dashboard-loading">Loading dashboard…</div>;
  if (error) return <div className="dashboard-error">{error}</div>;

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <aside className="dashboard-sidebar">
        <div className="sidebar-user">
          <h2>{user?.name || 'Guest'}</h2>
          <p className="role">{user?.role || 'student'}</p>
        </div>

        <nav className="sidebar-nav">
          <NavLink to="/" className={({ isActive }) => isActive ? 'active' : ''}>Dashboard</NavLink>
          <NavLink to="/courses" className={({ isActive }) => isActive ? 'active' : ''}>Courses</NavLink>
          <NavLink to="/profile" className={({ isActive }) => isActive ? 'active' : ''}>Profile</NavLink>
          <button className="btn-logout" onClick={logout}>Logout</button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="dashboard-main">
        <header className="dashboard-header">
          <h1>Welcome, {user?.name || 'Guest'}</h1>

          <div className="header-actions">
            <input
              type="text"
              aria-label="Search courses"
              placeholder="Search courses by title, description, or slug"
              className="course-search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </header>

        {/* Courses Meta */}
        <section className="courses-meta">
          <p className="count">
            Showing {filteredCourses.length} course{filteredCourses.length !== 1 ? 's' : ''}
          </p>
        </section>

        {/* Courses Grid */}
        <section className="courses-grid" aria-live="polite">
          {filteredCourses.length > 0 ? (
            filteredCourses.map(course => (
              <article key={course._id || course.id} className="course-card">
                <h3>{course.title}</h3>
                <p className="course-desc">{course.description}</p>
                <div className="card-footer">
                  <Link className="open-course" to={`/courses/${course._id || course.id}`}>
                    Open Course
                  </Link>
                  <span className="modules-count">
                    {(course.modules || []).length} module{(course.modules || []).length !== 1 ? 's' : ''}
                  </span>
                </div>
              </article>
            ))
          ) : (
            <div className="no-courses">No courses found matching your search.</div>
          )}
        </section>
      </main>
    </div>
  );
}
