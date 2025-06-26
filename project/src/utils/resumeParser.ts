import { Resume, PersonalInfo, Experience, Education, Skill } from '../types/Resume';

export const createEmptyResume = (): Resume => ({
  personalInfo: {
    fullName: '',
    email: '',
    phone: '',
    location: '',
    linkedin: '',
    website: ''
  },
  summary: '',
  experience: [],
  education: [],
  skills: [],
  lastModified: new Date().toISOString()
});

export const createSampleResume = (): Resume => ({
  personalInfo: {
    fullName: 'John Doe',
    email: 'john.doe@email.com',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    linkedin: 'https://linkedin.com/in/johndoe',
    website: 'https://johndoe.com'
  },
  summary: 'Experienced software developer with 5+ years of expertise in full-stack web development. Passionate about creating innovative solutions and leading cross-functional teams to deliver high-quality products.',
  experience: [
    {
      id: '1',
      company: 'Tech Solutions Inc.',
      position: 'Senior Software Developer',
      startDate: '2022-01',
      endDate: '',
      current: true,
      description: 'Lead development of web applications using React, Node.js, and PostgreSQL. Collaborate with product managers and designers to deliver user-centric solutions.',
      achievements: [
        'Increased application performance by 40% through optimization',
        'Led a team of 5 developers on key product features',
        'Implemented CI/CD pipeline reducing deployment time by 60%'
      ]
    },
    {
      id: '2',
      company: 'StartupXYZ',
      position: 'Full Stack Developer',
      startDate: '2019-06',
      endDate: '2021-12',
      current: false,
      description: 'Developed and maintained multiple web applications using modern JavaScript frameworks. Worked closely with startup founders to build MVP products.',
      achievements: [
        'Built 3 successful web applications from scratch',
        'Reduced page load times by 50% through performance optimization',
        'Mentored 2 junior developers'
      ]
    }
  ],
  education: [
    {
      id: '1',
      institution: 'University of California',
      degree: "Bachelor's Degree",
      field: 'Computer Science',
      startDate: '2015-09',
      endDate: '2019-05',
      gpa: '3.8/4.0',
      honors: 'Magna Cum Laude'
    }
  ],
  skills: [
    { id: '1', name: 'JavaScript', level: 'Expert', category: 'Programming' },
    { id: '2', name: 'React', level: 'Expert', category: 'Programming' },
    { id: '3', name: 'Node.js', level: 'Advanced', category: 'Programming' },
    { id: '4', name: 'PostgreSQL', level: 'Advanced', category: 'Technical' },
    { id: '5', name: 'Team Leadership', level: 'Advanced', category: 'Management' },
    { id: '6', name: 'Project Management', level: 'Intermediate', category: 'Management' }
  ],
  lastModified: new Date().toISOString()
});

export const parseResumeFile = (file: File): Promise<Resume> => {
  return new Promise((resolve) => {
    // Mock file parsing - in a real app, you'd use libraries like pdf-parse or mammoth
    setTimeout(() => {
      console.log(`Parsing ${file.name} (${file.type})`);
      
      // Return sample data as if parsed from the file
      const parsedResume = createSampleResume();
      parsedResume.personalInfo.fullName = `Parsed from ${file.name.split('.')[0]}`;
      
      resolve(parsedResume);
    }, 2000); // Simulate parsing delay
  });
};

export const saveResumeToStorage = (resume: Resume): void => {
  const updatedResume = { ...resume, lastModified: new Date().toISOString() };
  localStorage.setItem('resume-data', JSON.stringify(updatedResume));
};

export const loadResumeFromStorage = (): Resume | null => {
  const stored = localStorage.getItem('resume-data');
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch (error) {
      console.error('Error parsing stored resume:', error);
    }
  }
  return null;
};

export const downloadResumeAsJSON = (resume: Resume): void => {
  const dataStr = JSON.stringify(resume, null, 2);
  const dataBlob = new Blob([dataStr], { type: 'application/json' });
  
  const url = URL.createObjectURL(dataBlob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `resume-${resume.personalInfo.fullName.replace(/\s+/g, '-').toLowerCase()}-${new Date().toISOString().split('T')[0]}.json`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};