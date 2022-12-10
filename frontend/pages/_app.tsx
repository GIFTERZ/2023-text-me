import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { setMocking } from '../mocks/setMocking';
import '../public/static/fonts/style.css';
import Layout from '../components/layout/Layout';
import { ThemeProvider } from 'styled-components';
import theme from '../styles/theme/Theme';
import { pageview, GA_TRACKING_ID } from '../lib/gtag';
import Script from 'next/script';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function App({ Component, pageProps }: AppProps) {
  setMocking();
  const router = useRouter();

  useEffect(() => {
    setGoogleAnalytics();
  }, []);

  const setGoogleAnalytics = () => {
    const handleRouteChange = (url: URL) => {
      pageview(url);
    };

    router.events.on('routeChangeComplete', handleRouteChange);
    router.events.on('hashChangeComplete', handleRouteChange);

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
      router.events.off('hashChangeComplete', handleRouteChange);
    };
  };

  return (
    <ThemeProvider theme={theme}>
      <Layout>
        <Script strategy="afterInteractive" src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`} />
        <Script
          id="gtag-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_TRACKING_ID}', {
                  page_path: window.location.pathname,
                });
                `,
          }}
        />
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  );
}
