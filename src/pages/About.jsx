export default function About() {
  return (
    <main className="about-page">
      <div className="container">
        <section className="about-hero">
          <h1>About STEMTRIBE Africa</h1>
          <p>
            STEMTRIBE Africa is a registered UK organisation and a community-focused
            STEM initiative dedicated to empowering tertiary and high school
            students across Africa, and under-represented groups in the UK
            through science and technology.
          </p>
        </section>

        <section className="about-grid">
          <div className="about-content">
            <h2>Our Mission</h2>
            <p>
              We promote hands-on laboratory training, mentorship, and practical
              skills development in programming languages such as Python and R,
              alongside command-line proficiency. We equip learners with the
              confidence and tools needed to participate and succeed in STEM.
            </p>

            <h3>Why We Exist</h3>
            <p>
              Access to practical training and mentorship remains limited for
              many talented young people. We close that gap by creating learning
              pathways, building communities, and connecting learners to
              real-world projects and research opportunities.
            </p>
          </div>

          <aside className="feature-list">
            <h3>What We Offer</h3>
            <ul>
              <li>
                <span className="icon">🧪</span>
                <div>
                  <strong>Hands-on laboratory training</strong>
                  <div className="muted">Practical experiments and lab skills</div>
                </div>
              </li>

              <li>
                <span className="icon">💡</span>
                <div>
                  <strong>Mentorship</strong>
                  <div className="muted">One-to-one guidance from experienced mentors</div>
                </div>
              </li>

              <li>
                <span className="icon">💻</span>
                <div>
                  <strong>Programming & tools</strong>
                  <div className="muted">Training in Python, R and command-line workflows</div>
                </div>
              </li>

              <li>
                <span className="icon">📚</span>
                <div>
                  <strong>Workshops & events</strong>
                  <div className="muted">Practical sessions, hackathons and seminars</div>
                </div>
              </li>
            </ul>
          </aside>
        </section>

        <section className="about-advocacy">
          <h2>Advocacy & Impact</h2>
          <p>
            We advocate for the inclusion of African communities in advanced
            research and work to remove barriers that limit access to
            opportunities in science and technology.
          </p>

          <div className="about-cta">
            <button className="btn-primary">Join Our Community</button>
          </div>
        </section>
      </div>
    </main>
  );
}
