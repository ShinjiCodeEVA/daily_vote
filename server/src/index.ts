import express, {Express, Router} from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { routes } from './routes/index.js';
import WebSocket from './service/webSocket.js';
import {createServer, Server as HttpServer} from 'http'

class App { 
    app: Express;
    server: HttpServer
    webSocket: WebSocket;
    port: number;
    router: Router;

    constructor(port: number) { 
        this.port = port;
        this.app = express();
        this.server = createServer(this.app);
        this.router = express.Router();
        this.webSocket = new WebSocket(this.server);
    }

    static { dotenv.config(); }

    start () { 
        this.initMiddleWares();
        this.initRoutes();
        this.webSocket.initialize();

        this.server.listen(this.port, () => 
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