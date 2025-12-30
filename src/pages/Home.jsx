import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/login');
  };

  return (
    <>
      <main>
        <section className="hero">
          <h1>Transform Your Learning Experience</h1>
          <p>
            Empower your team with cutting-edge learning management tools.
            Create, manage, and track courses effortlessly.
          </p>
          <div className="hero-buttons">
            <button className="btn-primary" onClick={handleGetStarted}>
              Get Started Free
            </button>
          </div>
        </section>
        <section className="features" id="features">
          <h2 className="section-title">Powerful Features for Modern Learning</h2>
          <div className="feature-grid">
            <div className="feature-card">
              <div className="feature-icon">📚</div>
              <h3>Course Management</h3>
              <p>
                Create and organize unlimited courses with intuitive drag-and-drop
                tools. Upload videos, documents, and quizzes seamlessly.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📊</div>
              <h3>Analytics & Reporting</h3>
              <p>
                Track student progress with detailed analytics. Generate
                comprehensive reports to measure learning outcomes.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🎯</div>
              <h3>Personalized Learning</h3>
              <p>
                AI-powered recommendations adapt to each learner's pace and
                style, ensuring optimal knowledge retention.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">💬</div>
              <h3>Interactive Discussion</h3>
              <p>
                Foster collaboration with built-in forums, live chat, and video
                conferencing capabilities.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📱</div>
              <h3>Mobile Learning</h3>
              <p>
                Learn anywhere, anytime with our responsive design and dedicated
                mobile apps for iOS and Android.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🔒</div>
              <h3>Enterprise Security</h3>
              <p>
                Bank-level encryption and compliance with GDPR, FERPA, and SOC 2
                standards protect your data.
              </p>
            </div>
          </div>
        </section>
        <section className="stats">
          <div className="stats-grid">
            <div className="stat-item">
              <h2>50K+</h2>
              <p>Active Learners</p>
            </div>
            <div className="stat-item">
              <h2>2,500+</h2>
              <p>Courses Available</p>
            </div>
            <div className="stat-item">
              <h2>95%</h2>
              <p>Satisfaction Rate</p>
            </div>
            <div className="stat-item">
              <h2>24/7</h2>
              <p>Support Available</p>
            </div>
          </div>
        </section>
        <section className="cta">
          <h2>Ready to Transform Your Learning?</h2>
          <p>
            Join thousands of learners and organisations using STEMTRIBE Africa to deliver
            practical, skills-focused learning experiences.
          </p>
          <button className="btn-secondary" onClick={handleGetStarted}>
            Start Your Free Trial
          </button>
        </section>
        <footer>
          <p>© 2025 STEMTRIBE Africa. All rights reserved. | Privacy Policy | Terms of Service</p>
        </footer>
      </main>
    </>
  );
}
