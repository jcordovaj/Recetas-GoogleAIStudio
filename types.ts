export interface IngredientItem {
  name: string;
  amount: number; // Numerical value for calculation
  unit: string;
  displayAmount: string; // Original string representation e.g. "1/2 cup"
  substitute?: string;
}

export interface IngredientSection {
  title: string;
  items: IngredientItem[];
}

export interface InstructionStep {
  step: number;
  text: string;
  time?: string;
  temperature?: string;
  chefTip?: string;
}

export interface NutritionData {
  calories: number;
  protein: string;
  carbs: string;
  fat: string;
  fiber: string;
  sugar: string;
  sodium: string;
}

export interface CostData {
  total: string;
  perServing: string;
  restaurantPrice: string;
  homemadePrice: string;
}

export interface RecipeData {
  dishName: string;
  cuisineType: string;
  category: string;
  description: string;
  visualAnalysis: {
    visibleIngredients: string[];
    cookingMethod: string;
    presentation: string;
  };
  ingredients: IngredientSection[];
  instructions: InstructionStep[];
  time: {
    prep: string;
    cook: string;
    total: string;
  };
  difficulty: {
    level: string; // 'Beginner' | 'Intermediate' | 'Advanced'
    score: number; // 1-10
    equipment: string[];
  };
  nutrition: NutritionData;
  cost: CostData;
  variations: {
    vegetarian?: string;
    vegan?: string;
    lowCarb?: string;
  };
  proTips: string[];
}

export interface AnalysisResult {
  isFood: boolean;
  notFoodReason?: string;
  recipe?: RecipeData;
}
