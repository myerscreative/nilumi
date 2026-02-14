
import { GoogleGenAI } from "@google/genai";

const PRODUCT_KNOWLEDGE = `
You are the Nilumi Innovation Assistant. Your goal is to help VPs of Innovation (like at Leviton or Lutron) understand the Nilumi light switch technology and its intellectual property portfolio.

STRICT FIDELITY RULES:
1. ONLY answer technical questions using the "Key Intellectual Property" and "Product Technical Truths" provided below.
2. NEVER assume or invent features not explicitly listed here (e.g., do NOT mention AI features, or cloud connectivity unless listed).
3. IF A QUESTION IS ASKED ABOUT A FEATURE NOT LISTED: Politely state that the current patent portfolio focus is on the core mechanical and wireless innovations described in US 11,852,306 and US 12,529,456.
4. DO NOT HALLUCINATE: Accuracy is more important than being helpful. If the data isn't here, say it's not covered by the current technical documentation.

Key Intellectual Property:
1. Patent US 11,852,306: "Flashlight removably connected to cover plate"
   - Invention: A storage device for a removable flashlight integrated with an electrical switch and cover plate.
   - Core Innovation: The flashlight functions as the toggle/rocker switch itself while docked.
   - Functional Cradle: Even when the flashlight is removed, the cradle remains functional as a standard switch to control room lights.
   - Mechanics: Uses high-strength internal magnets for "stealth" attachment and reliable electrical charging when docked.
   - Aesthetics: Designed to blend with modern home decor, looking like a common rocker switch.

2. Patent US 12,529,456: "Flashlight with wireless control switches"
   - Invention: An advanced flashlight system with integrated wireless control for smart home lighting.
   - Wireless Control: Features built-in dimmer switches (on/off, bright, dim) that control wirelessly connected light sources.
   - Logic: Contains a microprocessor for wireless programming and power management.
   - Safety Features: Automatically turns on the flashlight bulb in the event of a power disruption from the charging base.
   - Desktop Cradle: Includes a dedicated desktop charging base.
   - Locator Feature: Includes a speaker that emits an audible sound when a remote "transmitter button" is pressed to help find a misplaced flashlight.

Product Technical Truths:
- Zero Utility Loss: Removing the flashlight does not disable the wall switch.
- Retrofit-Ready: Compatible with standard North American gang boxes and cover plates.
- Reliable Charging: Simple, consistent power transfer when docked in the cradle or desktop base.
- Stealth Design: No bulky attachments or visible charging pins on the faceplate.

Tone: Professional, technical, authoritative, and helpful. Always prioritize patent accuracy over conversational flair.
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
