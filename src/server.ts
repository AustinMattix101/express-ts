import dotenv from "dotenv";
dotenv.config({ path: "./.env" }); // initialize configuration
import express, { json, urlencoded } from "express";
import { graphqlHTTP } from "express-graphql";
import { join, resolve } from "path";
import { error, notice } from "./index";

// Config
import connectDB from "./config/db";
// import Onhttps from "./config/https";

// Schema
import schema from "./schema/schema";

// Middlewares
import { cors, corsWithOptions } from "./middlewares/cors.js";
import errorHandler from "./middlewares/error";

// Utils

// Routers
import apiRouter from "./routes/api";
import { router } from "./routes";
import { router as postRouter } from "./routes/Post";
import guestRouter from "./routes/guest";
import hotelRouter from "./routes/hotel";
import roomRouter from "./routes/room";
import taskRouter from "./routes/task";
import authRouter from "./routes/auth";
import TwoFARouter from "./routes/TwoFA";
import privateRouter from "./routes/private"; // User Privillege
import adminRouter from "./routes/admin";   // Admin Privillege
import profileRouter from "./routes/profile";
import uploadRouter from "./routes/uploadFile";

// Express
const app = express();
const apiVersion = process.env.API_VERSION;
// Configure Express to use EJS
// app.set( "views", join( __dirname, "views" ) );
// app.set( "view engine", "ejs" );

// Connoect DB
connectDB();

// Secure Socket Layers SSL
// Onhttps(app);

// app.all('*', (req, res, next) => {
//     if (req.secure) return next();
//     else {
//         res.redirect(307, "https://" + req.hostname + ":" + process.env.SECURE_PORT + req.url);
//     }
// });
app.use(json());
app.use(urlencoded({ extended: true }));

app.use(`/api/${apiVersion}/graphql`, cors, corsWithOptions, graphqlHTTP({
    schema,
    graphiql: process.env.NODE_ENV === "development",
}));
app.use(`/api/${apiVersion}`, apiRouter);
app.use(`/api/${apiVersion}`, router);
app.use(`/api/${apiVersion}/posts`, postRouter);
app.use(`/api/${apiVersion}/guest`, guestRouter);
app.use(`/api/${apiVersion}/hotels`, hotelRouter);
app.use(`/api/${apiVersion}/rooms`, roomRouter);
app.use(`/api/${apiVersion}/tasks`, taskRouter);
app.use(`/api/${apiVersion}/auth`, authRouter);
app.use(`/api/${apiVersion}/twofa`, TwoFARouter);
app.use(`/api/${apiVersion}/private`, privateRouter); // User Privillege
app.use(`/api/${apiVersion}/admin`, adminRouter); // Admin Privillege
app.use(`/api/${apiVersion}/profile`, profileRouter);
app.use(`/api/${apiVersion}/upload`, uploadRouter);
app.use(`/cdn/${apiVersion}`, cors, express.static(join('./server/public')));

if (process.env.NODE_ENV === 'production') {
    app.use('/', express.static(join('./public_html')));

    app.get('*', (_req, res) =>
        res.sendFile(
            resolve('./', 'public_html', 'index.html')
        )
    );

} else {
    app.get('/', (_req, res) => res.send('Please set to production!'));
}

// Error Handler (Should be last piece of middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

// Start the Express Server
const server = app.listen(PORT, () => {
    // tslint:disable-next-line:no-console
    console.log(notice.bgWhite.bold(`> HTTP Proxy [Unsecure] running on PORT: ${PORT}`));
});

process.on("unhandleRejection", (err, _promise) => {
    // tslint:disable-next-line:no-console
    console.log(error(`Logged Error: ${err}`));
    server.close(() => process.exit(1));
});