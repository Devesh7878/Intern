import React, { useState, useEffect } from 'react';
import { FileUpload } from './components/FileUpload';
import { PersonalInfoSection } from './components/PersonalInfoSection';
import { SummarySection } from './components/SummarySection';
import { ExperienceSection } from './components/ExperienceSection';
import { EducationSection } from './components/EducationSection';
import { SkillsSection } from './components/SkillsSection';
import { ActionBar } from './components/ActionBar';
import { Resume } from './types/Resume';
import { enhanceWithAI } from './utils/mockAI';
import {
  createEmptyResume,
  parseResumeFile,
  saveResumeToStorage,
  loadResumeFromStorage,
  downloadResumeAsJSON
} from './utils/resumeParser';

function App() {
  const [resume, setResume] = useState<Resume | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isEnhancing, setIsEnhancing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [showUpload, setShowUpload] = useState(false);

  useEffect(() => {
    // Load resume from localStorage on app start
    const storedResume = loadResumeFromStorage();
    if (storedResume) {
      setResume(storedResume);
    }
  }, []);

  const handleFileUpload = async (file: File) => {
    setIsUploading(true);
    try {
      const parsedResume = await parseResumeFile(file);
      setResume(parsedResume);
      setShowUpload(false);
      // Auto-save after parsing
      saveResumeToStorage(parsedResume);
    } catch (error) {
      console.error('Error parsing file:', error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleEnhance = async (section: string, content: string) => {
    if (!resume) return;
    
    setIsEnhancing(true);
    try {
      const enhanced = await enhanceWithAI(section, content);
      
      // Apply enhancement based on section
      const updatedResume = { ...resume };
      if (section === 'summary') {
        updatedResume.summary = enhanced;
      } else if (section === 'experience') {
        // For demo, enhance the description of the first experience
        if (updatedResume.experience.length > 0) {
          updatedResume.experience[0].description = enhanced;
        }
      }
      
      setResume(updatedResume);
      saveResumeToStorage(updatedResume);
    } catch (error) {
      console.error('Error enhancing content:', error);
    } finally {
      setIsEnhancing(false);
    }
  };

  const handleSave = () => {
    if (!resume) return;
    
    setIsSaving(true);
    setTimeout(() => {
      saveResumeToStorage(resume);
      setIsSaving(false);
    }, 1000);
  };

  const handleDownload = () => {
    if (resume) {
      downloadResumeAsJSON(resume);
    }
  };

  const handleReset = () => {
    setResume(null);
    localStorage.removeItem('resume-data');
    setShowUpload(true);
  };

  const handleUploadNew = () => {
    setShowUpload(true);
  };

  const handleStartFromScratch = () => {
    const emptyResume = createEmptyResume();
    setResume(emptyResume);
    setShowUpload(false);
  };

  if (isUploading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-lg text-gray-600">Parsing your resume...</p>
          <p className="text-sm text-gray-500">This may take a few moments</p>
        </div>
      </div>
    );
  }

  if (!resume || showUpload) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-12">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Professional Resume Editor
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Create, edit, and enhance your resume with AI assistance
            </p>
          </div>

          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
              <FileUpload onFileUpload={handleFileUpload} />
            </div>

            <div className="text-center">
              <p className="text-gray-500 mb-4">Or</p>
              <button
                onClick={handleStartFromScratch}
                className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200"
              >
                Start from Scratch
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <ActionBar
        onSave={handleSave}
        onDownload={handleDownload}
        onUpload={handleUploadNew}
        onReset={handleReset}
        hasData={!!resume}
        isSaving={isSaving}
      />

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <PersonalInfoSection
            personalInfo={resume.personalInfo}
            onUpdate={(personalInfo) => setResume({ ...resume, personalInfo })}
            onEnhance={handleEnhance}
            isEnhancing={isEnhancing}
          />

          <SummarySection
            summary={resume.summary}
            onUpdate={(summary) => setResume({ ...resume, summary })}
            onEnhance={handleEnhance}
            isEnhancing={isEnhancing}
          />

          <ExperienceSection
            experiences={resume.experience}
            onUpdate={(experience) => setResume({ ...resume, experience })}
            onEnhance={handleEnhance}
            isEnhancing={isEnhancing}
          />

          <EducationSection
            education={resume.education}
            onUpdate={(education) => setResume({ ...resume, education })}
            onEnhance={handleEnhance}
            isEnhancing={isEnhancing}
          />

          <SkillsSection
            skills={resume.skills}
            onUpdate={(skills) => setResume({ ...resume, skills })}
            onEnhance={handleEnhance}
            isEnhancing={isEnhancing}
          />

          <div className="mt-8 text-center text-sm text-gray-500">
            Last modified: {new Date(resume.lastModified).toLocaleString()}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;