import Link from 'next/link';
import type { Metadata } from 'next';
import styles from './issue.module.css';

export const metadata: Metadata = { title: 'Reading sample', description: 'A sample of the Bhor ’26 online reading experience.' };

export default function ReadingSample() {
  return (
    <main className={styles.page}>
      <nav className={styles.nav} aria-label="Publication navigation">
        <Link href="/#issue">← Current issue</Link>
        <Link href="/#archive">Archive</Link>
      </nav>
      <article className={styles.article} aria-labelledby="sample-title">
        <header className={styles.header}>
          <p className={styles.label}>Bhor ’26 · Reading sample</p>
          <h1 id="sample-title">Before the light</h1>
          <p className={styles.intro}>A short piece of sample writing for the online edition.</p>
        </header>
        <figure className={styles.art}>
          <img src="/assets/bhor-bloom.webp" alt="A blue flower in three stages from closed bud to full bloom" width={1800} height={600} />
          <figcaption>Bloom study</figcaption>
        </figure>
        <div className={styles.prose}>
          <p>By morning, the flower had opened. I had looked in on it the night before and seen only the seam between its petals. Now the seam was gone, and the tabletop below it held a pale blue reflection.</p>
          <p>I moved the glass an inch toward the window and watched that small patch of light disappear. For the rest of the morning, I left everything where it was.</p>
        </div>
      </article>
    </main>
  );
}
