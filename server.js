// const { createServer } = require("https");
// const { parse } = require("url");
// const next = require("next");
// const fs = require("fs");
//
// const dev = process.env.NODE_ENV !== "production";
// const app = next({ dev });
// const handle = app.getRequestHandler();
//
// const httpsOptions = {
//   key: fs.readFileSync("./certificates/localhost.key"),
//   cert: fs.readFileSync("./certificates/localhost.crt"),
// };
//
// app.prepare().then(() => {
//   createServer(httpsOptions, async (req, res) => {
//     const parsedUrl = parse(req.url, true);
//     await handle(req, res, parsedUrl);
//   }).listen(3000, (err) => {
//     if (err) throw err;
//     console.log("> Server started on https://localhost:3000");
//   });
// });

const {createServer} = require('http')
const {join} = require('path')
const {parse} = require('url')
const next = require('next')

const app = next({dev: process.env.NODE_ENV !== 'production'})
const handle = app.getRequestHandler()

app.prepare()
    .then(() => {
        createServer(async (req, res) => {
            const parsedUrl = parse(req.url, true)
            const {pathname} = parsedUrl

            if (pathname === '/sw.js' || /^\/(workbox|worker|fallback)-\w+\.js$/.test(pathname)) {
                const filePath = join(__dirname, '.next', pathname)
                await app.serveStatic(req, res, filePath)
            } else {
                await handle(req, res, parsedUrl)
            }
        })
            .listen(3000, () => {
                console.log(`> Ready on http://localhost:${3000}`)
            })
    })
