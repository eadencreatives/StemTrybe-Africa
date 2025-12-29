export default function Examples({ examples = [] }) {
  if (!examples || examples.length === 0) return null;
  return (
    <section className="examples">
      <h3>Working examples</h3>
      {examples.map((ex, i) => (
        <pre key={i} className="example-block">{ex}</pre>
      ))}
    </section>
  );
}
