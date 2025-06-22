async function askGemini() {
  const prompt = document.getElementById("geminiPrompt").value;
  const responseEl = document.getElementById("geminiResponse");

  const apiKey = 'AIzaSyC55cIIvdeutEn6N0JuluKx4XZwaZWS7ow'; // replace with your actual API key

  const body = {
    contents: [{ parts: [{ text: prompt }] }]
  };

  try {
    const res = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=" + apiKey, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    });

    const data = await res.json();
    const reply = data.candidates?.[0]?.content?.parts?.[0]?.text || "No response.";
    responseEl.innerHTML = `<p>${reply}</p>`;

  } catch (err) {
    console.error(err);
    responseEl.innerHTML = `<p>Error talking to Gemini.</p>`;
  }
}
document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("askGeminiBtn");
  if (btn) {
    btn.addEventListener("click", askGemini);
  }
});
