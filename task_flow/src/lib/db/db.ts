"use server"
import { prisma } from "../../../prisma";

export const getUserByEmail = async (email:string)=>{
    try {
        const user = await prisma.user.findUnique({
            where:{
                email
            }
        })
        return user;
    } catch (error) {
        console.log(error)
        return null;
    }
}

export const fetchTemplateVariables = async (id:string)=>{
    try {
        console.log("checking id in db",id)
        const res = await prisma.emailTemplate.findUnique({
            where:{
                id:id
            }
        })
        console.log("db res is ",res)
        return res
    }
     catch (error) {
        console.log(error)
    }
}
    
export const fetchEmailTemplate = async () =>{
    try {
        const res = await prisma.emailTemplate.findMany();
        return res;
    } catch (error) {
        console.log(error)
    }
}

export const getUserId = async (email:string)=>{
   
    console.log("email is ",email)
        const currentUser = await prisma.user.findUnique({
            where:{email:email}
        })
        return currentUser?.id
    }



export const createUser = async (email:string) => {
    try {
        const user = await prisma.user.create({
            data:{
                email
            }
        })
        return user;
    } catch (error) {
        console.log(error);
        return null;
    }
}