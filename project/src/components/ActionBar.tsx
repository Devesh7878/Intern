import React from 'react';
import { Save, Download, Upload, RefreshCw } from 'lucide-react';

interface ActionBarProps {
  onSave: () => void;
  onDownload: () => void;
  onUpload: () => void;
  onReset: () => void;
  hasData: boolean;
  isSaving: boolean;
}

export const ActionBar: React.FC<ActionBarProps> = ({
  onSave,
  onDownload,
  onUpload,
  onReset,
  hasData,
  isSaving
}) => {
  return (
    <div className="sticky top-0 z-10 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-gray-900">Resume Editor</h1>
            <div className="ml-4 px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
              Professional
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <button
              onClick={onUpload}
              className="flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors duration-200"
            >
              <Upload className="w-4 h-4 mr-2" />
              Upload New
            </button>
            
            <button
              onClick={onSave}
              disabled={!hasData || isSaving}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Save className={`w-4 h-4 mr-2 ${isSaving ? 'animate-spin' : ''}`} />
              {isSaving ? 'Saving...' : 'Save Resume'}
            </button>
            
            <button
              onClick={onDownload}
              disabled={!hasData}
              className="flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Download className="w-4 h-4 mr-2" />
              Download JSON
            </button>
            
            <button
              onClick={onReset}
              disabled={!hasData}
              className="flex items-center px-4 py-2 bg-red-100 text-red-700 rounded-md hover:bg-red-200 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Reset
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};