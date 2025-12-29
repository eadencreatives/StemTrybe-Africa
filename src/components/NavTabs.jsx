export default function NavTabs({ tabs = [], active, onChange }) {
  return (
    <div className="nav-tabs">
      {tabs.map((t) => (
        <button
          key={t.key}
          className={active === t.key ? 'active' : ''}
          onClick={() => onChange && onChange(t.key)}
        >
          {t.label}
        </button>
      ))}
    </div>
  );
}
