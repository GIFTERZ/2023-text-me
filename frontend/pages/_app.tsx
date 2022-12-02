import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { setMocking } from '../mocks/setMocking';
export default function App({ Component, pageProps }: AppProps) {
  setMocking();

  return <Component {...pageProps} />;
}
