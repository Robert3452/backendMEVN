import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import router from './routes';

import passport from 'passport';
import './middlewares/passport';

const app = express();

//settings
app.set('port', process.env.PORT || 4000);

//middlewares
app.use(morgan("dev"));
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(passport.initialize())
// passport.use(passportMiddleware)
// app.use()

app.get('/', (req, res) => {
    res.send(`This server is running on port ${app.get('port')}`);
})

app.use('/', router);
export default app;