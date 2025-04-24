import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    console.log("Received Gmail Webhook Notification:", req.body);
    
    // Process the notification (e.g., fetch new messages)
    
    res.status(200).send("OK");
  } else {
    res.status(405).send("Method Not Allowed");
  }
}
