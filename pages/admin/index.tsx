import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { PATH_ADMIN, PATH_DASHBOARD } from 'src/routes/paths';
import LoadingScreen from 'src/components/loading-screen/LoadingScreen';

// ----------------------------------------------------------------------

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    if (router.pathname ===  PATH_ADMIN) {
      router.push(PATH_DASHBOARD.productos.root);
    }
  });

  return <LoadingScreen />;
}
