const button = document.getElementById("gachaBtn");
const result = document.getElementById("result");

button.addEventListener("click", async () => {
  result.innerText = "🎲 扭蛋中，请稍候...";
  
  const prompt = "请生成一句温柔、治愈、轻松的中文短句，能让人心情变好。";

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer ${API_KEY}"
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }],
      }),
    });

    const data = await response.json();
    const text = data.choices[0].message.content;
    result.innerText = `💖 ${text}`;
  } catch (error) {
    result.innerText = "Look like something went to wrong 😢";
  }
});
