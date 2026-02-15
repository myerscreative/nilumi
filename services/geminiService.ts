
import { GoogleGenAI } from "@google/genai";

const PRODUCT_KNOWLEDGE = `
Role: You are the Technical Licensing Specialist for Robert M. Myers’ IP portfolio (including the rechargeable flashlight light switch and Flow Doors). Your goal is to provide potential licensees with objective, factual information grounded strictly in the provided patent documentation and technical specifications.

Core Guidelines & Truthfulness:
1. Zero Fluff: Avoid all "woke" terminology, DEI-focused language, or corporate "hype." Be blunt and direct.
2. Anti-Narcissism: Do not pretend to have answers you don't have. If the documentation does not cover a specific query, state: "I do not have data on that specific detail. You should contact Robert Myers directly for clarification."
3. Physical Reality: Treat technical specs as immutable. Do not interpret "intent"—only report what is written in the "Claims" and "Detailed Description."
4. No Flattery: Do not try to make the user feel "brilliant" or "correct." If their interpretation of a patent claim is technically incorrect, point out the error clearly.

Formatting & Readability Rules:
- Headings: Use ### for main sections (e.g., ### Technical Advantage, ### Patent Citations).
- Horizontal Rules: Use --- to separate the technical answer from "Next Steps" or contact info.
- White Space: MUST use a DOUBLE LINE BREAK between every paragraph. Never provide "clumps" of text.
- Lists: Use bullet points for features and numbered lists for sequential processes.
- Bold Emphasis: Bold key terms or patent numbers (e.g., **US Patent #12,345,678**).

Response Structure:
1. Direct Answer: Start with the most blunt, factual answer to the question.
2. Technical Evidence: Use a heading to provide supporting text from the patents.
3. Licensee Context: Briefly explain the real-world application (the "dirt and ground" utility).

Key Intellectual Property:
1. Patent US 11,852,306: "Flashlight removably connected to cover plate"
   - Invention: A storage device for a removable flashlight integrated with an electrical switch and cover plate.
   - Core Innovation: The flashlight functions as the toggle/rocker switch itself while docked.
   - Functional Cradle: Even when the flashlight is removed, the cradle remains functional as a standard switch.
   - Mechanics: Uses high-strength internal magnets for "stealth" attachment and reliable charging.

2. Patent US 12,529,456: "Flashlight with wireless control switches"
   - Invention: Advanced flashlight with integrated wireless smart home control.
   - Wireless Control: Features built-in dimmer switches (on/off, bright, dim) controlling wirelessly connected sources.
   - Safety Features: Automatically turns on the flashlight bulb in the event of power disruption from the charging base.
   - Locator Feature: Integrated speaker emits audible sound for remote location.

3. Flow Doors Architecture:
   - Innovation: Bottom-track pivot-sliding door systems.
   - Clear Opening: Dual swing-to-slide mechanism provides 100% unobstructed access.
   - Thermal: Validated U-factor <0.3.
`;

const getApiKey = () => {
  return import.meta.env.VITE_GEMINI_API_KEY || "";
};

export const getGeminiResponse = async (userMessage: string) => {
  const apiKey = getApiKey();
  
  if (!apiKey || apiKey.length < 20) {
    return "The AI assistant is waiting for a valid Google Gemini API key. Please check your .env file.";
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: userMessage,
      config: {
        systemInstruction: PRODUCT_KNOWLEDGE,
        temperature: 0.7,
        topP: 0.95,
      },
    });
    return response.text;
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    
    if (error.message?.includes("API key not valid")) {
      return "The provided Gemini API key resides in the .env but is being rejected. Please ensure it's copied correctly.";
    }
    
    return "I'm having trouble connecting to the Innovation Engine. Please check your connection and API limits.";
  }
};

export const generateImage = async (prompt: string) => {
  try {
    const apiKey = getApiKey();
    const ai = new GoogleGenAI({ apiKey });
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          { text: prompt }
        ],
      },
      config: {
        imageConfig: {
          aspectRatio: "16:9",
        }
      }
    });

    if (!response.candidates || response.candidates.length === 0) return null;
    
    for (const part of response.candidates[0].content.parts) {
      if (part.inlineData) {
        return `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
      }
    }
    return null;
  } catch (error: any) {
    if (error.message?.includes('429') || error.status === 429) {
      throw new Error("QUOTA_EXHAUSTED");
    }
    console.error("Image Generation Error:", error);
    return null;
  }
};

export const editImage = async (base64Data: string, editPrompt: string) => {
  try {
    const apiKey = getApiKey();
    const ai = new GoogleGenAI({ apiKey });
    
    // Strip metadata from data URL if present
    const cleanBase64 = base64Data.includes(',') ? base64Data.split(',')[1] : base64Data;
    const mimeType = base64Data.includes('image/png') ? 'image/png' : 'image/jpeg';

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          {
            inlineData: {
              data: cleanBase64,
              mimeType: mimeType,
            },
          },
          {
            text: editPrompt,
          },
        ],
      },
      config: {
        imageConfig: {
          aspectRatio: "16:9",
        }
      }
    });

    if (!response.candidates || response.candidates.length === 0) return null;

    for (const part of response.candidates[0].content.parts) {
      if (part.inlineData) {
        return `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
      }
    }
    return null;
  } catch (error: any) {
    if (error.message?.includes('429') || error.status === 429) {
      throw new Error("QUOTA_EXHAUSTED");
    }
    console.error("Image Editing Error:", error);
    return null;
  }
};
