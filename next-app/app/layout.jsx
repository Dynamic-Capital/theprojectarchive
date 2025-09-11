import '../styles/reset.css';
import '../styles/tokens.css';
import '../styles/globals.css';
import ClientLayout from '../components/ClientLayout';
import { ThemeProvider } from 'next-themes';
import { logRuntimeInfo } from '../lib/logRuntime';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

logRuntimeInfo();

export const metadata = {
  title:
    'The Project Archive - Creative studio for design, development, and photography',
  icons: {
    icon: '/favicon.svg',
  },
  description:
    'Creative studio in the Maldives offering design, development, and photography services.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
        >
          <ClientLayout>{children}</ClientLayout>
        </ThemeProvider>
      </body>
    </html>
  );
}
