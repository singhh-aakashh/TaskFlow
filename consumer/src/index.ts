import { createClient } from 'redis';

const client = createClient({
    username: 'default',
    password: 'yz27D4vg4SE4KmCrBn2Ddg9UAydPf0vz',
    socket: {
        host: 'redis-17013.c265.us-east-1-2.ec2.redns.redis-cloud.com',
        port: 17013
    }
});

// client.on('error', err => console.log('Redis Client Error', err));

// client.on('connect', ()=>console.log("Connected to redis"));

const worker = async()=>{
    await client.connect()
    while(true){
        try {
            const streamData = await client.xRead(  
                [
                    { key: 'mystream', id: '0' } 
                  ],
                  {
                    COUNT: 10,
                    BLOCK: 5000
                  }    
              )
              if(streamData){
                for(const data of streamData){
                    for(const message of data?.messages){
                     console.log("data is ",message.message.id)
                     await client.xDel("mystream",message.id)
                    }
                } 
              }
        } catch (error) {
            console.log(error)
        }
    }
}

worker().then(()=>console.log("Worker started")).catch(err => console.log(err))