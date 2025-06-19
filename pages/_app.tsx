import "@/styles/css/bootstrap.min.css";
import "@/styles/css/font-awesome.min.css";
import "@/styles/css/elegant-icons.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "@/styles/css/style.css";

import type { AppProps } from "next/app";
import { Toaster } from "react-hot-toast";
import "@/styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Toaster position="bottom-right" reverseOrder={false} />
      <Component {...pageProps} />
    </>
  );
}
