import React, { useState } from 'react';
import { Clock, Users, Flame, ChefHat, DollarSign, Activity, List, Layers, Utensils, RefreshCw } from 'lucide-react';
import { RecipeData } from '../types';
import IngredientsList from './IngredientsList';
import Instructions from './Instructions';
import NutritionPanel from './NutritionPanel';
import CostAnalysis from './CostAnalysis';
import ChefTips from './ChefTips';

interface RecipeDisplayProps {
  recipe: RecipeData;
  image: string;
}

type Tab = 'recipe' | 'nutrition' | 'cost' | 'tips';

export default function RecipeDisplay({ recipe, image }: RecipeDisplayProps) {
  const [activeTab, setActiveTab] = useState<Tab>('recipe');
  const [servings, setServings] = useState(4);

  const difficultyIcons = {
    'Beginner': <span className="flex text-secondary"><ChefHat size={18} /></span>,
    'Intermediate': <span className="flex text-primary"><ChefHat size={18} /><ChefHat size={18} /></span>,
    'Advanced': <span className="flex text-accent"><ChefHat size={18} /><ChefHat size={18} /><ChefHat size={18} /></span>,
  };

  return (
    <div className="grid lg:grid-cols-12 gap-8 pb-12">
      
      {/* Left Column: Image & Quick Stats */}
      <div className="lg:col-span-4 space-y-6">
        {/* Polaroid Style Image */}
        <div className="bg-white p-4 pb-16 shadow-lg rotate-1 rounded-sm transform hover:rotate-0 transition-transform duration-500">
          <div className="aspect-square bg-stone-100 overflow-hidden mb-4">
             <img src={image} alt={recipe.dishName} className="w-full h-full object-cover" />
          </div>
          <div className="font-serif text-2xl text-center text-stone-800 leading-tight">
            {recipe.dishName}
          </div>
          <div className="text-center text-stone-500 text-sm mt-2 italic font-serif">
            {recipe.cuisineType} Cuisine • {recipe.category}
          </div>
        </div>

        {/* Quick Stats Card */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-stone-200 space-y-6">
           <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                 <div className="text-stone-500 text-xs uppercase tracking-wider font-medium flex items-center gap-1">
                    <Clock size={14} /> Total Time
                 </div>
                 <div className="font-semibold text-lg">{recipe.time.total}</div>
              </div>
              <div className="space-y-1">
                 <div className="text-stone-500 text-xs uppercase tracking-wider font-medium flex items-center gap-1">
                    <Flame size={14} /> Difficulty
                 </div>
                 <div className="font-semibold text-lg flex items-center gap-2">
                    {recipe.difficulty.level}
                 </div>
                 <div className="flex gap-1">
                    {[...Array(10)].map((_, i) => (
                      <div key={i} className={`h-1.5 w-full rounded-full ${i < recipe.difficulty.score ? 'bg-primary' : 'bg-stone-200'}`} />
                    ))}
                 </div>
              </div>
           </div>

           <div className="pt-6 border-t border-stone-100">
             <div className="flex items-center justify-between mb-4">
               <span className="text-sm font-medium text-stone-600 flex items-center gap-2">
                 <Users size={16} /> Servings
               </span>
               <span className="font-bold text-xl text-primary">{servings}</span>
             </div>
             <input 
               type="range" 
               min="1" 
               max="12" 
               value={servings}
               onChange={(e) => setServings(parseInt(e.target.value))}
               className="w-full h-2 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-primary"
             />
             <div className="flex justify-between text-xs text-stone-400 mt-2 font-medium">
               <span>1</span>
               <span>6</span>
               <span>12</span>
             </div>
           </div>
        </div>

        {/* Visual Analysis Badge */}
        <div className="bg-stone-50 rounded-xl p-5 border border-stone-200 text-sm space-y-3">
          <h3 className="font-bold text-stone-700 flex items-center gap-2">
            <Activity size={16} className="text-secondary" /> AI Visual Analysis
          </h3>
          <ul className="space-y-2 text-stone-600">
             <li className="flex gap-2">
               <span className="text-secondary shrink-0">•</span>
               <span>Identified <strong>{recipe.visualAnalysis.visibleIngredients.length}</strong> visible ingredients</span>
             </li>
             <li className="flex gap-2">
               <span className="text-secondary shrink-0">•</span>
               <span>Detected technique: <strong>{recipe.visualAnalysis.cookingMethod}</strong></span>
             </li>
          </ul>
        </div>
      </div>

      {/* Right Column: Details */}
      <div className="lg:col-span-8 space-y-6">
        
        {/* Intro */}
        <div>
          <h2 className="text-4xl font-serif font-bold text-stone-900 mb-4">{recipe.dishName}</h2>
          <p className="text-lg text-stone-600 leading-relaxed border-l-4 border-primary pl-4">
            {recipe.description}
          </p>
        </div>

        {/* Tabs */}
        <div className="flex overflow-x-auto pb-1 border-b border-stone-200 gap-6 no-print">
          <TabButton 
            active={activeTab === 'recipe'} 
            onClick={() => setActiveTab('recipe')} 
            icon={<Utensils size={18} />} 
            label="Recipe" 
          />
          <TabButton 
            active={activeTab === 'nutrition'} 
            onClick={() => setActiveTab('nutrition')} 
            icon={<Activity size={18} />} 
            label="Nutrition" 
          />
          <TabButton 
            active={activeTab === 'cost'} 
            onClick={() => setActiveTab('cost')} 
            icon={<DollarSign size={18} />} 
            label="Cost Analysis" 
          />
          <TabButton 
            active={activeTab === 'tips'} 
            onClick={() => setActiveTab('tips')} 
            icon={<ChefHat size={18} />} 
            label="Chef's Secrets" 
          />
        </div>

        {/* Tab Content */}
        <div className="min-h-[500px]">
          {activeTab === 'recipe' && (
            <div className="space-y-8 animate-fade-in">
              <IngredientsList sections={recipe.ingredients} servings={servings} />
              <Instructions steps={recipe.instructions} />
              
              {/* Variations */}
              <div className="bg-orange-50 rounded-xl p-6 border border-orange-100">
                <h3 className="font-serif font-bold text-xl text-stone-800 mb-4 flex items-center gap-2">
                  <RefreshCw size={20} className="text-primary" /> Dietary Variations
                </h3>
                <div className="grid md:grid-cols-3 gap-4">
                  {recipe.variations.vegetarian && (
                    <div className="bg-white p-4 rounded-lg shadow-sm">
                      <div className="font-bold text-green-600 mb-1 text-sm uppercase tracking-wide">Vegetarian</div>
                      <p className="text-sm text-stone-600">{recipe.variations.vegetarian}</p>
                    </div>
                  )}
                  {recipe.variations.vegan && (
                    <div className="bg-white p-4 rounded-lg shadow-sm">
                      <div className="font-bold text-green-600 mb-1 text-sm uppercase tracking-wide">Vegan</div>
                      <p className="text-sm text-stone-600">{recipe.variations.vegan}</p>
                    </div>
                  )}
                  {recipe.variations.lowCarb && (
                    <div className="bg-white p-4 rounded-lg shadow-sm">
                      <div className="font-bold text-blue-600 mb-1 text-sm uppercase tracking-wide">Low Carb</div>
                      <p className="text-sm text-stone-600">{recipe.variations.lowCarb}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'nutrition' && (
            <div className="animate-fade-in">
              <NutritionPanel data={recipe.nutrition} />
            </div>
          )}

          {activeTab === 'cost' && (
            <div className="animate-fade-in">
              <CostAnalysis data={recipe.cost} />
            </div>
          )}

          {activeTab === 'tips' && (
            <div className="animate-fade-in">
              <ChefTips tips={recipe.proTips} equipment={recipe.difficulty.equipment} />
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

const TabButton = ({ active, onClick, icon, label }: { active: boolean, onClick: () => void, icon: React.ReactNode, label: string }) => (
  <button
    onClick={onClick}
    className={`
      flex items-center gap-2 py-4 px-2 border-b-2 font-medium text-sm transition-colors whitespace-nowrap
      ${active ? 'border-primary text-primary' : 'border-transparent text-stone-500 hover:text-stone-800'}
    `}
  >
    {icon}
    {label}
  </button>
);