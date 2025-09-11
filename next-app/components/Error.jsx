"use client";
import { useRouter } from 'next/navigation';
import Button from './Button';
import Layout from './Layout';

export default function Error({ reset }) {
  const router = useRouter();

  const handleClick = () => {
    if (reset) {
      reset();
    } else {
      router.push('/');
    }
  };

  return (
    <Layout
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100dvh',
        gap: 'var(--space-5)',
        padding: 'var(--space-4)',
        textAlign: 'center'
      }}
    >
      <p style={{ fontSize: 'var(--fs-3)', fontWeight: 750 }}>Something went wrong</p>
      <Button onClick={handleClick} variant="primary">
        Try Again
      </Button>
    </Layout>
  );
}

