import { google } from 'googleapis'
import { NextResponse } from 'next/server'

// Initialize Google Sheets API
const auth = new google.auth.GoogleAuth({
  credentials: {
    client_email: process.env.GOOGLE_CLIENT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY!,
  },
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
})

const sheets = google.sheets({ version: 'v4', auth })

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { firstName, lastName, email } = body

    // Validate the data
    if (!firstName || !lastName || !email) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Append data to Google Sheet
    await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: 'Sheet1!A1:D1',
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [[firstName, lastName, email, new Date().toISOString()]],
      },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Submission error:', error)
    return NextResponse.json(
      { error: 'Failed to submit form' },
      { status: 500 }
    )
  }
} 