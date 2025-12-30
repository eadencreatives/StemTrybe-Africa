import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './ModulePage.css';

export default function ModulePage() {
  const { courseId, moduleId } = useParams();
  const [module, setModule] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate module loading - replace with your API
    setTimeout(() => {
      setModule({
        title: `Module ${moduleId}`,
        content: `Content for ${moduleId} goes here. This is where your STEMtribe Africa course materials will appear - videos, code editors, quizzes, etc.`
      });
      setLoading(false);
    }, 500);
  }, [moduleId]);

  if (loading) return <div className="module-loading">Loading module content...</div>;

  return (
    <article className="module-page">
      <header className="module-header">
        <h2>{module?.title}</h2>
      </header>
      <div className="module-body">
        <div className="module-content">
          <div className="module-text">{module?.content}</div>
          <section className="module-resources">
            <h3>Resources</h3>
            <ul>
              <li>📚 Code examples</li>
              <li>✏️ Practice exercises</li>
              <li>📥 Download materials</li>
            </ul>
          </section>
        </div>
      </div>
    </article>
  );
}
###
