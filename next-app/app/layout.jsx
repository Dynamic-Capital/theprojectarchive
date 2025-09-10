import './globals.css';
import ClientLayout from '../components/ClientLayout';
import { ThemeProvider } from 'next-themes';
import { logRuntimeInfo } from '../lib/logRuntime';

logRuntimeInfo();

export const metadata = {
  title: 'The Project Archive is all you need',
  icons: {
    icon: '/favicon.svg',
  },
  description:
    'Creative studio in the Maldives offering design, development, and photography services.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-[var(--bg)] text-[var(--text)]">
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
          <ClientLayout>{children}</ClientLayout>
        </ThemeProvider>
      </body>
    </html>
  );
}
