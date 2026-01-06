import { useState, useEffect, useMemo, useCallback, Outlet } from 'react'; // ADD Outlet
import { Link } from 'react-router-dom';
import { getCourses } from '../services/courses';
import { useAuth } from '../context/AuthContext';
import './Dashboard.css';

export default function Dashboard() {
  const { user, logout } = useAuth();
  // ... rest of your existing state/effects unchanged ...

  // ... your existing useEffect, filteredCourses, pluralize, handleLogout unchanged ...

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
      {/* Your existing header/search */}
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

      {/* Show courses ONLY when on dashboard root */}
      {!window.location.pathname.includes('/courses') && (
        <>
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
                      to={`/dashboard/courses/${course._id || course.id}`} // ✅ This works with your routes
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
        </>
      )}

      {/* RENDER NESTED COURSE PAGES HERE */}
      <Outlet /> {/* ← ADD THIS: Renders CourseLayout/ModulePage */}
    </main>
  );
}
