"use client"
import { getUserFlows } from "@/actions/flow";
import { useUser } from "@/lib/store/userStore";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import FlowCard from "./_components/flowCard";

export default function Page(){
  const [isLoading, setIsLoading] = useState(false);
  const user:any = useUser();
  const [userFlows,setUserFlows]=useState<any>()
  useEffect(()=>{
    const fetchFlows = async () =>{
      setIsLoading(true);
      try {
        const res = await getUserFlows(user?.id);
        if (res?.flows) setUserFlows(res);
        console.log(res)
      } finally {
        setIsLoading(false);
      }
    };
    if (user?.id) fetchFlows();
  }, [user]);
    const router = useRouter();
    return(
        <>
    <h1 className="sticky top-0 z-[10] flex items-center rounded-tl-3xl justify-between border-b bg-background/50 p-6 text-4xl backdrop-blur-lg">
      Dashboard
      <button onClick={()=>router.push("/flow/create")} className="relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
        <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
        <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
          <Plus/>
        </span>
      </button>
    </h1>
    <div className="relative flex flex-col gap-4">
      <section className="flex flex-col gap-4 p-6 text-muted-foreground">
        Manage all your Task flow here. {user?.id}
        {isLoading ? (
          <div>Loading flows...</div>
        ) : userFlows?.flows?.length ? (
          userFlows.flows.map((flow:any) => (
            <FlowCard flowId={flow.id} isActive={flow.isActive} name={flow.name} nodes={flow.nodes} key={flow.id}/>
          ))
        ) : (
          <div>No flows found</div>
        )}
      </section>
    </div>
  </>
    )
}