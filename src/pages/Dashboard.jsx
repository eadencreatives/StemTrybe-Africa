import { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { getCourses } from '../services/courses';
import { useAuth } from "../context/AuthContext";
import './Dashboard.css';

export default function Dashboard() {
  const { user, logout } = useAuth();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');

  // Fetch courses
  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const data = await getCourses();
        if (mounted) setCourses(data || []);
      } catch (err) {
        console.error(err);
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => (mounted = false);
  }, []);

  const filteredCourses = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return courses;
    return courses.filter((c) => (c.title || '').toLowerCase().includes(q) || (c.description || '').toLowerCase().includes(q));
  }, [courses, query]);
  if (loading) return <div className="loading">Loading dashboard…</div>;

  return (
    <main className="dashboard">
      <div className="dashboard-header">
        <div className="header-left">
          <h1 className="welcome">Welcome back, {user?.name}</h1>
          <p className="muted">Role: <strong>{user?.role}</strong></p>
        </div>
        <div className="header-right">
          <button className="btn secondary" onClick={logout}>Logout</button>
        </div>
      </div>

      <div className="dashboard-toolbar">
        <div className="stats">
          <div className="stat">
            <div className="stat-value">{courses.length}</div>
            <div className="stat-label">Courses</div>
          </div>
        </div>
        <div className="toolbar-actions">
          <input
            className="search"
            placeholder="Search courses..."
            aria-label="Search courses"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </div>

            <section className="courses-grid" aria-live="polite">
        {filteredCourses.map((c) => (
          <article key={c._id || c.id} className="course-card" tabIndex={0}>
            <div className="course-meta">
              <div className="course-thumb" aria-hidden="true" />
              <div className="course-info">
                <h3 className="course-title">{c.title}</h3>
                <p className="course-desc">{c.description}</p>
              </div>
            </div>

            <div className="course-actions">
              <Link className="btn primary" to={`/courses/${c._id || c.id}`}>Open Course</Link>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
