import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

import { DEFAULT_VENDEDOR } from 'src/routes/paths';

// ----------------------------------------------------------------------

export default function Index() {
    const router = useRouter();
    useEffect(() => {
        router.push(`/${DEFAULT_VENDEDOR}/tienda`);
    });

    return <Head><title>Tienda Perseo</title></Head>;
}
