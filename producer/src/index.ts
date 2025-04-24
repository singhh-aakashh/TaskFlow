import express from "express"

import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()


import { createClient } from 'redis';

const client = createClient({
    username: 'default',
    password: 'yz27D4vg4SE4KmCrBn2Ddg9UAydPf0vz',
    socket: {
        host: 'redis-17013.c265.us-east-1-2.ec2.redns.redis-cloud.com',
        port: 17013
    }
});

client.on('error', err => console.log('Redis Client Error', err));

client.on('connect', ()=>console.log("Connected to redis"));

const PORT = 3001;
const app = express();

app.get("/get-data",async(req,res)=>{
    try {
        const streamData = await client.xRead(  
            [
                { key: 'mystream', id: '0' } 
              ],
              {
                COUNT: 10,
                BLOCK: 1000
              }    
          )
          if(streamData){
            for(const data of streamData){
                for(const message of data?.messages){
                 await client.xDel("mystream",message.id)
                }
            } 
          }
          res.json({streamData})
    } catch (error) {
        console.log(error)
        res.status(500).send("Internal Server error");
    }
})

app.get("/hello",(req,res)=>{
    res.send("ehbsdbhs")
})
app.get("/hook/catch/:id",async(req,res)=>{
    const id  = req.params.id;
    if(!id) res.status(401).send("id is not given");
    try {
        const flow =await prisma.flow.findUnique({
            where:{
                id
            },
            select:{
                nodes:{
                    select:{
                        id:true,
                        trigger:true,
                        action:true
                    }
                }
            }
        })
        const flowNodes = flow?.nodes.filter(node => Number(node.id) >= 2);
        if (flowNodes){
            for (const node of flowNodes) {
                await client.xAdd("mystream", "*", {
                  id: node.id,
                  trigger: JSON.stringify(node.trigger),
                  action: JSON.stringify(node.action)
                });
              }
        };
        res.status(200).json({flowNodes})
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server error");
    }
})



app.listen(PORT,async()=>{
    await client.connect();
    console.log("server is live on "+PORT);
})