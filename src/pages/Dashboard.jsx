/* Dashboard Main Layout */
.dashboard-main {
  display: flex;
  gap: 24px;
  min-height: 60vh;
}

/* Courses Sidebar */
.courses-sidebar {
  width: 320px;
  flex-shrink: 0;
  background: var(--card);
  border-radius: 12px;
  padding: 24px;
  box-shadow: var(--shadow);
  height: fit-content;
}

.sidebar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.sidebar-header h2 {
  margin: 0;
  font-size: 1.1rem;
  color: #0f172a;
}

.course-nav {
  height: 100%;
}

.course-list {
  list-style: none;
  padding: 0;
  margin: 0;
  max-height: 500px;
  overflow-y: auto;
}

.course-selector {
  width: 100%;
  background: none;
  border: none;
  padding: 14px 16px;
  text-align: left;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.2s ease;
  font-weight: 500;
  font-size: 0.95rem;
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 6px;
}

.course-selector:hover {
  background: rgba(37, 99, 235, 0.08);
}

.course-selector.active {
  background: var(--accent);
  color: white;
}

.course-number {
  font-size: 0.85rem;
  font-weight: 700;
  color: var(--success);
  min-width: 36px;
  text-align: center;
  background: rgba(16, 185, 129, 0.1);
  padding: 4px 8px;
  border-radius: 6px;
}

.course-info-sidebar {
  display: flex;
  flex-direction: column;
  flex: 1;
  min-width: 0;
}

.course-title-sidebar {
  font-weight: 600;
  font-size: 0.95rem;
  display: block;
}

.course-modules-sidebar {
  font-size: 0.8rem;
  color: var(--muted);
  opacity: 0.8;
}

/* Main Content Area */
.dashboard-content {
  flex: 1;
  min-width: 0;
}

.course-card.selected {
  border: 2px solid var(--accent);
  box-shadow: 0 12px 40px rgba(37, 99, 235, 0.15);
}

/* Responsive */
@media (max-width: 1024px) {
  .dashboard-main {
    flex-direction: column;
  }
  
  .courses-sidebar {
    width: 100%;
    order: 2;
  }
}

@media (max-width: 768px) {
  .courses-sidebar {
    padding: 20px;
  }
}
