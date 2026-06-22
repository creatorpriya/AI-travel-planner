require("dotenv").config();

const OpenAI =
  require("openai");

const generateTravelPlan =
  async ({
    destination,
    numberOfDays,
    budgetType,
    interests
  }) => {

    try {

      if (
        !process.env
          .OPENROUTER_API_KEY
      ) {
        throw new Error(
          "OPENROUTER_API_KEY is missing from .env"
        );
      }

      const client =
        new OpenAI({
          apiKey:
            process.env.OPENROUTER_API_KEY,
          baseURL:
            "https://openrouter.ai/api/v1"
        });

      const prompt = `
You are an AI Travel Planner.

Generate a travel itinerary.

Destination: ${destination}
Days: ${numberOfDays}
Budget: ${budgetType}
Interests: ${interests.join(", ")}

Return ONLY valid JSON.

{
  "itinerary": [
    {
      "day": 1,
      "activities": [
        "Activity 1",
        "Activity 2"
      ]
    }
  ],
  "budget": {
    "flights": 0,
    "hotel": 0,
    "food": 0,
    "activities": 0,
    "total": 0
  },
  "hotels": [
    {
      "name": "",
      "type": ""
    }
  ]
}
`;

const completion =
  await client.chat.completions.create({
    model: "openai/gpt-oss-20b:free",
    messages: [
      {
        role: "user",
        content: prompt
      }
    ],
    temperature: 0.7
  });

      const response =
        completion
          .choices[0]
          .message.content;

      console.log(
        "AI Response:",
        response
      );

    let cleanResponse = response
  .replace(/```json/g, "")
  .replace(/```/g, "")
  .trim();

try {
  return JSON.parse(cleanResponse);
} catch (error) {

  console.error(
    "JSON Parse Error:",
    error
  );

  return {
    rawResponse: cleanResponse
  };
}

    } catch (error) {

      console.error(
        "OPENROUTER ERROR:",
        error.message
      );

      throw error;
    }
};

module.exports =
  generateTravelPlan;