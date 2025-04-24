"use server"
import { prisma } from "../../prisma"

export const getUserFlows = async(userId:string)=>{
    try {
        const flows = await prisma.flow.findMany({
            where:{
                userId
            },
            include:{
                nodes:{
                    include:{
                        trigger:true,
                        action:true
                    }
                },
                edges:true
            }
        })
        return {flows}
    } catch (error) {
        console.log(error);
        return {"error":"error while finding flows"}
    }
}