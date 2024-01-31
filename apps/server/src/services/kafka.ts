import { Kafka } from "kafkajs";

const kafka = new Kafka({
    brokers: []
})

function createProducer(){
    const producer = kafka.producer();
    
}

function produceMessage(key: string, message: string){

}


export default kafka;