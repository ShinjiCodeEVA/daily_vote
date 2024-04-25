import express, {Express} from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

class App { 
    port: number;
    app: Express; 

    constructor(port: number) { 
        this.port = port;
        this.app = express();
    }

    static { dotenv.config(); }

    start () { 
        this.app.listen(this.port, () => 
            console.log('😵‍💫 Server listening to port ' + this.port)
        );
    }   
    
    initMiddleWares () {
        this.app.use(cors());
    }
}

new App(parseInt(`${process.env.PORT}`)).start();