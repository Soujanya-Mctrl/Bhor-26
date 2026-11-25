import localFont from 'next/font/local';
import './globals.css';

const display = localFont({ src: './fonts/instrument-serif.ttf', variable: '--font-display', weight: '400', display: 'swap' });
const body = localFont({ src: './fonts/instrument-sans.ttf', variable: '--font-body', weight: '400 700', display: 'swap' });

export const metadata = {
  title: { default: 'Bhor ’26', template: '%s | Bhor ’26' },
  description: 'A magazine of writing and art. Preview the current issue and explore the archive.',
};

export const viewport = { themeColor: '#090a0e' };

export default function RootLayout({ children }) {
  return <html lang="en"><body className={`${display.variable} ${body.variable}`}>{children}</body></html>;
}
