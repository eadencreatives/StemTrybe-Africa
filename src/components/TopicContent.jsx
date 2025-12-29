import Examples from './Examples';
import PracticeQuestions from './PracticeQuestions';

export default function TopicContent({ topic }) {
  if (!topic) return null;

  return (
    <article className="topic-content">
      <h2>{topic.title}</h2>
      {topic.intro && <p className="intro">{topic.intro}</p>}
      {topic.description && <section className="description">{topic.description}</section>}

      <Examples examples={topic.examples || []} />

      <PracticeQuestions questions={topic.practiceQuestions || []} />
    </article>
  );
}
