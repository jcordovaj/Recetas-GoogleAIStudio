import { GoogleGenAI, Type } from "@google/genai";
import { AnalysisResult } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const SYSTEM_INSTRUCTION = `
You are a world-class professional chef with 20 years of experience. You are an expert in:
- International cuisine (Italian, Mexican, Asian, French, Mediterranean, Fusion)
- Advanced and basic culinary techniques
- Ingredient identification by visual appearance
- Calculation of proportions and quantities
- Nutrition and dietetics
- Ingredient costs and kitchen budgets

Your special skill is REVERSE ENGINEERING recipes. You can look at a photo of a finished dish and infer:
- What ingredients were used (including invisible spices and condiments)
- The cooking method
- The preparation order
- Temperatures and times
- Special techniques applied
- Professional tips and tricks

You are detailed but practical. Your recipes are reproducible by home cooks.
If the image is not food, you must clearly state that it is not food.
`;

export async function analyzeFoodImage(base64Image: string, mimeType: string): Promise<AnalysisResult> {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            isFood: { type: Type.BOOLEAN },
            notFoodReason: { type: Type.STRING },
            recipe: {
              type: Type.OBJECT,
              properties: {
                dishName: { type: Type.STRING },
                cuisineType: { type: Type.STRING },
                category: { type: Type.STRING },
                description: { type: Type.STRING },
                visualAnalysis: {
                  type: Type.OBJECT,
                  properties: {
                    visibleIngredients: { type: Type.ARRAY, items: { type: Type.STRING } },
                    cookingMethod: { type: Type.STRING },
                    presentation: { type: Type.STRING },
                  }
                },
                ingredients: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      title: { type: Type.STRING },
                      items: {
                        type: Type.ARRAY,
                        items: {
                          type: Type.OBJECT,
                          properties: {
                            name: { type: Type.STRING },
                            amount: { type: Type.NUMBER, description: "Numerical amount for calculations" },
                            unit: { type: Type.STRING },
                            displayAmount: { type: Type.STRING, description: "Readable amount like '1/2 cup'" },
                            substitute: { type: Type.STRING, nullable: true },
                          },
                          required: ["name", "amount", "unit", "displayAmount"]
                        }
                      }
                    },
                    required: ["title", "items"]
                  }
                },
                instructions: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      step: { type: Type.NUMBER },
                      text: { type: Type.STRING },
                      time: { type: Type.STRING, nullable: true },
                      temperature: { type: Type.STRING, nullable: true },
                      chefTip: { type: Type.STRING, nullable: true },
                    },
                    required: ["step", "text"]
                  }
                },
                time: {
                  type: Type.OBJECT,
                  properties: {
                    prep: { type: Type.STRING },
                    cook: { type: Type.STRING },
                    total: { type: Type.STRING },
                  },
                  required: ["prep", "cook", "total"]
                },
                difficulty: {
                  type: Type.OBJECT,
                  properties: {
                    level: { type: Type.STRING },
                    score: { type: Type.NUMBER },
                    equipment: { type: Type.ARRAY, items: { type: Type.STRING } },
                  },
                  required: ["level", "score", "equipment"]
                },
                nutrition: {
                  type: Type.OBJECT,
                  properties: {
                    calories: { type: Type.NUMBER },
                    protein: { type: Type.STRING },
                    carbs: { type: Type.STRING },
                    fat: { type: Type.STRING },
                    fiber: { type: Type.STRING },
                    sugar: { type: Type.STRING },
                    sodium: { type: Type.STRING },
                  },
                  required: ["calories", "protein", "carbs", "fat"]
                },
                cost: {
                  type: Type.OBJECT,
                  properties: {
                    total: { type: Type.STRING },
                    perServing: { type: Type.STRING },
                    restaurantPrice: { type: Type.STRING },
                    homemadePrice: { type: Type.STRING },
                  },
                  required: ["total", "perServing", "restaurantPrice", "homemadePrice"]
                },
                variations: {
                  type: Type.OBJECT,
                  properties: {
                    vegetarian: { type: Type.STRING, nullable: true },
                    vegan: { type: Type.STRING, nullable: true },
                    lowCarb: { type: Type.STRING, nullable: true },
                  }
                },
                proTips: { type: Type.ARRAY, items: { type: Type.STRING } },
              },
            }
          },
          required: ["isFood"]
        }
      },
      contents: {
        parts: [
          {
            inlineData: {
              mimeType: mimeType,
              data: base64Image
            }
          },
          {
            text: "Analyze this image. If it is food, provide a detailed reverse-engineered recipe for 4 servings."
          }
        ]
      }
    });

    const text = response.text;
    if (!text) throw new Error("No response from AI");
    
    return JSON.parse(text) as AnalysisResult;

  } catch (error) {
    console.error("Gemini Analysis Error:", error);
    throw error;
  }
}
