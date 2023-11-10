import express from "express";
import morgan from 'morgan'
import "./db";

import globalRouter from "./router/globalRouter";
import userRouter from "./router/userRouter";
import videoRouter from "./router/videoRouter";

const app = express();
const logger = morgan("dev");
// tiny, short, dev, common, combined 
app.use(logger);
// for reading form value 
app.use(express.urlencoded({extended:true}));
app.set('view engine','pug');
app.set('views',process.cwd()+'/src/views');
// domain 별 router 지정
app.use('/',globalRouter)
app.use('/videos',videoRouter)
app.use('/users',userRouter)

const PORT = 4000; 
const handleListening = ()=> {console.log(`Server listening on port http://localhost:${PORT}`)};

app.listen(PORT, handleListening)
