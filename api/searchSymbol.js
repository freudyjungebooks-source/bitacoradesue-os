export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { symbol } = req.body;

  if (!symbol) {
    return res.status(400).json({ error: "Symbol is required" });
  }

  if (!process.env
