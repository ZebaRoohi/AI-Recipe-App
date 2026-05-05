import fetch from "node-fetch";

export async function getAIDishes(req, res) {
    try {
        const { state, category } = req.body;
        if (!state || !category) {
            return res.status(400).json({ err: "State and category required" });
        }

        // 1. Your dynamic prompt
        const prompt = `Give exactly 5 famous ${category} dishes from ${state} (India). Return ONLY comma separated names.`;

        // 2. Use the 'v1beta' endpoint for better model compatibility
        // Use 'gemini-1.5-flash' or 'gemini-1.5-flash-latest' for the best success rate
        const CURRENT_MODEL = "gemini-2.5-flash"; 
        const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`;

        const response = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                contents: [{ 
                    parts: [{ text: prompt }] // FIXED: Use the prompt variable, not a placeholder string
                }]
            })
        });

        const data = await response.json();

        // --- 1. CHECK FOR SERVER BUSY / HIGH DEMAND (503 or 429) ---
        if (response.status === 503 || response.status === 429 || data.error) {
            console.error("Gemini API Status:", response.status, data.error?.message);
            
            // Your custom "Server Busy" response
            return res.status(503).json({ 
                err: "Server is busy fetching data, please try after sometime.",
                details: data.error?.message || "High demand spike"
            });
        }

        // Error handling
        if (data.error) {
            console.error("Gemini API Error:", data.error.message);
            return res.status(data.error.code || 500).json({ 
                err: "Gemini API rejected the request", 
                details: data.error.message 
            });
        }

        // Safe extraction
        const text = data.candidates?.[0]?.content?.parts?.[0]?.text;

        if (!text) {
            return res.status(500).json({ err: "AI returned an empty response" });
        }

        // Convert the comma-separated string into a clean array
        const dishes = text.split(",").map(d => d.trim()).filter(d => d.length > 0);
        res.json({ dishes });

    } catch (error) {
        console.error("Server Error:", error);
        res.status(500).json({ err: "Internal server error" });
    }
}