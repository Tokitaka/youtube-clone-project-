import express from "express";
import morgan from 'morgan';
import session from "express-session";
import MongoStore from "connect-mongo";

import rootRouter from "./router/rootRouter";
import userRouter from "./router/userRouter";
import videoRouter from "./router/videoRouter";
import { localsMiddleware} from "./middlewares";

const app = express();
const logger = morgan("dev");
// tiny, short, dev, common, combined 
app.use(logger);
// for reading form value 
app.use(express.urlencoded({extended:true}));
app.set('view engine','pug');
app.set('views',process.cwd()+'/src/views');

app.use(session({
        secret: process.env.COOKIE_SECRET,
        store: MongoStore.create({mongoUrl: process.env.DB_URL}),
        resave:false,
        saveUninitialized:false,
        cookie: {
            maxAge: 2*7*24*60*60*1000, //2weeks
        },
    }));

app.use(localsMiddleware);
// domain 별 router 지정
app.use('/',rootRouter)
app.use('/videos',videoRouter)
app.use('/users',userRouter)


export default app;

