import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { api } from '../services/api';
import TopicContent from '../components/TopicContent';
import PrevNext from '../components/PrevNext';

export default function ModulePage() {
  const { id, moduleIndex, topicIndex } = useParams();
  const navigate = useNavigate();
  const [module, setModule] = useState(null);
  const topicIdx = topicIndex ? parseInt(topicIndex, 10) : 0;
  const [courseTitle, setCourseTitle] = useState('');

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await api.get(`/courses/${id}`);
        if (!mounted) return;
        const c = res.data;
        setCourseTitle(c.title);
        const m = c.modules[parseInt(moduleIndex, 10)];
        setModule(m);
      } catch (err) {
        console.error(err);
      }
    })();
    return () => (mounted = false);
  }, [id, moduleIndex]);

  if (!module) return <div>Loading module…</div>;

  const topic = module.topics[topicIdx] || module.topics[0];

  const goTopic = (nextIdx) => {
    if (nextIdx < 0 || nextIdx >= module.topics.length) return;
    navigate(`/courses/${id}/module/${moduleIndex}/topic/${nextIdx}`);
  };

  return (
    <main className="module-page">
      <header>
        <h1>{courseTitle} — {module.title}</h1>
        <Link to={`/courses/${id}`}>Back to course</Link>
      </header>

      <TopicContent topic={topic} />

      <PrevNext
        current={topicIdx}
        total={(module.topics && module.topics.length) || 0}
        onPrev={() => goTopic(topicIdx - 1)}
        onNext={() => goTopic(topicIdx + 1)}
      />
    </main>
  );
}
