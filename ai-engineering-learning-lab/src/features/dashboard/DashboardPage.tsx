import { dashboardActivities, dashboardLessons } from "./dashboardData";

type DashboardPageProps = {
  onOpenLesson: () => void;
  onOpenLessons: () => void;
};

export function DashboardPage({
  onOpenLesson,
  onOpenLessons,
}: DashboardPageProps) {
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
          <button type="button" className="nav-item" onClick={onOpenLessons}>
            <span className="nav-icon">◫</span>
            <span>Lessons</span>
          </button>
          <a className="nav-item" href="#">
            <span className="nav-icon">◎</span>
            <span>Simulations</span>
          </a>
          <a className="nav-item nav-item-active" href="#" aria-current="page">
            <span className="nav-icon">◧</span>
            <span>Dashboard</span>
          </a>
          <a className="nav-item" href="#">
            <span className="nav-icon">⌘</span>
            <span>Settings</span>
          </a>
        </nav>

        <div className="sidebar-card">
          <p className="sidebar-card-label">Current Focus</p>
          <h2>LLM Foundations</h2>
          <p>
            Move through the three core modules that shape the MVP learning
            path.
          </p>
        </div>
      </aside>

      <main className="dashboard-main">
        <header className="dashboard-topbar">
          <label className="search-shell" htmlFor="dashboard-search">
            <span className="search-icon">⌕</span>
            <input
              id="dashboard-search"
              type="search"
              placeholder="Search lessons, concepts, or labs..."
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

        <section className="hero-section">
          <p className="eyebrow">Dashboard / Library</p>
          <h1>AI Engineering Curriculum</h1>
          <p className="hero-copy">
            A visual, interactive approach to mastering modern AI engineering
            principles through guided lessons and hands-on simulations.
          </p>
        </section>

        <section className="dashboard-grid" aria-label="Learning dashboard">
          <article className="featured-card">
            <div className="featured-card__content">
              <div className="featured-card__header">
                <span className="pill pill-highlight">{dashboardLessons[0].badge}</span>
                <span className="module-label">Module 01</span>
              </div>

              <h2>{dashboardLessons[0].title}</h2>
              <p>{dashboardLessons[0].description}</p>

              <div className="progress-meta">
                <span>{dashboardLessons[0].progressLabel}</span>
                <span>3 of 5 sections</span>
              </div>
              <div className="progress-track" aria-hidden="true">
                <div
                  className="progress-fill"
                  style={{ width: `${dashboardLessons[0].progress}%` }}
                />
              </div>

              <div className="featured-card__footer">
                <button
                  type="button"
                  className="primary-button"
                  onClick={onOpenLesson}
                >
                  {dashboardLessons[0].cta}
                </button>
                <div className="featured-visual" aria-hidden="true" />
              </div>
            </div>
          </article>

          <article className="lesson-card">
            <div className="lesson-icon lesson-icon-teal">◌</div>
            <h2>{dashboardLessons[1].title}</h2>
            <p>{dashboardLessons[1].description}</p>
            <div className="card-footer">
              <div className="progress-meta">
                <span>{dashboardLessons[1].progressLabel}</span>
              </div>
              <div className="progress-track progress-track-thin" aria-hidden="true">
                <div
                  className="progress-fill progress-fill-teal"
                  style={{ width: `${dashboardLessons[1].progress}%` }}
                />
              </div>
              <button type="button" className="secondary-button">
                {dashboardLessons[1].cta}
              </button>
            </div>
          </article>

          <article className="lesson-card">
            <div className="lesson-icon lesson-icon-violet">✦</div>
            <h2>{dashboardLessons[2].title}</h2>
            <p>{dashboardLessons[2].description}</p>
            <div className="card-footer">
              <div className="progress-meta">
                <span>{dashboardLessons[2].progressLabel}</span>
              </div>
              <div className="progress-track progress-track-thin" aria-hidden="true">
                <div
                  className="progress-fill progress-fill-violet"
                  style={{ width: `${dashboardLessons[2].progress}%` }}
                />
              </div>
              <button type="button" className="secondary-button">
                {dashboardLessons[2].cta}
              </button>
            </div>
          </article>

          <article className="summary-card">
            <p className="summary-label">Learning Progress Summary</p>
            <h2>Guided Path</h2>
            <p>
              You are moving through the core LLM foundations sequence. The next
              recommended stop is the Transformer Architecture overview.
            </p>

            <div className="summary-stats">
              <div>
                <span className="summary-value">2/3</span>
                <span className="summary-caption">Modules active</span>
              </div>
              <div>
                <span className="summary-value">58%</span>
                <span className="summary-caption">Curriculum progress</span>
              </div>
            </div>

            <button type="button" className="primary-button" onClick={onOpenLesson}>
              Open Guided Path
            </button>
          </article>
        </section>

        <section className="activity-section">
          <div className="activity-header">
            <div>
              <p className="eyebrow">Recent Learning Activity</p>
              <h2>Activity Log</h2>
            </div>
            <button type="button" className="text-button">
              View All
            </button>
          </div>

          <div className="activity-list">
            {dashboardActivities.map((activity) => (
              <article key={activity.title} className="activity-item">
                <div className="activity-icon">✦</div>
                <div className="activity-copy">
                  <h3>{activity.title}</h3>
                  <p>{activity.detail}</p>
                </div>
                <span className="activity-time">{activity.time}</span>
              </article>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
