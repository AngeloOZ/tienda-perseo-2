// i18n
import '../src/locales/i18n';
import 'react-quill/dist/quill.snow.css';

// scroll bar
import 'simplebar/src/simplebar.css';

// lazy image
import 'react-lazy-load-image-component/src/effects/blur.css';

// ----------------------------------------------------------------------

import { CacheProvider, EmotionCache } from '@emotion/react';
// next
import { NextPage } from 'next';
import Head from 'next/head';
import { AppProps } from 'next/app';
// utils
import createEmotionCache from '../src/utils/createEmotionCache';
// theme
import ThemeProvider from '../src/theme';
// locales
import ThemeLocalization from '../src/locales';
// components
import ProgressBar from '../src/components/progress-bar';
import SnackbarProvider from '../src/components/snackbar';
import { MotionLazyContainer } from '../src/components/animate';
import { ThemeSettings, SettingsProvider } from '../src/components/settings';
import '../custom/styles/globals.css'
import { AuthProvider } from 'src/auth/context';

// Check our docs
// https://docs.minimals.cc/authentication/ts-version

// import { AuthProvider } from '../src/auth/JwtContext';

// ----------------------------------------------------------------------

const clientSideEmotionCache = createEmotionCache();

type NextPageWithLayout = NextPage & {
  getLayout?: (page: React.ReactElement) => React.ReactNode;
};

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
  Component: NextPageWithLayout;
}

export default function MyApp(props: MyAppProps) {
  const { Component, pageProps, emotionCache = clientSideEmotionCache } = props;

  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <AuthProvider>
        <SettingsProvider>
          <MotionLazyContainer>
            <ThemeProvider>
              <ThemeSettings>
                <ThemeLocalization>
                  <SnackbarProvider>
                    <ProgressBar />
                    {getLayout(<Component {...pageProps} />)}
                  </SnackbarProvider>
                </ThemeLocalization>
              </ThemeSettings>
            </ThemeProvider>
          </MotionLazyContainer>
        </SettingsProvider>
      </AuthProvider>
    </CacheProvider>
  );
}
