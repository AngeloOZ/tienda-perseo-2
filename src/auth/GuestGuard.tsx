import { useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import LoadingScreen from '../components/loading-screen';
import { AuthContext } from '.';

type GuestGuardProps = {
  children: React.ReactNode;
};

export default function GuestGuard({ children }: GuestGuardProps) {
  const { push } = useRouter();

  const { isLoggedIn, isInitialized } = useContext(AuthContext);

  useEffect(() => {
    if (isLoggedIn) {
      push('/admin');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedIn]);

  if (isInitialized === isLoggedIn) {
    return <LoadingScreen />;
  }

  return <> {children} </>;
}
