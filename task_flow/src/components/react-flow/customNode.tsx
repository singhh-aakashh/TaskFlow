"use client";

import { Handle, Position, useEdges } from "@xyflow/react";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";

import { Button } from "../ui/button";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { act, useEffect, useState } from "react";
import {
  useFlow,
  useTriggerOptions,
  useActionOptions,
} from "@/lib/store/flowStore";
import EmailTemplates from "../app_component/emailTemplate";

export const CustomNode = ({ id, data }: any) => {
  return (
    <>
      <div
        className=" w-64 h-20 bg-black rounded-md outline-amber-50 outline flex justify-center"
        suppressHydrationWarning
      >
        <div
          className="w-full flex items-center justify-center cursor-pointer"
          data-drawer-target="drawer-example"
          data-drawer-show="drawer-example"
          aria-controls="drawer-example"
        >
          <Dialog nodeId={id} data={data} />
        </div>
        <Handle type="source" position={Position.Bottom} />
        <Handle type="target" position={Position.Top} />
      </div>
    </>
  );
};

const Dialog = ({ nodeId, data }: any) => {
  const [isOpen, setIsOpen] = useState(false);
  const triggerOptions = useTriggerOptions();
  const actionOptions = useActionOptions();
  const { nodes, setTrigger, setAction } = useFlow();

  const[node,setNode] = useState<any>({})

  useEffect(()=>{
    const currentNode = nodes.find((node)=>node.id===nodeId)
    setNode(currentNode);
  },[nodes])

  return (
    <>
      <AlertDialog>
        <AlertDialogTrigger className="w-full">{node.trigger||node.action?<img className="w-8 mx-auto" src={node?.trigger?.img||node?.action?.img}/>:data.label}</AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogTitle>
            <VisuallyHidden>Are you sure?</VisuallyHidden>
          </AlertDialogTitle>
          <Card>
            <CardHeader>
              <CardTitle>Your Apps</CardTitle>
              <CardDescription>Choose from here</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col space-y-4">
              {nodeId === "1"
                ? triggerOptions.triggers.map((trigger) => (
                    <AlertDialogAction
                      key={trigger.id}
                      onClick={() =>
                        setTrigger(nodeId, {
                          id: trigger.id,
                          img: trigger.image,
                          name: trigger.name,
                        })
                      }
                      className="flex space-x-4"
                    >
                      <img src={trigger.image} className="w-8" />
                      <p>{trigger.name}</p>
                    </AlertDialogAction>
                  ))
                : actionOptions.actions.map((action) => (
                    <AlertDialogAction
                      key={action.id}
                      onClick={() =>
                        {setAction(nodeId, {
                          id: action.id,
                          img: action.image,
                          name: action.name,
                        })
                      setIsOpen(true)}
                      }
                      className="flex space-x-4"
                    >
                      <img src={action.image} className="w-8" />
                      <p>{action.name}</p>
                    </AlertDialogAction>
                  ))}
            </CardContent>
          </Card>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => setIsOpen(true)}>
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <Drawer open={isOpen} onOpenChange={setIsOpen}>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle className="text-center">Select the email template</DrawerTitle>
          </DrawerHeader>
          <div className="w-full h-full pb-10 p-4 "><EmailTemplates nodeId={nodeId}/></div>
          <DrawerFooter>
            <Button onClick={() => setIsOpen(false)}>Submit</Button>
            <DrawerClose>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};
