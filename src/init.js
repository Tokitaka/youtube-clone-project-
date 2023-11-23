// require("dotenv").config();
import "dotenv/config";
import "./db";
import "./models/Video";
import "./models/User";
import app from './main';

const PORT = 4000; 
const handleListening = ()=> {console.log(`Server listening on port http://localhost:${PORT}`)};
// app 실행 , PORT 연결 시 callback 함수 
app.listen(PORT, handleListening);