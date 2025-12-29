export default function PrevNext({ current = 0, total = 0, onPrev, onNext }) {
  return (
    <div className="prev-next">
      <button onClick={onPrev} disabled={current <= 0}>Previous</button>
      <span>{current + 1} / {total}</span>
      <button onClick={onNext} disabled={current >= total - 1}>Next</button>
    </div>
  );
}
