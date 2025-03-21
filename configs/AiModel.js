const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require("@google/generative-ai");

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash-exp",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
};

async function run() {
  const chatSession = model.startChat({
    generationConfig,
    history: [
      {
        role: "user",
        parts: [
          {text: "write a script to generate 30 seconds video on topic:  interesting historical story along with ai image prompt in realistic format for each scene and give me result in JSON format with imagePrompt and contentText as field \n        ],"},
        ],
      },
      {
        role: "model",
        parts: [
          {text: "```json\n{\n  \"video_script\": [\n    {\n      \"scene\": 1,\n      \"duration\": 5,\n      \"imagePrompt\": \"A bustling ancient Roman forum, filled with people in togas, merchants selling goods, and grand marble buildings under a clear blue sky. Realistic style, wide shot, bright daylight.\",\n      \"contentText\": \"Imagine ancient Rome, not just the emperors and gladiators, but the heart of everyday life...the bustling Roman Forum.\"\n    },\n    {\n      \"scene\": 2,\n      \"duration\": 7,\n      \"imagePrompt\": \"A close up shot of a hand holding a small clay tablet with cuneiform writing, partially cracked and aged, illuminated by soft sunlight coming through a window. Realistic, slightly shallow depth of field.\",\n      \"contentText\": \"Amongst the noise and trade, a quiet revolution was taking place: the development of written language. Forget pen and paper, they used clay tablets!\"\n    },\n      {\n      \"scene\": 3,\n      \"duration\": 6,\n     \"imagePrompt\": \"An ancient scribe, wearing simple linen clothing, carefully carving cuneiform symbols into a wet clay tablet using a stylus, his face concentrated and illuminated by a single oil lamp.  Realistic, mid shot, dim lighting with a warm glow.\",\n      \"contentText\":\"These scribes, the chroniclers of their time, meticulously pressed symbols into the soft clay, recording everything from trade transactions to epic poems.\"\n    },\n    {\n      \"scene\": 4,\n       \"duration\": 6,\n      \"imagePrompt\": \"A vast library in ancient Alexandria, with rows of papyrus scrolls stacked on shelves, scholars studying them, and sunlight streaming through a high window. Realistic, wide shot, warm and inviting atmosphere.\",\n      \"contentText\": \"These tablets and later, papyrus scrolls, were carefully stored and organized, forming the very first libraries, like the great library of Alexandria.\"\n    },\n    {\n      \"scene\": 5,\n      \"duration\": 6,\n       \"imagePrompt\":\"A close-up of hands slowly and carefully unrolling an ancient papyrus scroll, revealing beautifully written text, with slight wear and tear along the edges, illuminated by soft golden light. Realistic, shallow depth of field, focus on the detail of the scroll.\",\n        \"contentText\": \"These written words, stories, and knowledge, carefully preserved, connected generations and shaped the world as we know it today. Think of that next time you type a message.\"\n    }\n  ]\n}\n```\n"},
        ],
      },
    ],
  });

  const result = await chatSession.sendMessage("INSERT_INPUT_HERE");
  console.log(result.response.text());
}

run();