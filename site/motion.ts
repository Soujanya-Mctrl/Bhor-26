const clamp = (value: number) => Math.max(0, Math.min(1, value));
const ease = (value: number) => value * value * (3 - 2 * value);

export function initializeMotion() {
  const heroElement = document.querySelector<HTMLElement>('#hero');
  const issueElement = document.querySelector<HTMLElement>('#issue');
  const loaderElement = document.querySelector<HTMLElement>('#intro-loader');
  const skip = loaderElement?.querySelector<HTMLButtonElement>('[data-intro-skip]');
  const toggleElement = document.querySelector<HTMLButtonElement>('#motion-toggle');
  if (!heroElement || !issueElement || !loaderElement || !skip || !toggleElement) return;

  const [hero, issue, loader, toggle] = [heroElement, issueElement, loaderElement, toggleElement] as const;
  const stages = [...hero.querySelectorAll<HTMLImageElement>('[data-bloom-stage]')];
  const firstStage = stages[0];
  if (!firstStage) return;
  const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
  const listeners = new AbortController();
  const listenerOptions = { signal: listeners.signal };
  let visited = false;
  try { visited = sessionStorage.getItem('bhor-intro-seen') === '1'; } catch { /* Private browsing can disable storage. */ }
  let showTimer: number | undefined;
  let endTimer: number | undefined;
  let frame = 0;
  let paused = false, loaderDone = visited;

  function finishIntro(focus = false) {
    const restoreFocus = focus || loader.contains(document.activeElement);
    clearTimeout(showTimer);
    clearTimeout(endTimer);
    loaderDone = true;
    loader.hidden = true;
    try { sessionStorage.setItem('bhor-intro-seen', '1'); } catch { /* Storage is optional. */ }
    if (restoreFocus) document.querySelector('main')?.focus({ preventScroll: true });
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

  skip.addEventListener('click', () => finishIntro(true), listenerOptions);
  document.addEventListener('focusin', (event) => {
    if (!loaderDone && event.target instanceof Node && !loader.contains(event.target)) finishIntro();
  }, listenerOptions);
  toggle.addEventListener('click', () => {
    paused = !paused;
    toggle.textContent = paused ? 'Resume motion' : 'Pause motion';
    schedule();
  }, listenerOptions);
  window.addEventListener('resize', schedule, listenerOptions);
  window.addEventListener('scroll', () => {
    if (!loaderDone) finishIntro();
    schedule();
  }, { ...listenerOptions, passive: true });
  preference.addEventListener('change', syncPreference, listenerOptions);
  if (!loaderDone && !preference.matches && !firstStage.complete && !location.hash && scrollY === 0) {
    showTimer = window.setTimeout(() => { if (!loaderDone) loader.hidden = false; }, 260);
    endTimer = window.setTimeout(() => finishIntro(), 1200);
    firstStage.addEventListener('load', () => finishIntro(), listenerOptions);
    firstStage.addEventListener('error', () => finishIntro(), listenerOptions);
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
