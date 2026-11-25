import MotionStory from './motion-story';

export default function Home() {
  return (
      <>
    <a className="skip" href="#main">Skip to content</a>
      <div id="intro-loader" className="intro-loader" hidden>
        <div className="intro-glyph" aria-hidden="true"></div>
        <p role="status">Opening Bhor ’26</p>
        <button type="button" data-intro-skip>Skip intro</button>
      </div>
      <header className="masthead" id="top">
        <a className="wordmark" href="#top" aria-label="Bhor, back to top">Bhor<span>.</span></a>
        <nav aria-label="Main navigation"><a href="#issue">Magazine</a><a href="#archive">Archive</a></nav>
      </header>
      <main id="main" tabIndex={-1}>
        <section className="hero" id="hero" aria-labelledby="hero-title">
          <div className="hero-art" aria-hidden="true">
            <img data-bloom-stage src="/assets/bloom-bud.webp" alt="" width="700" height="714" fetchPriority="high" />
            <img data-bloom-stage src="/assets/bloom-opening.webp" alt="" width="700" height="689" decoding="async" />
            <img data-bloom-stage src="/assets/bloom-open.webp" alt="" width="700" height="698" decoding="async" />
          </div>
          <div className="hero-content">
            <h1 id="hero-title">Bhor <em>’26</em></h1>
            <p>A magazine of writing and art.</p>
            <a className="action" href="#issue">Read the magazine <span aria-hidden="true">↘</span></a>
          </div>
          <div className="hero-baseline" aria-hidden="true"></div>
        </section>
        <section className="issue" id="issue" aria-labelledby="issue-title">
          <div className="issue-content content-width">
            <div className="issue-copy">
              <h2 id="issue-title">Current issue</h2>
              <p>A first look at how Bhor ’26 will read online, with sample writing and artwork.</p>
              <a className="action" href="/issue">Open the reading sample <span aria-hidden="true">↗</span></a>
            </div>
            <figure className="issue-art">
              <div className="cover" aria-hidden="true">
                <strong>Bhor <i>’26</i></strong>
                <img src="/assets/bhor-orchid.webp" alt="" width="1200" height="675" loading="lazy" />
                <span>Writing and art</span>
              </div>
              <figcaption>Cover study</figcaption>
            </figure>
          </div>
        </section>
        <section className="archive content-width" id="archive" aria-labelledby="archive-title">
          <div className="archive-heading"><h2 id="archive-title">Earlier editions</h2><p>Past issues are still being gathered. These artwork studies show how covers will sit in the archive.</p></div>
          <div className="archive-art">
            <figure><img src="/assets/bhor-gesture.webp" alt="Hands reaching across a field of silver points" width="1050" height="591" loading="lazy" /><figcaption>Point cloud study</figcaption></figure>
            <figure><img src="/assets/bhor-fold.webp" alt="An indigo line of light tracing folded paper" width="1050" height="591" loading="lazy" /><figcaption>Folded light study</figcaption></figure>
          </div>
        </section>
      </main>
      <footer id="colophon">
        <div className="footer-content content-width">
          <a className="footer-brand" href="#top" aria-label="Bhor, back to top">Bhor<span>.</span></a>
          <div className="footer-links"><a href="#top">Back to top ↑</a><button type="button" id="motion-toggle" hidden>Pause motion</button></div>
        </div>
      </footer>
      <MotionStory />
    </>
  );
}
