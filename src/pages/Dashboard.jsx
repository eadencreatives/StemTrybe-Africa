import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getCourses } from '../services/courses';

export default function Dashboard() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

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

  if (loading) return <div>Loading dashboard…</div>;

  return (
    <main className="dashboard">
      <header>
        <h1>Your Dashboard</h1>
        <p>Quick access to your courses and progress.</p>
      </header>

      <section className="courses-grid">
        {courses.map(c => (
          <article key={c._id || c.id} className="course-card">
            <h3>{c.title}</h3>
            <p>{c.description}</p>
            <Link to={`/courses/${c._id || c.id}`}>Open Course</Link>
          </article>
        ))}
      </section>
    </main>
  );
}
import { useAuth } from "../context/AuthContext";

export default function Dashboard() {
  const { user, logout } = useAuth();

  return (
    <div>
      <h2>Welcome, {user?.name}</h2>
      <p>Role: {user?.role}</p>

      <button onClick={logout}>Logout</button>
    </div>
  );
}
