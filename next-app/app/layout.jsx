import './globals.css';
import ClientLayout from '../components/ClientLayout';

export const metadata = {
  title: 'The Project Archive',
  icons: {
    icon: '/favicon.svg',
  },
  description:
    'Creative studio in the Maldives offering design, development, and photography services.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
