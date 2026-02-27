export default async function handler(req: any, res: any) {
  try {
    return res.status(200).json({
      ok: true,
      envExists: !!process.env.GEMINI_API_KEY,
      envLength: process.env.GEMINI_API_KEY
        ? process.env.GEMINI_API_KEY.length
        : 0
    });
  } catch (error: any) {
    return res.status(500).json({
      error: "Crash interno",
      details: error?.message
    });
  }
}
