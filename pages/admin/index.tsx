import { useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import { PATH_ADMIN, PATH_DASHBOARD } from 'src/routes/paths';
import LoadingScreen from 'src/components/loading-screen/LoadingScreen';
import { AuthContext } from 'src/auth';

// ----------------------------------------------------------------------

export default function Index() {
  const { rol } = useContext(AuthContext)
  const router = useRouter();

  useEffect(() => {
    if (router.pathname === PATH_ADMIN) {
      switch (rol[0]) {
        case 'admin':
          router.push(PATH_DASHBOARD.productos.root);
          break;
        case 'editor':
          router.push(PATH_DASHBOARD.productos.root);
          break;
        case 'vendedor':
          router.push(PATH_DASHBOARD.ventas.root);
          break;
        default:
          router.push(PATH_DASHBOARD.productos.root);
      }
    }
  });

  return <LoadingScreen />;
}
