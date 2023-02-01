import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

// ----------------------------------------------------------------------

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    if (router.pathname === '/') {
      router.push('/tienda');
    }
  });

  return <Head><title>Tienda Perseo</title></Head>;
}
