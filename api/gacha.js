export default async function handler(req, res) {
  const prompt = "请告诉我，今天中午吃什么，不要重复，不要重复，每次发送的都必须不一样。";
  const apiKey = process.env.DEEPSEEK_API_KEY; // 从环境变量读取

  if (!apiKey) {
    return res.status(500).json({ error: "DEEPSEEK_API_KEY 未配置" });
  }

  try {
    const response = await fetch("https://api.deepseek.com/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "deepseek-chat",
        messages: [
          { role: "system", content: "You are a gentle, positive assistant who gives comforting messages in Chinese." },
          { role: "user", content: prompt },
        ],
        stream: false,
      }),
    });

    const data = await response.json();

    if (data.error) {
      return res.status(500).json({ error: data.error.message });
    }

    const text = data.choices?.[0]?.message?.content || "AI 没有返回内容";
    res.status(200).json({ text });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
