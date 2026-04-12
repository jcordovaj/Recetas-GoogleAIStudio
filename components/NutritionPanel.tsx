import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { NutritionData } from '../types';

export default function NutritionPanel({ data }: { data: NutritionData }) {
  // Parse numeric values for the chart (rough approximation from strings)
  const parseMacro = (str: string) => parseFloat(str.replace(/[^0-9.]/g, '')) || 0;

  const chartData = [
    { name: 'Protein', value: parseMacro(data.protein), color: '#84cc16' },
    { name: 'Carbs', value: parseMacro(data.carbs), color: '#f97316' },
    { name: 'Fat', value: parseMacro(data.fat), color: '#eab308' },
  ];

  return (
    <div className="grid md:grid-cols-2 gap-8">
      {/* FDA Label Style */}
      <div className="bg-white border-2 border-stone-900 p-6 max-w-sm mx-auto w-full shadow-sm font-sans">
        <h2 className="text-3xl font-black border-b-[10px] border-stone-900 pb-2 mb-2">Nutrition Facts</h2>
        <p className="text-sm font-bold border-b border-stone-900 pb-2 mb-2">Amount Per Serving</p>
        
        <div className="flex justify-between items-end border-b-[5px] border-stone-900 pb-2 mb-2">
          <span className="font-black text-4xl">Calories</span>
          <span className="font-black text-5xl">{data.calories}</span>
        </div>

        <div className="space-y-1 text-sm border-b border-stone-900 pb-4 mb-4">
          <NutrientRow label="Total Fat" value={data.fat} bold />
          <NutrientRow label="Sodium" value={data.sodium} bold />
          <NutrientRow label="Total Carbohydrate" value={data.carbs} bold />
          <div className="pl-6 space-y-1">
            <NutrientRow label="Dietary Fiber" value={data.fiber} />
            <NutrientRow label="Total Sugars" value={data.sugar} />
          </div>
          <NutrientRow label="Protein" value={data.protein} bold />
        </div>
        <p className="text-xs text-stone-500">
          * Estimated values based on AI analysis of ingredients.
        </p>
      </div>

      {/* Visual Chart */}
      <div className="bg-stone-50 rounded-xl p-6 flex flex-col items-center justify-center">
        <h3 className="font-serif font-bold text-xl text-stone-800 mb-6">Macronutrient Ratio</h3>
        <div className="w-full h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="flex gap-6 mt-4">
           {chartData.map((d) => (
             <div key={d.name} className="flex items-center gap-2">
               <div className="w-3 h-3 rounded-full" style={{ backgroundColor: d.color }}></div>
               <span className="text-sm font-medium text-stone-600">{d.name}</span>
             </div>
           ))}
        </div>
      </div>
    </div>
  );
}

const NutrientRow = ({ label, value, bold = false }: { label: string, value: string, bold?: boolean }) => (
  <div className={`flex justify-between border-b border-stone-200 py-1 ${bold ? 'font-bold' : ''}`}>
    <span>{label}</span>
    <span>{value}</span>
  </div>
);
