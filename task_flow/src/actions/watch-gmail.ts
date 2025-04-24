"use server"
import {google} from "googleapis"


export async function watchGmail() {
  if (typeof window !== 'undefined') {
    throw new Error('This function must run on the server');
  }
  const clientId = process.env.AUTH_GOOGLE_ID;
const clientSecret = process.env.AUTH_GOOGLE_SECRET;
const redirectUri="https://8972-43-251-93-174.ngrok-free.app/api/auth/callback/google"
const auth = new google.auth.OAuth2(
  clientId,
  clientSecret,
  redirectUri
);
const gmail = google.gmail({ version: 'v1', auth });
//@ts-expect-error
  const response:any = await gmail.users.watch({
    userId: 'me',
    resource: {
      topicName: 'projects/your-project-id/topics/gmail-notifications',
      labelIds: ['INBOX'], // Watch for new emails in Inbox
    },
  });
  console.log('Watch set up with historyId:', response?.data?.historyId);
}