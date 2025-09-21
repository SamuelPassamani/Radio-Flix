import {NextRequest, NextResponse} from 'next/server';

const STREAM_URL = 'https://stream.zeno.fm/cbzw2rbebfkuv';
const PRIMARY_API = `https://twj.es/free/?url=${STREAM_URL}`;
const FALLBACK_API = `https://twj.es/metadata/?url=${STREAM_URL}`;

export async function GET(request: NextRequest) {
  try {
    let response = await fetch(PRIMARY_API);
    if (!response.ok) {
      response = await fetch(FALLBACK_API);
    }
    if (!response.ok) {
      throw new Error('Failed to fetch from both APIs');
    }
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching stream info:', error);
    return NextResponse.json(
      {error: 'Failed to fetch stream info'},
      {status: 500}
    );
  }
}
