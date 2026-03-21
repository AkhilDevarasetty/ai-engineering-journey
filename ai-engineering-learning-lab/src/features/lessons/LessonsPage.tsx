import { llm101Topics } from "./lessonsData";

type LessonKey = "llm-intro" | "transformer-architecture";

type LessonsPageProps = {
  onOpenDashboard: () => void;
  onOpenLesson: (lessonKey: LessonKey) => void;
};

export function LessonsPage({
  onOpenDashboard,
  onOpenLesson,
}: LessonsPageProps) {
  return (
    <div className="dashboard-shell">
      <aside className="dashboard-sidebar">
        <div className="brand-lockup">
          <div className="brand-mark">AI</div>
          <div>
            <p className="brand-title">AI Engineering Learning Lab</p>
            <p className="brand-subtitle">Interactive curriculum</p>
          </div>
        </div>

        <nav className="sidebar-nav" aria-label="Primary">
          <button type="button" className="nav-item nav-item-active">
            <span className="nav-icon">◫</span>
            <span>Lessons</span>
          </button>
          <a className="nav-item" href="#">
            <span className="nav-icon">◎</span>
            <span>Simulations</span>
          </a>
          <button type="button" className="nav-item" onClick={onOpenDashboard}>
            <span className="nav-icon">◧</span>
            <span>Dashboard</span>
          </button>
          <a className="nav-item" href="#">
            <span className="nav-icon">⌘</span>
            <span>Settings</span>
          </a>
        </nav>

        <div className="sidebar-card">
          <p className="sidebar-card-label">Roadmap Track</p>
          <h2>LLM 101</h2>
          <p>
            A structured foundation series for understanding how modern language
            models are built, trained, and used.
          </p>
        </div>
      </aside>

      <main className="dashboard-main lessons-main">
        <header className="dashboard-topbar">
          <label className="search-shell" htmlFor="lessons-search">
            <span className="search-icon">⌕</span>
            <input
              id="lessons-search"
              type="search"
              placeholder="Search lessons, concepts, or roadmap topics..."
            />
          </label>

          <div className="topbar-actions">
            <button type="button" className="ghost-icon-button">
              ?
            </button>
            <button type="button" className="ghost-icon-button">
              ⌁
            </button>
            <div className="profile-chip">
              <span className="profile-avatar">N</span>
            </div>
          </div>
        </header>

        <section className="lessons-hero">
          <h1>LLM Literacy</h1>
          <p className="hero-copy">
            Explore the first roadmap section topic by topic and open each note
            as a structured visual learning experience.
          </p>
        </section>

        <section className="track-overview">
          <article className="track-overview-card">
            <div>
              <p className="summary-label">Roadmap Section</p>
              <h2>Phase 1: LLM 101</h2>
              <p>
                This section covers the conceptual foundation for modern AI
                engineering, starting with language models and moving through
                architecture, training, inference, and model categories.
              </p>
            </div>
            <div className="track-overview-stats">
              <div>
                <span className="summary-value">6</span>
                <span className="summary-caption">Topics</span>
              </div>
            </div>
          </article>
        </section>

        <section className="lesson-sequence" aria-label="LLM 101 topic list">
          {llm101Topics.map((lesson, index) => {
            const lessonKey = lesson.lessonKey;

            return (
              <article key={lesson.title} className="sequence-card">
                <div className="sequence-marker">
                  <div className="sequence-badge">{lesson.order}</div>
                  {index < llm101Topics.length - 1 ? (
                    <div className="sequence-line" aria-hidden="true" />
                  ) : null}
                </div>

                <div className="sequence-content">
                  <div className="sequence-header">
                    <div>
                      <p className="summary-label">Topic {lesson.order}</p>
                      <h2>{lesson.title}</h2>
                    </div>
                    <span className="status-pill status-pill-idle">
                      Roadmap Topic
                    </span>
                  </div>

                  <p className="sequence-summary">{lesson.summary}</p>

                  <div className="sequence-footer">
                    <div className="sequence-meta">
                      <p className="sequence-meta-label">Learning Track</p>
                      <p className="sequence-meta-value">
                        LLM 101 foundation sequence
                      </p>
                    </div>

                    <button
                      type="button"
                      className={lessonKey ? "primary-button" : "secondary-button"}
                      onClick={lessonKey ? () => onOpenLesson(lessonKey) : undefined}
                      disabled={!lessonKey}
                    >
                      {lesson.cta}
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </section>
      </main>
    </div>
  );
}
