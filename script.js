const button = document.getElementById("gachaBtn");
const result = document.getElementById("result");

button.addEventListener("click", async () => {
  result.innerText = "🎲 思考中，请稍候...";

  try {
    const response = await fetch("/api/gacha");
    const data = await response.json();

    if (data.text) {
      result.innerText = `💖 ${data.text}`;
    } else {
      result.innerText = "出错啦，请重试 😢";
    }
  } catch (error) {
    result.innerText = "Look like something went to wrong 😢";
  }
});
