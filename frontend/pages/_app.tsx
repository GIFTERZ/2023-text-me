import "../styles/globals.css";
import type { AppProps } from "next/app";
import { setMocking } from "../mocks/setMocking";
import "../public/static/fonts/style.css";
import Layout from "../components/layout/Layout";
import { ThemeProvider } from "styled-components";
import theme from "../styles/theme/Theme";
export default function App({ Component, pageProps }: AppProps) {
  setMocking();

  return (
    <ThemeProvider theme={theme}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  );
}
