import fetch from 'node-fetch';

export async function getRecipesDetails(req, res) {
  try {
    const { dishName } = req.params;

    if (!dishName) {
      return res.status(400).json({
        err: "Dish name is required"
      });
    }

    const prompt = `
Give me the recipe for ${dishName}.

Return ONLY valid JSON in this format:

{
  "name": "",
  "ingredients": [],
  "steps": []
}
`;

    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [{ text: prompt }]
          }
        ]
      })
    });

    const data = await response.json();

    // Handle Gemini errors
    if (
      response.status === 503 ||
      response.status === 429 ||
      data.error
    ) {
      console.error(
        "Gemini API Status:",
        response.status,
        data.error?.message
      );

      return res.status(503).json({
        err: "Server is busy fetching data",
        details:
          data.error?.message ||
          "High demand spike"
      });
    }

    // Extract AI text
    const text =
      data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!text) {
      return res.status(500).json({
        err: "AI returned empty response"
      });
    }

    // Clean markdown
    const cleanedText = text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    console.log("Gemini Recipe:", cleanedText);

    // Parse JSON
    const recipe = JSON.parse(cleanedText);

    // Send response
    res.json(recipe);

  } catch (err) {
    console.error(
      "Error in getRecipesDetails:",
      err
    );

    res.status(500).json({
      err: "Internal Server Error"
    });
  }
}