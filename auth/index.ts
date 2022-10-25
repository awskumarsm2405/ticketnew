import mongoose from "mongoose";
import app from './app';
const port = 4000;
async function start(){
    try{
        await mongoose.connect('mongodb+srv://adminnoden:adminnoden@clustertiket.wltev2p.mongodb.net/ticket?retryWrites=true&w=majority', {});
        console.log("Connected to MongoDb");
    }catch(errpr:any){ console.log(errpr);
        console.log("unable to connect");
    }
    
    app.listen(port, (): void => {
        console.log(`Connected successfully on port ${port}`);
    });
}

start();

