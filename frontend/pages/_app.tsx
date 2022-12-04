import "../styles/globals.css";
import type { AppProps } from "next/app";
import { setMocking } from "../mocks/setMocking";
import "../public/static/fonts/style.css";

export default function App({ Component, pageProps }: AppProps) {
  setMocking();

  return <Component {...pageProps} />;
}
