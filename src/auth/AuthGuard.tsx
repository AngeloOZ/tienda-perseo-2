import { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import LoadingScreen from '../components/loading-screen';
import { Login, AuthContext } from '.';

// ----------------------------------------------------------------------

type AuthGuardProps = {
  children: React.ReactNode;
};

export default function AuthGuard({ children }: AuthGuardProps) {
  const { isLoggedIn, isInitialized } = useContext(AuthContext);

  const { pathname, push } = useRouter();

  const [requestedLocation, setRequestedLocation] = useState<string | null>(null);

  useEffect(() => {
    if (requestedLocation && pathname !== requestedLocation) {
      push(requestedLocation);
    }
    if (isLoggedIn) {
      setRequestedLocation(null);
    }
    
  }, [isLoggedIn, pathname, push, requestedLocation]);

  if (!isInitialized) {
    return <LoadingScreen />;
  }

  if (!isLoggedIn) {
    if (pathname !== requestedLocation) {
      setRequestedLocation(pathname);
    }
    push('/login');
    return <LoadingScreen />;
  }

  return <> {children} </>;
}
