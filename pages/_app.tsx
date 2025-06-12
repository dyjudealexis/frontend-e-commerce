import "@/styles/css/bootstrap.min.css";
import "@/styles/css/font-awesome.min.css";
import "@/styles/css/elegant-icons.css";
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import "@/styles/css/style.css";

import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
