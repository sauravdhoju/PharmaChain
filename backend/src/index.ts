import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';
import mongoose from 'mongoose';

import { mongo_uri, port } from './envconfig';

import router from './router/index';

const app = express();

// app.use(
//     cors({
//         credentials: true,
//         // origin: 'http://localhost:5173',
//         optionsSuccessStatus: 200,
//     })
// );
app.use(
    cors({
        credentials: true,
        origin: 'http://localhost:5173',
        optionsSuccessStatus: 200,
    })
);

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

app.use('/', router());

const server = http.createServer(app);

// scheduler to check task deadlines and send emails accordingly

server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

mongoose.Promise = Promise;
mongoose.connect(mongo_uri);
mongoose.connection.on('error', (err: Error) => {
    console.log(err);
});
