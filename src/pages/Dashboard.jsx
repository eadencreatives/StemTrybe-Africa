import { useEffect, useState } from 'react';
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

  if (loading) return <div className="dashboard-loading">Loading dashboard…</div>;

  return (
    <main className="dashboard">
      <header className="dashboard-header">
        <div>
          <h1>Welcome, {user?.name || 'Guest'}</h1>
          <p className="role">Role: {user?.role || 'student'}</p>
        </div>
        <div className="header-actions">
          <input
            aria-label="Search courses"
            className="course-search"
            placeholder="Search courses by title or description"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button className="btn-logout" onClick={logout}>Logout</button>
        </div>
      </header>

      <section className="courses-meta">
        <p className="count">Showing {courses.length} course{courses.length !== 1 ? 's' : ''}</p>
      </section>

      <section className="courses-grid">
        {courses.filter(c => {
          if (!query) return true;
          const q = query.toLowerCase();
          return (c.title || '').toLowerCase().includes(q) || (c.description || '').toLowerCase().includes(q) || (c.slug || '').toLowerCase().includes(q);
        }).map(c => (
          <article key={c._id || c.id} className="course-card">
            <h3>{c.title}</h3>
            <p className="course-desc">{c.description}</p>
            <div className="card-footer">
              <Link className="open-course" to={`/courses/${c._id || c.id}`}>Open Course</Link>
              <span className="modules-count">{(c.modules || []).length} module{(c.modules || []).length !== 1 ? 's' : ''}</span>
            </div>
          </article>
        ))}

        {courses.length === 0 && (
          <div className="no-courses">No courses available.</div>
        )}
      </section>
    </main>
  );
}
