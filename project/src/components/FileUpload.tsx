import React, { useCallback } from 'react';
import { Upload, FileText } from 'lucide-react';

interface FileUploadProps {
  onFileUpload: (file: File) => void;
}

export const FileUpload: React.FC<FileUploadProps> = ({ onFileUpload }) => {
  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];
      if (file.type === 'application/pdf' || file.name.endsWith('.docx')) {
        onFileUpload(file);
      }
    }
  }, [onFileUpload]);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      onFileUpload(files[0]);
    }
  }, [onFileUpload]);

  return (
    <div className="w-full max-w-md mx-auto">
      <div
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className="border-2 border-dashed border-blue-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors duration-200 bg-blue-50/50"
      >
        <Upload className="w-12 h-12 text-blue-500 mx-auto mb-4" />
        <p className="text-lg font-medium text-gray-700 mb-2">
          Upload Your Resume
        </p>
        <p className="text-sm text-gray-500 mb-4">
          Drag and drop your PDF or DOCX file here
        </p>
        <input
          type="file"
          accept=".pdf,.docx"
          onChange={handleFileSelect}
          className="hidden"
          id="resume-upload"
        />
        <label
          htmlFor="resume-upload"
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200 cursor-pointer"
        >
          <FileText className="w-4 h-4 mr-2" />
          Choose File
        </label>
      </div>
    </div>
  );
};