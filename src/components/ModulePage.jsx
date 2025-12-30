// components/ModulePage.jsx
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function ModulePage() {
  const { courseId, moduleId } = useParams();
  const [module, setModule] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock module data - replace with your API call
    const mockModules = {
      'python-syntax': { title: 'Python Syntax', content: 'Python syntax content...' },
      'python-variables': { title: 'Python Variables', content: 'Variables content...' },
      // Add your STEMtribe modules here
    };
    
    setTimeout(() => {
      setModule(mockModules[moduleId] || { title: 'Module Content', content: 'Module content goes here...' });
      setLoading(false);
    }, 500);
  }, [moduleId]);

  if (loading) return <div className="module-loading">Loading module...</div>;

  return (
    <article className="module-page">
      <header className="module-header">
        <h2>{module?.title}</h2>
      </header>
      <div className="module-body">
        <div className="module-content">
          <p>{module?.content}</p>
          {/* Add your module content here - videos, code editors, etc. */}
          <section className="module-resources">
            <h3>Resources</h3>
            <ul>
              <li>Code examples</li>
              <li>Practice exercises</li>
              <li>Download materials</li>
            </ul>
          </section>
        </div>
      </div>
    </article>
  );
}
