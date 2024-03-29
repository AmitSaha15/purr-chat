import {Server} from "socket.io";
import Redis  from "ioredis";
import prismaClient from "./prisma";
import { produceMessage } from "./kafka";
import { log } from "console";

const pub = new Redis({
    host:'redis-51c7dc7-amitsahawork42-bda4.a.aivencloud.com',
    port:17371,
    username:'default',
    password:'AVNS_CYWWSpihtseLnbOVxsP'
});
const sub = new Redis({
    host:'redis-51c7dc7-amitsahawork42-bda4.a.aivencloud.com',
    port:17371,
    username:'default',
    password:'AVNS_CYWWSpihtseLnbOVxsP'
});

class SocketService{
    private _io: Server;

    constructor(){
        console.log("Init socket service...");
        
        this._io = new Server({
            cors: {
                allowedHeaders: ["*"],
                origin: "*",
            }
        });
        sub.subscribe("MESSAGES");
    }

    public initListeners(){
        const io = this.io;
        console.log(`Initialized socket listeners...`);
        
        io.on("connect", (socket) => {
            console.log(`New socket connected `, socket.id);
            
            socket.on("event:message", async ({message}: {message: string}) =>{
                console.log(`New message received: `,message);
                // publish the message to redis
                await pub.publish("MESSAGES", JSON.stringify({message}));
            });
        });

        sub.on('message', async (channel, message) => {
            if(channel === 'MESSAGES'){
                io.emit("message", message);
                // store msg to DB
                // await prismaClient.message.create({
                //     data: {
                //         text: message,
                //     },
                // });
                await produceMessage(message);
                console.log("Message produced to Kafka broker");
            }
        });
    }

    get io(){
        return this._io;
    }
}

export default SocketService;