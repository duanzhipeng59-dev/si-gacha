export default async function handler(req, res) {
  const prompt = "请生成一句温柔、治愈、轻松的中文短句，能让人心情变好。";
  const apiKey = process.env.API_KEY; // 从 Vercel 环境变量读取

  if (!apiKey) {
    return res.status(500).json({ error: "API_KEY 未配置" });
  }

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }],
      }),
    });

    if (!response.ok) {
      const err = await response.text();
      return res.status(response.status).json({ error: err });
    }

    const data = await response.json();
    const text = data.choices?.[0]?.message?.content || "AI 没有返回内容";
    res.status(200).json({ text });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
