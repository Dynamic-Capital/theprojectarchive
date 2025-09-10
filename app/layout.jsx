import './globals.css';
import ClientLayout from '../components/ClientLayout';

export const metadata = {
  title: 'The Project Archive',
  icons: {
    icon: '/favicon.svg',
  },
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
