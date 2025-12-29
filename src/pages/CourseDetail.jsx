import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getCourse } from '../services/courses';

export default function CourseDetail() {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const data = await getCourse(id);
        if (mounted) setCourse(data);
      } catch (err) {
        console.error(err);
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => (mounted = false);
  }, [id]);

  if (loading) return <div>Loading course…</div>;
  if (!course) return <div>Course not found.</div>;

  return (
    <main className="course-detail">
      <header>
        <h1>{course.title}</h1>
        <p>{course.description}</p>
      </header>

      <nav className="module-list">
        <h2>Modules</h2>
        <ol>
          {course.modules.map((m, idx) => (
            <li key={idx}>
              <Link to={`/courses/${course._id}/module/${idx}`}>{m.title}</Link>
            </li>
          ))}
        </ol>
      </nav>
    </main>
  );
}
