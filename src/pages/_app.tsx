import axios from "axios";
import type {AppProps} from "next/app";
import NextNprogress from "nextjs-progressbar";
import React from "react";
import {Slide, ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {RecoilRoot} from "recoil";
import {SWRConfig} from "swr";
import {RecoilExternalStatePortal} from "../SpecialComponents/RecoilExternalStatePortal";
import "../styles/index.css";
import {laravelApi} from "../utils/api";
import {BASE_URL, isProduction} from "../utils/constants";
import {DefaultSeo} from 'next-seo';
import Head from 'next/head'

// import your default seo configuration
import SEO from '../../next-seo.config';

axios.defaults.baseURL = BASE_URL;
axios.defaults.withCredentials = true;

// axios.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     if (!isProduction) console.log("Axios Error", error?.response);
//   }
// );

function MyApp({Component, pageProps /* router */}: AppProps) {
    return (
        <RecoilRoot>
            <SWRConfig
                value={{
                    dedupingInterval: isProduction ? 2000 * 60 : 1000 * 60 * 5, // 5m
                    fetcher: (url: string) =>
                        laravelApi()
                            .get(url)
                            .then((r) => r.data),
                }}
            >
                {/*  This component shows the progress bar  */}
                <NextNprogress
                    color="#29D"
                    startPosition={0.3}
                    stopDelayMs={200}
                    height={3}
                    options={{easing: "ease", speed: 500, showSpinner: false}}
                />
                {/* <AnimatePresence exitBeforeEnter> */}
                {/* <motion.div key={router.route} {...pageMotionProps}> */}
                {/* Default Configuration for SEO */}
                <Head>
                    <meta name='viewport' content='minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=yes, viewport-fit=cover' />
                </Head>
                <DefaultSeo {...SEO} />
                <RecoilExternalStatePortal/>
                <Component {...pageProps} />
                <ToastContainer transition={Slide}/>
                {/* </motion.div> */}
                {/* </AnimatePresence> */}
            </SWRConfig>
            <style global jsx>
                {`
          body {
            background: #eee;
            min-height: 100vh;
          }
        `}
            </style>
        </RecoilRoot>
    );
}

export default MyApp;

// //  animation
// const pageVariants = {
//   pageInitial: {
//     // backgroundColor: "#eee",
//     // filter: `invert()`,
//     opacity: 0,
//   },
//   pageAnimate: {
//     // backgroundColor: "transparent",
//     // filter: ``,
//     opacity: 1,
//   },
//   pageExit: {
//     // backgroundColor: "#eee",
//     // filter: `invert()`,
//     opacity: 0,
//   },
// };
//
// export const pageMotionProps = {
//   initial: "pageInitial",
//   animate: "pageAnimate",
//   exit: "pageExit",
//   variants: pageVariants,
// };
