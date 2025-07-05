// pages/api/proxy-muapi.js

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const muApiUrl = 'https://api.muapi.ai/api/v1/generate_wan_ai_effects';
  const apiKey = req.headers['x-api-key'];
  const payload = req.body;

  try {
    const muApiRes = await fetch(muApiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
      },
      body: JSON.stringify(payload),
    });

    const data = await muApiRes.json();
    res.status(muApiRes.status).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
