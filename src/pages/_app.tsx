import axios from "axios";
import { AnimatePresence, motion } from "framer-motion";
import type { AppProps /*, AppContext */ } from "next/app";
import NextNprogress from "nextjs-progressbar";
import React from "react";
import { RecoilRoot } from "recoil";
import { SWRConfig } from "swr";
import "../styles/index.css";
import { BASE_URL } from "../utils/constants";

axios.defaults.baseURL = BASE_URL;

function MyApp({ Component, pageProps, router }: AppProps) {
  return (
    <RecoilRoot>
      <SWRConfig
        value={{
          fetcher: (url: string) =>
            axios.get(url).then((r) => {
              console.log("url: ", url);
              r.data;
            }),
        }}
      >
        {/*  This component shows the progress bar  */}
        <NextNprogress
          color="#29D"
          startPosition={0.3}
          stopDelayMs={200}
          height={3}
          options={{ easing: "ease", speed: 500, showSpinner: false }}
        />
        <AnimatePresence exitBeforeEnter>
          <motion.div key={router.route} {...pageMotionProps}>
            <Component {...pageProps} />
          </motion.div>
        </AnimatePresence>
      </SWRConfig>
      <style global jsx>
        {`
          body {
            background: #eee;
          }
        `}
      </style>
    </RecoilRoot>
  );
}

export default MyApp;

// animation
const pageVariants = {
  pageInitial: {
    // backgroundColor: "#eee",
    // filter: `invert()`,
    opacity: 0,
  },
  pageAnimate: {
    // backgroundColor: "transparent",
    // filter: ``,
    opacity: 1,
  },
  pageExit: {
    // backgroundColor: "#eee",
    // filter: `invert()`,
    opacity: 0,
  },
};

const pageMotionProps = {
  initial: "pageInitial",
  animate: "pageAnimate",
  exit: "pageExit",
  variants: pageVariants,
};
