import React from 'react';
import { Briefcase, Plus, Trash2, Sparkles, Calendar } from 'lucide-react';
import { Experience } from '../types/Resume';

interface ExperienceSectionProps {
  experiences: Experience[];
  onUpdate: (experiences: Experience[]) => void;
  onEnhance: (section: string, content: string) => void;
  isEnhancing: boolean;
}

export const ExperienceSection: React.FC<ExperienceSectionProps> = ({
  experiences,
  onUpdate,
  onEnhance,
  isEnhancing
}) => {
  const addExperience = () => {
    const newExperience: Experience = {
      id: Date.now().toString(),
      company: '',
      position: '',
      startDate: '',
      endDate: '',
      current: false,
      description: '',
      achievements: ['']
    };
    onUpdate([...experiences, newExperience]);
  };

  const removeExperience = (id: string) => {
    onUpdate(experiences.filter(exp => exp.id !== id));
  };

  const updateExperience = (id: string, field: keyof Experience, value: any) => {
    onUpdate(experiences.map(exp => 
      exp.id === id ? { ...exp, [field]: value } : exp
    ));
  };

  const addAchievement = (expId: string) => {
    const experience = experiences.find(exp => exp.id === expId);
    if (experience) {
      updateExperience(expId, 'achievements', [...experience.achievements, '']);
    }
  };

  const removeAchievement = (expId: string, index: number) => {
    const experience = experiences.find(exp => exp.id === expId);
    if (experience) {
      const newAchievements = experience.achievements.filter((_, i) => i !== index);
      updateExperience(expId, 'achievements', newAchievements);
    }
  };

  const updateAchievement = (expId: string, index: number, value: string) => {
    const experience = experiences.find(exp => exp.id === expId);
    if (experience) {
      const newAchievements = [...experience.achievements];
      newAchievements[index] = value;
      updateExperience(expId, 'achievements', newAchievements);
    }
  };

  const handleEnhance = (experience: Experience) => {
    const content = `${experience.position} at ${experience.company}: ${experience.description}`;
    onEnhance('experience', content);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-800 flex items-center">
          <Briefcase className="w-5 h-5 mr-2 text-blue-600" />
          Work Experience
        </h2>
        <button
          onClick={addExperience}
          className="flex items-center px-3 py-1.5 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 transition-colors duration-200"
        >
          <Plus className="w-4 h-4 mr-1" />
          Add Experience
        </button>
      </div>

      {experiences.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <Briefcase className="w-12 h-12 mx-auto mb-2 text-gray-300" />
          <p>No work experience added yet</p>
          <p className="text-sm">Click "Add Experience" to get started</p>
        </div>
      ) : (
        <div className="space-y-6">
          {experiences.map((experience, index) => (
            <div key={experience.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-medium text-gray-500">
                  Experience #{index + 1}
                </span>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEnhance(experience)}
                    disabled={isEnhancing || !experience.description.trim()}
                    className="flex items-center px-2 py-1 bg-purple-100 text-purple-700 rounded text-sm hover:bg-purple-200 transition-colors duration-200 disabled:opacity-50"
                  >
                    <Sparkles className={`w-3 h-3 mr-1 ${isEnhancing ? 'animate-spin' : ''}`} />
                    AI Enhance
                  </button>
                  <button
                    onClick={() => removeExperience(experience.id)}
                    className="flex items-center px-2 py-1 bg-red-100 text-red-700 rounded text-sm hover:bg-red-200 transition-colors duration-200"
                  >
                    <Trash2 className="w-3 h-3 mr-1" />
                    Remove
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Company
                  </label>
                  <input
                    type="text"
                    value={experience.company}
                    onChange={(e) => updateExperience(experience.id, 'company', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Company Name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Position
                  </label>
                  <input
                    type="text"
                    value={experience.position}
                    onChange={(e) => updateExperience(experience.id, 'position', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Job Title"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <Calendar className="w-4 h-4 inline mr-1" />
                    Start Date
                  </label>
                  <input
                    type="month"
                    value={experience.startDate}
                    onChange={(e) => updateExperience(experience.id, 'startDate', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    End Date
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="month"
                      value={experience.endDate}
                      onChange={(e) => updateExperience(experience.id, 'endDate', e.target.value)}
                      disabled={experience.current}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
                    />
                    <label className="flex items-center text-sm">
                      <input
                        type="checkbox"
                        checked={experience.current}
                        onChange={(e) => {
                          updateExperience(experience.id, 'current', e.target.checked);
                          if (e.target.checked) {
                            updateExperience(experience.id, 'endDate', '');
                          }
                        }}
                        className="mr-1"
                      />
                      Current
                    </label>
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Job Description
                </label>
                <textarea
                  value={experience.description}
                  onChange={(e) => updateExperience(experience.id, 'description', e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  placeholder="Describe your role and responsibilities..."
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Key Achievements
                  </label>
                  <button
                    onClick={() => addAchievement(experience.id)}
                    className="text-sm text-blue-600 hover:text-blue-700"
                  >
                    + Add Achievement
                  </button>
                </div>
                {experience.achievements.map((achievement, achIndex) => (
                  <div key={achIndex} className="flex items-center gap-2 mb-2">
                    <span className="text-gray-400">•</span>
                    <input
                      type="text"
                      value={achievement}
                      onChange={(e) => updateAchievement(experience.id, achIndex, e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Describe a key achievement..."
                    />
                    {experience.achievements.length > 1 && (
                      <button
                        onClick={() => removeAchievement(experience.id, achIndex)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};