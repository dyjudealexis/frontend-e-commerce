import "@/styles/css/bootstrap.min.css";
import "@/styles/css/font-awesome.min.css";
import "@/styles/css/elegant-icons.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "@/styles/css/style.css";

import type { AppProps } from "next/app";
import { Toaster } from "react-hot-toast";
import "@/styles/globals.css";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import FullPageSpinner from "@/components/Others/FullPageSpinner";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [isRouteLoading, setRouteLoading] = useState(false);
  useEffect(() => {
    const handleStart = () => setRouteLoading(true);
    const handleComplete = () => setRouteLoading(false);

    // Use const tuples for events
    const startArgs = ['routeChangeStart', handleStart] as const;
    const completeArgs = ['routeChangeComplete', handleComplete] as const;
    const errorArgs = ['routeChangeError', handleComplete] as const;

    router.events.on(...startArgs);
    router.events.on(...completeArgs);
    router.events.on(...errorArgs);

    return () => {
      router.events.off(...startArgs);
      router.events.off(...completeArgs);
      router.events.off(...errorArgs);
    };
  }, [router.events]);


  return (
    <>
      {isRouteLoading && <FullPageSpinner />}
      <Toaster position="bottom-right" reverseOrder={false} />
      <Component {...pageProps} />
    </>
  );
}
