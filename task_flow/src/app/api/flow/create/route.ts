import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../../prisma";
import { v4 as uuidv4 } from 'uuid';

let a:number = 10

export async function POST(req:NextRequest,res:NextResponse) {
    try {
        const body = await req.json();
        const { id, name, userId, active, nodes, edges } = body;
    
        const flow = await prisma.flow.create({
          data: {
            id,
            name,
            userId,
            active,
            nodes: {
              create: nodes.map((node: any) => ({
                dbId:node.dbId,
                id: node.id,
                type: node.type,
                data: node.data,
                position: {
                  create: {
                    x: node.position.x,
                    y: node.position.y,
                  },
                },
                ...(node.trigger && {
                  trigger: {
                    create: {
                      id: node.trigger.id,
                      name: node.trigger.name,
                      img: node.trigger.img,
                      data: node.trigger.data,
                    },
                  },
                }),
                ...(node.action && {
                  action: {
                    create: {
                      id: node.action.id,
                      name: node.action.name,
                      img: node.action.img,
                      data: node.action.data,
                    },
                  },
                }),
              })),
            },
            edges: {
              create: edges.map((edge: any) => ({
                id: edge.id,
                source: edge.source,
                target: edge.target,
                animated: edge.animated,
              })),
            },
          },
        });
        return NextResponse.json({success:'Flow is created',flow},{status:200});
    } catch (error: any) {
        console.error('Flow creation failed:', error?.message || error);
        return NextResponse.json({ error: 'Error creating flow' }, { status: 500 });
    }
}