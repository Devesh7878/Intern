import React from 'react';
import { Target, Plus, Trash2, Sparkles } from 'lucide-react';
import { Skill } from '../types/Resume';

interface SkillsSectionProps {
  skills: Skill[];
  onUpdate: (skills: Skill[]) => void;
  onEnhance: (section: string, content: string) => void;
  isEnhancing: boolean;
}

const skillLevels: Skill['level'][] = ['Beginner', 'Intermediate', 'Advanced', 'Expert'];
const skillCategories = ['Technical', 'Programming', 'Design', 'Management', 'Communication', 'Other'];

export const SkillsSection: React.FC<SkillsSectionProps> = ({
  skills,
  onUpdate,
  onEnhance,
  isEnhancing
}) => {
  const addSkill = () => {
    const newSkill: Skill = {
      id: Date.now().toString(),
      name: '',
      level: 'Intermediate',
      category: 'Technical'
    };
    onUpdate([...skills, newSkill]);
  };

  const removeSkill = (id: string) => {
    onUpdate(skills.filter(skill => skill.id !== id));
  };

  const updateSkill = (id: string, field: keyof Skill, value: string) => {
    onUpdate(skills.map(skill => 
      skill.id === id ? { ...skill, [field]: value } : skill
    ));
  };

  const handleEnhance = () => {
    const content = skills.map(skill => `${skill.name} (${skill.level})`).join(', ');
    onEnhance('skills', content);
  };

  const getLevelColor = (level: Skill['level']) => {
    switch (level) {
      case 'Beginner': return 'bg-red-100 text-red-800';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'Advanced': return 'bg-blue-100 text-blue-800';
      case 'Expert': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const groupedSkills = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, Skill[]>);

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-800 flex items-center">
          <Target className="w-5 h-5 mr-2 text-orange-600" />
          Skills
        </h2>
        <div className="flex gap-2">
          <button
            onClick={handleEnhance}
            disabled={isEnhancing || skills.length === 0}
            className="flex items-center px-3 py-1.5 bg-purple-100 text-purple-700 rounded-md hover:bg-purple-200 transition-colors duration-200 disabled:opacity-50"
          >
            <Sparkles className={`w-4 h-4 mr-1 ${isEnhancing ? 'animate-spin' : ''}`} />
            {isEnhancing ? 'Enhancing...' : 'Enhance with AI'}
          </button>
          <button
            onClick={addSkill}
            className="flex items-center px-3 py-1.5 bg-orange-100 text-orange-700 rounded-md hover:bg-orange-200 transition-colors duration-200"
          >
            <Plus className="w-4 h-4 mr-1" />
            Add Skill
          </button>
        </div>
      </div>

      {skills.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <Target className="w-12 h-12 mx-auto mb-2 text-gray-300" />
          <p>No skills added yet</p>
          <p className="text-sm">Click "Add Skill" to get started</p>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Add new skills form */}
          {skills.some(skill => !skill.name.trim()) && (
            <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
              <h3 className="text-sm font-medium text-gray-700 mb-3">New Skills</h3>
              <div className="space-y-3">
                {skills.filter(skill => !skill.name.trim()).map((skill) => (
                  <div key={skill.id} className="grid grid-cols-1 md:grid-cols-4 gap-3 items-center">
                    <input
                      type="text"
                      value={skill.name}
                      onChange={(e) => updateSkill(skill.id, 'name', e.target.value)}
                      className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      placeholder="Skill name"
                    />
                    <select
                      value={skill.category}
                      onChange={(e) => updateSkill(skill.id, 'category', e.target.value)}
                      className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    >
                      {skillCategories.map(category => (
                        <option key={category} value={category}>{category}</option>
                      ))}
                    </select>
                    <select
                      value={skill.level}
                      onChange={(e) => updateSkill(skill.id, 'level', e.target.value as Skill['level'])}
                      className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    >
                      {skillLevels.map(level => (
                        <option key={level} value={level}>{level}</option>
                      ))}
                    </select>
                    <button
                      onClick={() => removeSkill(skill.id)}
                      className="flex items-center justify-center px-3 py-2 bg-red-100 text-red-700 rounded-md hover:bg-red-200 transition-colors duration-200"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Display existing skills grouped by category */}
          {Object.entries(groupedSkills).map(([category, categorySkills]) => {
            const validSkills = categorySkills.filter(skill => skill.name.trim());
            if (validSkills.length === 0) return null;

            return (
              <div key={category} className="border border-gray-200 rounded-lg p-4">
                <h3 className="text-lg font-medium text-gray-800 mb-3">{category}</h3>
                <div className="flex flex-wrap gap-2">
                  {validSkills.map((skill) => (
                    <div key={skill.id} className="group relative">
                      <div className="flex items-center gap-2 bg-gray-100 rounded-full px-3 py-2">
                        <span className="text-sm font-medium text-gray-800">{skill.name}</span>
                        <span className={`text-xs px-2 py-1 rounded-full ${getLevelColor(skill.level)}`}>
                          {skill.level}
                        </span>
                        <button
                          onClick={() => removeSkill(skill.id)}
                          className="opacity-0 group-hover:opacity-100 text-red-500 hover:text-red-700 transition-all duration-200"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};