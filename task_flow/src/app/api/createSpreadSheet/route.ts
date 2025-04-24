import { google } from "googleapis";
import { NextRequest, NextResponse } from "next/server";

export default async function handler(req:NextRequest, res:NextResponse) {
  if (req.method !== "POST") {
    return new NextResponse.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const { accessToken } = req.body; // Get accessToken from frontend

    if (!accessToken) {
      return res.status(400).json({ error: "Access Token is required" });
    }

    const authClient = new google.auth.OAuth2();
    authClient.setCredentials({ access_token: accessToken });

    const sheets = google.sheets({ version: "v4", auth: authClient });

    const response = await sheets.spreadsheets.create({
      resource: {
        properties: {
          title: "My New Spreadsheet",
        },
      },
    });

    return res.status(200).json({
      spreadsheetId: response.data.spreadsheetId,
      url: `https://docs.google.com/spreadsheets/d/${response.data.spreadsheetId}`,
    });
  } catch (error) {
    console.error("Error creating spreadsheet:", error);
    return res.status(500).json({ error: error.message });
  }
}
