import React, { useState, useCallback } from 'react';
import { ChefHat, Upload, Loader2, AlertCircle, RefreshCw, Printer } from 'lucide-react';
import { analyzeFoodImage } from './services/geminiService';
import { AnalysisResult, RecipeData } from './types';
import RecipeDisplay from './components/RecipeDisplay';

// Helper to convert file to base64
const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const result = reader.result as string;
      // Remove the data URL prefix (e.g., "data:image/jpeg;base64,")
      const base64 = result.split(',')[1];
      resolve(base64);
    };
    reader.onerror = error => reject(error);
  });
};

const LoadingSteps = [
  "Analyzing image composition...",
  "Identifying ingredients...",
  "Detecting cooking techniques...",
  "Calculating nutritional values...",
  "Estimating costs...",
  "Finalizing chef's notes..."
];

export default function App() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
      setResult(null);
      setError(null);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const selectedFile = e.dataTransfer.files[0];
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
      setResult(null);
      setError(null);
    }
  };

  const startAnalysis = useCallback(async () => {
    if (!file) return;

    setIsLoading(true);
    setLoadingStep(0);
    setError(null);

    // Simulate progress steps
    const stepInterval = setInterval(() => {
      setLoadingStep(prev => (prev < LoadingSteps.length - 1 ? prev + 1 : prev));
    }, 1500);

    try {
      const base64 = await fileToBase64(file);
      const data = await analyzeFoodImage(base64, file.type);
      setResult(data);
    } catch (err) {
      console.error(err);
      setError("Failed to analyze image. Please try again or use a clearer photo.");
    } finally {
      clearInterval(stepInterval);
      setIsLoading(false);
    }
  }, [file]);

  const reset = () => {
    setFile(null);
    setPreview(null);
    setResult(null);
    setError(null);
  };

  return (
    <div className="min-h-screen pb-12">
      {/* Header */}
      <header className="bg-white border-b border-stone-200 sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 text-primary">
            <ChefHat size={32} strokeWidth={2.5} />
            <h1 className="font-serif text-2xl font-bold text-text">Recipe Reverse Engineer</h1>
          </div>
          {result?.recipe && (
             <div className="flex gap-2 no-print">
                <button 
                  onClick={reset}
                  className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-stone-600 hover:text-primary transition-colors"
                >
                  <RefreshCw size={16} />
                  New Scan
                </button>
                <button 
                  onClick={() => window.print()}
                  className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-stone-600 hover:text-primary transition-colors"
                >
                  <Printer size={16} />
                  Print
                </button>
             </div>
          )}
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 mt-8">
        
        {/* Initial State / Upload */}
        {!result && !isLoading && (
          <div className="max-w-xl mx-auto text-center space-y-8 animate-fade-in">
            <div className="space-y-4">
              <h2 className="text-4xl font-serif font-bold text-text">What's on your plate?</h2>
              <p className="text-lg text-stone-600">
                Upload a photo of any dish and I'll tell you how to cook it, 
                what's in it, and how much it costs.
              </p>
            </div>

            <div 
              className="relative group cursor-pointer"
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleDrop}
            >
              <div className={`
                aspect-[4/3] rounded-2xl border-4 border-dashed transition-all duration-300 flex flex-col items-center justify-center gap-4
                ${preview ? 'border-primary bg-stone-50' : 'border-stone-300 hover:border-primary hover:bg-orange-50 bg-white'}
              `}>
                {preview ? (
                  <img src={preview} alt="Preview" className="w-full h-full object-contain rounded-xl p-2" />
                ) : (
                  <>
                    <div className="w-20 h-20 rounded-full bg-orange-100 text-primary flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Upload size={32} />
                    </div>
                    <div className="space-y-1">
                      <p className="font-medium text-stone-900">Click or drag image here</p>
                      <p className="text-sm text-stone-500">Supports JPG, PNG, WEBP</p>
                    </div>
                  </>
                )}
                
                <input 
                  type="file" 
                  accept="image/*" 
                  className="absolute inset-0 opacity-0 cursor-pointer"
                  onChange={handleFileChange}
                />
              </div>
            </div>

            {error && (
              <div className="p-4 bg-red-50 text-red-600 rounded-lg flex items-center justify-center gap-2">
                <AlertCircle size={20} />
                {error}
              </div>
            )}

            {file && (
              <button 
                onClick={startAnalysis}
                className="w-full py-4 bg-primary text-white rounded-xl font-bold text-lg shadow-lg hover:bg-orange-600 hover:shadow-xl transition-all active:scale-[0.98]"
              >
                Analyze Dish
              </button>
            )}
          </div>
        )}

        {/* Loading State */}
        {isLoading && (
          <div className="max-w-xl mx-auto text-center py-20 space-y-8">
            <div className="relative w-32 h-32 mx-auto">
               <div className="absolute inset-0 border-4 border-stone-200 rounded-full"></div>
               <div className="absolute inset-0 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
               <ChefHat className="absolute inset-0 m-auto text-primary animate-bounce" size={40} />
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl font-serif font-bold text-stone-800">
                {LoadingSteps[loadingStep]}
              </h3>
              <p className="text-stone-500">This might take up to 30 seconds...</p>
            </div>
            {/* Progress Bar */}
            <div className="w-full h-2 bg-stone-100 rounded-full overflow-hidden">
               <div 
                 className="h-full bg-primary transition-all duration-500 ease-out"
                 style={{ width: `${((loadingStep + 1) / LoadingSteps.length) * 100}%` }}
               />
            </div>
          </div>
        )}

        {/* Results */}
        {result && (
          <div className="animate-fade-in-up">
            {result.isFood && result.recipe ? (
              <RecipeDisplay recipe={result.recipe} image={preview!} />
            ) : (
              <div className="max-w-xl mx-auto text-center py-20 space-y-6">
                <div className="w-24 h-24 bg-stone-100 rounded-full flex items-center justify-center mx-auto text-stone-400">
                  <AlertCircle size={48} />
                </div>
                <div>
                  <h2 className="text-3xl font-serif font-bold mb-2">Not Food Detected</h2>
                  <p className="text-stone-600 text-lg">
                    {result.notFoodReason || "This image doesn't look like a food dish. Please try uploading a clear photo of a meal."}
                  </p>
                </div>
                <button 
                  onClick={reset}
                  className="px-8 py-3 bg-primary text-white rounded-lg font-medium hover:bg-orange-600 transition-colors"
                >
                  Try Another Photo
                </button>
              </div>
            )}
          </div>
        )}

      </main>
    </div>
  );
}
