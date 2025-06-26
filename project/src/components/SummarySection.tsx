import React from 'react';
import { FileText, Sparkles } from 'lucide-react';

interface SummarySectionProps {
  summary: string;
  onUpdate: (summary: string) => void;
  onEnhance: (section: string, content: string) => void;
  isEnhancing: boolean;
}

export const SummarySection: React.FC<SummarySectionProps> = ({
  summary,
  onUpdate,
  onEnhance,
  isEnhancing
}) => {
  const handleEnhance = () => {
    onEnhance('summary', summary);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-800 flex items-center">
          <FileText className="w-5 h-5 mr-2 text-green-600" />
          Professional Summary
        </h2>
        <button
          onClick={handleEnhance}
          disabled={isEnhancing || !summary.trim()}
          className="flex items-center px-3 py-1.5 bg-purple-100 text-purple-700 rounded-md hover:bg-purple-200 transition-colors duration-200 disabled:opacity-50"
        >
          <Sparkles className={`w-4 h-4 mr-1 ${isEnhancing ? 'animate-spin' : ''}`} />
          {isEnhancing ? 'Enhancing...' : 'Enhance with AI'}
        </button>
      </div>
      
      <textarea
        value={summary}
        onChange={(e) => onUpdate(e.target.value)}
        rows={4}
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
        placeholder="Write a compelling professional summary that highlights your key strengths, experience, and career objectives..."
      />
      
      <div className="mt-2 text-sm text-gray-500">
        {summary.length}/500 characters
      </div>
    </div>
  );
};