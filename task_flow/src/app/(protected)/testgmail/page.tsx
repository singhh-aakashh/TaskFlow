"use client"
import { getGmail, getGmailMessages, startGmailWatch } from "@/lib/appUtil/gmailMethod";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function GmailInbox() {
  const { data: session } = useSession();
  const [emailList, setEmailList] = useState([]);
  const [emails, setEmails] = useState<any>([]); // Corrected variable name for clarity

  useEffect(() => {
    // @ts-ignore
    if (session?.accessToken) {
    // @ts-ignore
      getGmailMessages(session.accessToken).then((data) => {
        setEmailList(data.messages || []);
      });
      //@ts-ignore
      startGmailWatch(session.accessToken);
    }
  }, [session]);

  useEffect(() => {
    // @ts-ignore
    if (session?.accessToken && emailList.length > 0) {
      console.log("Fetching emails", emailList);

      const fetchEmails = async () => {
        const fetchedEmails = await Promise.all(
          emailList.map(async (email) => {
    // @ts-ignore
            const data = await getGmail(session.accessToken, email.id);
            console.log(data)
            return data?.snippet || "";
          })
        );
    // @ts-ignore
        setEmails(fetchedEmails);
      };

      fetchEmails();
    }
  }, [session, emailList]);

//   const handleClick = async()=>{
//     try {
//         //@ts-ignore
//         await createSpreadsheet(session.accessToken)
//     } catch (error) {
//         console.log(error)
//     }
//   }

  return (
    <div>
        {/* <button className="outline-2 p-4" onClick={handleClick}> create sheet</button> */}
      <h1>Gmail Inbox</h1>
      {emailList.map((email:any) => (
        <p className="space-y-2 flex" key={email.id}>{email.id}</p>
      ))}

      <h1>Email Snippets</h1>
      {/* {emails.length > 0 ? (
        emails.map((payload, index) => (
          <p className="space-y-2 flex" key={index}>{payload}</p>
        ))
      ) : (
        <p>No emails found</p>
      )} */}
      {emails}
    </div>
  );
}
