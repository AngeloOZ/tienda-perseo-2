// --------SWIPER
import "swiper/css";
import "swiper/css/navigation";
import 'swiper/css/pagination';
import '../custom/styles/swiper.css'


// i18n
import '../src/locales/i18n';
import 'react-quill/dist/quill.snow.css';

// scroll bar
import 'simplebar/src/simplebar.css';

// lazy image
import 'react-lazy-load-image-component/src/effects/blur.css';

// ----------------------------------------------------------------------

// Context
import { AuthProvider } from 'src/auth/context';
import { CartProvider } from 'context';

import { CacheProvider, EmotionCache } from '@emotion/react';
// next
import { NextPage } from 'next';
import Head from 'next/head';
import { AppProps } from 'next/app';
import { SWRConfig } from 'swr';
import { tiendaApi } from 'custom/api';

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
import '../custom/styles/globals.css';


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
        <title>Tienda Perseo</title>
      </Head>
      <AuthProvider>
        <SWRConfig value={{ fetcher: (url: string) => tiendaApi.get(url).then(r => r.data) }}>
          <SettingsProvider>
            <MotionLazyContainer>
              <ThemeProvider>
                <ThemeSettings>
                  <ThemeLocalization>
                    <CartProvider>
                      <SnackbarProvider>
                        <ProgressBar />
                        {getLayout(<Component {...pageProps} />)}
                      </SnackbarProvider>
                    </CartProvider>
                  </ThemeLocalization>
                </ThemeSettings>
              </ThemeProvider>
            </MotionLazyContainer>
          </SettingsProvider>
        </SWRConfig>
      </AuthProvider>
    </CacheProvider>
  );
}
