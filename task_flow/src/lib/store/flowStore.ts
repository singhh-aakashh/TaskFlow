import { create } from "zustand";
import {
  Edge,
  Connection,
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
} from "@xyflow/react";
import { v4 as uuidv4 } from "uuid";

let nodeId = 2;

interface FlowState {
  id: string;
  userId: string;
  name: string;
  nodes: Node[];
  edges: Edge[];
  active:boolean;
  addNode: () => void;
  onNodesChange: (changes: any) => void;
  onEdgesChange: (changes: any) => void;
  onConnect: (connection: Connection) => void;
  setAction: (nodeId: string, action: {name:string , id:string , img:string ,data?:any}) => void;
  setTrigger: (nodeId: string, trigger: {name:string , id:string , img:string ,data?:any}) => void;
  setName: (newName:string) => void;
  setUserId:(userId:string) => void;
  setActionData:(nodeId:string,data:string)=>void;
}

export interface Node {
  dbId:string;
  id: string;
  data: {
    label: string;
  };
  trigger?: {
    name: string;
    id: string;
    img: string;
    data?: any;
  };
  action?: {
    name: string;
    id: string;
    img: string;
    data?: string;
  };
  position: {
    x: number;
    y: number;
  };
  type: "customNode";
}

export const useFlow =create<FlowState>((set, get) => ({
  id: uuidv4(),
  name: "Untitled Workflow",
  userId: "1",
  active:true,
  nodes: [
    {
      dbId:uuidv4(),
      id: "1",
      position: { x: 550, y: 150 },
      data: { label: "Trigger" },
      type: "customNode",
      
    },
    {
      dbId:uuidv4(),
      id: "2",
      position: { x: 550, y: 300 },
      data: { label: "Action" },
      type: "customNode",
    },
  ],
  edges: [{ id: `e1-2`, source: "1", target: "2", animated: true }],

  addNode: () => {
    const nodes = get().nodes;
    const edges = get().edges;

    const newNodeId = `${++nodeId}`;
    const lastNodeId = nodes[nodes.length - 1]?.id;

    const newNode: Node = {
      dbId:uuidv4(),
      id: newNodeId,
      position: { x: 550, y: (nodes.length + 1) * 150 },
      data: { label: "Action" },
      type: "customNode",
    };

    set({
      nodes: [...nodes, newNode],
      edges: lastNodeId
        ? [
            ...edges,
            {
              id: `e${lastNodeId}-${newNodeId}`,
              source: lastNodeId,
              target: newNodeId,
              animated: true,
            },
          ]
        : edges,
    });
  },

  onNodesChange: (changes) =>
    set((state) => ({ nodes: applyNodeChanges(changes, state.nodes) })),
  onEdgesChange: (changes) =>
    set((state) => ({ edges: applyEdgeChanges(changes, state.edges) })),
  onConnect: (connection) =>
    set((state) => ({ edges: addEdge(connection, state.edges) })),
  setAction: (nodeId: string, actiontemp:{name:string , id:string , img:string ,data?:any} ) =>
    set((state) => ({
      nodes: state.nodes.map((node) =>
        node.id === nodeId
          ? { ...node, action: {...actiontemp,id:uuidv4()}, data: { label: "Gmail" } }
          : node
      ),
    })),
  setTrigger: (nodeId: string, triggerTemp: {name:string , id:string , img:string ,data?:any}) =>
    set((state) => ({
      nodes: state.nodes.map((node) =>
        node.id === nodeId
          ? { ...node, trigger: {...triggerTemp,id:uuidv4()}, data: { label: "Webhook" } }
          : node
      ),
    })),
    setName: (newName:string) => set((state)=>({
      name:newName
    })),
    setUserId:(userId:string) =>set((state)=>({userId:userId})),
    setActionData: (nodeId: string, data: string) =>
      set((state) => ({
        nodes: state.nodes.map((node) => {
          if (node.id === nodeId) {
            const prevAction = node.action || { id: uuidv4(), name: "", img: "" };
    
            return {
              ...node,
              action: {
                ...prevAction,
                data,
              },
            };
          }
          return node;
        }),
      })),
}));

interface TriggerOptionsType {
  triggers: {
    id: string;
    name: string;
    image: string;
  }[];
}

interface ActionOptionsType {
  actions: {
    id: string;
    name: string;
    image: string;
  }[];
}

export const useTriggerOptions = create<TriggerOptionsType>(() => ({
  triggers: [
    {
      id: uuidv4(),
      image:
        "https://plugins.jetbrains.com/files/16984/260965/icon/pluginIcon.png",
      name: "Webhook",
    },
  ],
}));

export const useActionOptions = create<ActionOptionsType>(() => ({
  actions: [
    {
      id: uuidv4(),
      image:
        "https://png.pngtree.com/png-vector/20230817/ourmid/pngtree-google-email-mail-application-vector-png-image_9183278.png",
      name: "Gmail",
    },
  ],
}));