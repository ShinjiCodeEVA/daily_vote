import express, {Express, Router} from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { routes } from './routes/index.js';

class App { 
    port: number;
    app: Express; 
    router: Router;

    constructor(port: number) { 
        this.port = port;
        this.app = express();
        this.router = express.Router();
    }

    static { dotenv.config(); }

    start () { 
        this.initMiddleWares();
        this.initRoutes();

        this.app.listen(this.port, () => 
            console.log('😵‍💫 Server listening to port ' + this.port)
        );
    }   
    
    initMiddleWares () {
        this.app.use(cors());
        this.app.use(express.json());
    }

    initRoutes () {
        for (const route of routes) { 
            const {path, methods, handler} = route;
            
            for (const method of methods) {
                (this.router as any)[method.toLowerCase()](path, handler);
            }
        }

        this.app.use('/api', this.router);
    }
}

new App(parseInt(`${process.env.PORT}`)).start();