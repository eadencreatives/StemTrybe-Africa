import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getCourses } from '../services/courses';
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

export default function Dashboard() {
  const { user } = useAuth();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("internships");

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

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="spinner"></div>
        <p>Loading dashboard…</p>
      </div>
    );
  }

  return (
    <>
      <div className="dashboard-container">
        <Navbar />

        <div className="dashboard-layout">
          <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

          <main className="main-content">
            <div className="welcome-section">
              <h1>
                <span className="wave">👋</span> Welcome back, {user?.name || "Learner"}
              </h1>
              <p className="subtitle">— Your Courses</p>
            </div>

            {courses.length === 0 ? (
              <div className="empty-state">
                <p>No courses available yet. Check back soon!</p>
              </div>
            ) : (
              <div className="courses-grid">
                {courses.map((course) => (
                  <div key={course._id || course.id} className="course-card">
                    <div className="course-icon">📚</div>
                    <div className="course-content">
                      <h3>{course.title}</h3>
                      <p>{course.description}</p>
                      <Link to={`/courses/${course._id || course.id}`} className="proceed-btn">
                        Proceed
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </main>
        </div>
      </div>

      <style jsx>{`
        .dashboard-container {
          min-height: 100vh;
          background: #f5f5f5;
        }

        .dashboard-layout {
          display: flex;
          min-height: calc(100vh - 60px);
        }

        .main-content {
          flex: 1;
          padding: 2rem 3rem;
          max-width: 1400px;
        }

        .welcome-section {
          margin-bottom: 2rem;
        }

        .welcome-section h1 {
          font-size: 1.75rem;
          font-weight: 700;
          color: #1a1a1a;
          margin: 0 0 0.25rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .wave {
          font-size: 1.5rem;
        }

        .subtitle {
          color: #666;
          font-size: 0.875rem;
          margin: 0;
        }

        .courses-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(500px, 1fr));
          gap: 1.5rem;
        }

        .course-card {
          background: white;
          border: 1px solid #10b981;
          border-radius: 8px;
          padding: 1.5rem;
          display: flex;
          gap: 1.25rem;
          transition: all 0.2s;
        }

        .course-card:hover {
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }

        .course-icon {
          font-size: 3rem;
          flex-shrink: 0;
        }

        .course-content {
          flex: 1;
        }

        .course-content h3 {
          font-size: 1rem;
          font-weight: 700;
          color: #1a1a1a;
          margin: 0 0 0.5rem;
        }

        .course-content p {
          font-size: 0.875rem;
          color: #666;
          line-height: 1.5;
          margin: 0 0 1rem;
        }

        .proceed-btn {
          display: inline-block;
          padding: 0.5rem 1.5rem;
          background: #10b981;
          color: white;
          border: none;
          border-radius: 4px;
          font-weight: 600;
          font-size: 0.875rem;
          text-decoration: none;
          cursor: pointer;
          transition: all 0.2s;
        }

        .proceed-btn:hover {
          background: #059669;
        }

        .empty-state {
          background: white;
          border: 1px solid #e0e0e0;
          border-radius: 8px;
          padding: 3rem;
          text-align: center;
          color: #666;
        }

        .loading-screen {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          background: #f5f5f5;
          gap: 1rem;
        }

        .spinner {
          width: 40px;
          height: 40px;
          border: 4px solid #e0e0e0;
          border-top-color: #10b981;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        .loading-screen p {
          color: #666;
          font-size: 0.875rem;
        }

        @media (max-width: 1024px) {
          .courses-grid {
            grid-template-columns: 1fr;
          }

          .main-content {
            padding: 1.5rem;
          }
        }
      `}</style>
    </>
  );
}
