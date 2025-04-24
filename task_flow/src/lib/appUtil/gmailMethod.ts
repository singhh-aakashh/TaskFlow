

export async function getGmailMessages(accessToken: string) {
    const response = await fetch(
      "https://www.googleapis.com/gmail/v1/users/me/messages",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response.json();
  }

  export async function getGmail(accessToken:string,id:string){
    const response = await fetch(`https://gmail.googleapis.com/gmail/v1/users/me/messages/${id}`,
        {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
    );
    return response.json();
  }

export async function startGmailWatch(accessToken:string){
  const url = "https://www.googleapis.com/gmail/v1/users/me/watch";
  const requestData = {
    topicName: "projects/task-flow-451609/topics/task-flow", // Set your Pub/Sub topic
    labelIds: ["INBOX"], // Watch only the inbox
  };
  try {
     await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    }).then((response) => response.json()) // Convert response to JSON
    .then((data) => console.log("Success:", data))
    .catch((error) => console.error("Error:", error));

  } catch (error) {
    console.error("Error starting Gmail Watch:", error);
  }
}







