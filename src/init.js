import "./db";
import "./models/video";
import app from './main';

const PORT = 4000; 
const handleListening = ()=> {console.log(`Server listening on port http://localhost:${PORT}`)};
// app 실행 
app.listen(PORT, handleListening)