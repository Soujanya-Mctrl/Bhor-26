const clamp = value => Math.max(0, Math.min(1, value));
const ease = value => value * value * (3 - 2 * value);

export function initializeMotion() {
  const hero = document.querySelector('#hero');
  const issue = document.querySelector('#issue');
  const stages = [...hero.querySelectorAll('[data-bloom-stage]')];
  const loader = document.querySelector('#intro-loader');
  const skip = loader.querySelector('[data-intro-skip]');
  const toggle = document.querySelector('#motion-toggle');
  const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
  const listeners = new AbortController();
  const listen = (target, event, handler, options = {}) => target.addEventListener(event, handler, { ...options, signal: listeners.signal });
  let visited = false;
  try { visited = sessionStorage.getItem('bhor-intro-seen') === '1'; } catch { /* Private browsing can disable storage. */ }
  let showTimer, endTimer, frame = 0;
  let paused = false, loaderDone = visited;

  function finishIntro(focus = false) {
    const restoreFocus = focus || loader.contains(document.activeElement);
    clearTimeout(showTimer);
    clearTimeout(endTimer);
    loaderDone = true;
    loader.hidden = true;
    try { sessionStorage.setItem('bhor-intro-seen', '1'); } catch { /* Storage is optional. */ }
    if (restoreFocus) document.querySelector('main').focus({ preventScroll: true });
  }

  function schedule() {
    if (!frame) frame = requestAnimationFrame(paint);
  }

  function syncPreference() {
    toggle.hidden = preference.matches;
    if (preference.matches) finishIntro();
    schedule();
  }

  function paint() {
    frame = 0;
    const height = window.innerHeight;
    const still = paused || preference.matches;
    const heroProgress = still ? 1 : clamp(-hero.getBoundingClientRect().top / (height * .57));
    const issueProgress = still ? 1 : clamp((height * .84 - issue.getBoundingClientRect().top) / (height * .6));
    hero.style.setProperty('--story-progress', heroProgress.toFixed(3));
    issue.style.setProperty('--issue-progress', issueProgress.toFixed(3));
    const progress = heroProgress * 2;
    for (const [i, stage] of stages.entries()) stage.style.opacity = i === 0 ? '1' : String(ease(clamp(progress - i + 1)));
  }

  listen(skip, 'click', () => finishIntro(true));
  listen(document, 'focusin', (event) => {
    if (!loaderDone && !loader.contains(event.target)) finishIntro();
  });
  listen(toggle, 'click', () => {
    paused = !paused;
    toggle.textContent = paused ? 'Resume motion' : 'Pause motion';
    schedule();
  });
  listen(window, 'resize', schedule);
  listen(window, 'scroll', () => {
    if (!loaderDone) finishIntro();
    schedule();
  }, { passive:true });
  listen(preference, 'change', syncPreference);
  if (!loaderDone && !preference.matches && !stages[0].complete && !location.hash && scrollY === 0) {
    showTimer = setTimeout(() => { if (!loaderDone) loader.hidden = false; }, 260);
    endTimer = setTimeout(() => finishIntro(), 1200);
    listen(stages[0], 'load', () => finishIntro());
    listen(stages[0], 'error', () => finishIntro());
  } else if (!loaderDone) finishIntro();
  syncPreference();
  return () => {
    listeners.abort();
    clearTimeout(showTimer);
    clearTimeout(endTimer);
    cancelAnimationFrame(frame);
    loader.hidden = true;
  };
}
