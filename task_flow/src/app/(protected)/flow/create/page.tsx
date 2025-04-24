"use client";
import React, { useEffect } from "react";
import { Background, ReactFlow } from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { Plus } from "lucide-react";
import { useFlow } from "@/lib/store/flowStore";
import { CustomNode } from "@/components/react-flow/customNode";
import { getUserId } from "@/lib/db/db";
import { useUser } from "@/lib/store/userStore";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";

const nodeTypes = { customNode: CustomNode };

export default function Page() {
  const user: any = useUser();
  const flow = useFlow();

  const router = useRouter();
  console.log(user);

  if (user?.email) {
    useEffect(() => {
      const setUserId = async () => {
        try {
          const userId = await getUserId(user.email);
          console.log("heloooo");
          console.log(userId);
          if (userId) {
            flow.setUserId(userId);
          }
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
      setUserId();
    }, []);
  }
  const print = () => {
    console.log(flow);
  };

  const createFlow = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/flow/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: flow.id,
          name: flow.name,
          nodes: flow.nodes,
          edges: flow.edges,
          active: flow.active,
          userId: flow.userId,
        }),
      });
      const data = await res.json();
      router.push("/flow/all")
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div style={{ width: "100%", height: "100%", padding: "2px" }}>
      <ReactFlow
        colorMode="dark"
        nodeTypes={nodeTypes}
        nodes={flow.nodes}
        edges={flow.edges}
        onNodesChange={flow.onNodesChange}
        onEdgesChange={flow.onEdgesChange}
        onConnect={flow.onConnect}
      >
        <div className="relative z-10 p-4 flex justify-between">
          <Input
            className="w-64 border border-white text-2xl"
            value={flow.name}
            onChange={(e) => flow.setName(e.target.value)}
            placeholder={flow.name}
          />
          <div className="relative inline-flex h-10 overflow-hidden rounded-full p-[2px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 cursor-pointer" 
          onClick={createFlow}>
            <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
            <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
              Publish
            </span>
          </div>
        </div>
        <button className="p-[1px]  relative z-10" onClick={flow.addNode}>
          <div className="absolute inset-0 bg-gradient-to-r rounded-full from-indigo-500 to-purple-500 " />
          <div className="px-2 text-xl py-2  bg-black rounded-full  relative group transition duration-200 text-white hover:bg-transparent">
            <Plus />
          </div>
        </button>
        <button className="p-[1px]  relative z-10" onClick={print}>
          <div className="absolute inset-0 bg-gradient-to-r rounded-full from-indigo-500 to-purple-500 " />
          <div className="px-2 text-xl py-2  bg-black rounded-full  relative group transition duration-200 text-white hover:bg-transparent">
            <Plus />
          </div>
        </button>

        <Background />
      </ReactFlow>
    </div>
  );
}
