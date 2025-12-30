import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getCourses } from '../services/courses';
import { useAuth } from "../context/AuthContext";

export default function Dashboard() {
  const { user, logout } = useAuth();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('in-progress');

  // Mock data matching screenshot - replace with your API structure
  const mockCourses = [
    { id: 1, title: 'Real Interview Prep', status: 'in-progress', icon: '🎯', progress: 45 },
    { id: 2, title: 'Fundamentals of Marketing', status: 'in-progress', icon: '📈', progress: 75 },
    { id: 3, title: 'Single Cell Analysis by Single Cell Genomics', status: 'completed', icon: '🔬', progress: 100 }
  ];

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const data = await getCourses();
        if (mounted) setCourses(data || mockCourses);
      } catch (err) {
        console.error(err);
        if (mounted) setCourses(mockCourses);
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => (mounted = false);
  }, []);

  if (loading) return <div className="loading">Loading dashboard…</div>;

  const inProgressCourses = courses.filter(c => c.status === 'in-progress');
  const completedCourses = courses.filter(c => c.status === 'completed');

  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <div className="sidebar-header">
          <h2>Internship</h2>
          <p>Dashboard</p>
        </div>
        <nav className="sidebar-nav">
          <ul>
            <li className={`nav-item ${activeTab === 'in-progress' ? 'active' : ''}`}>
              <button onClick={() => setActiveTab('in-progress')}>
                📋 In Progress
              </button>
              <span className="badge">{inProgressCourses.length}</span>
            </li>
            <li className={`nav-item ${activeTab === 'completed' ? 'active' : ''}`}>
              <button onClick={() => setActiveTab('completed')}>
                ✅ Completed
              </button>
              <span className="badge">{completedCourses.length}</span>
            </li>
          </ul>
        </nav>
      </aside>

      <main className="main-content">
        <header className="top-header">
          <h1>Welcome, {user?.name}</h1>
          <div className="header-actions">
            <button className="profile-btn">👤</button>
            <button onClick={logout} className="logout-btn">Logout</button>
          </div>
        </header>

        <section className="content-area">
          {activeTab === 'in-progress' && (
            <div className="courses-section">
              <h2>In Progress</h2>
              <div className="courses-grid">
                {inProgressCourses.map(course => (
                  <div key={course.id} className="course-card">
                    <div className="card-icon">{course.icon}</div>
                    <div className="card-content">
                      <h3>{course.title}</h3>
                      <div className="progress-bar">
                        <div className="progress-fill" style={{width: `${course.progress}%`}}></div>
                      </div>
                      <p>{course.progress}% Complete</p>
                    </div>
                    <Link to={`/courses/${course.id}`} className="course-link">
                      Open Course →
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'completed' && (
            <div className="courses-section">
              <h2>Completed</h2>
              <div className="courses-grid">
                {completedCourses.map(course => (
                  <div key={course.id} className="course-card completed">
                    <div className="card-icon">{course.icon}</div>
                    <div className="card-content">
                      <h3>{course.title}</h3>
                      <p>✅ Completed</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
