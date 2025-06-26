const aiEnhancements = {
  summary: [
    "Results-driven professional with extensive experience in leading cross-functional teams and delivering innovative solutions that drive business growth and operational excellence.",
    "Dynamic and accomplished professional with a proven track record of transforming complex challenges into strategic opportunities while consistently exceeding performance expectations.",
    "Strategic-minded professional combining technical expertise with exceptional leadership skills to deliver measurable results and foster collaborative team environments."
  ],
  experience: [
    "Spearheaded the development and implementation of cutting-edge solutions, resulting in a 35% increase in operational efficiency and significant cost reduction.",
    "Led cross-functional teams of 10+ members to successfully deliver critical projects ahead of schedule while maintaining the highest quality standards.",
    "Orchestrated strategic initiatives that transformed business processes, leading to enhanced productivity and improved stakeholder satisfaction."
  ],
  education: [
    "Graduated with honors, demonstrating exceptional academic performance and leadership capabilities through active participation in student organizations and research projects.",
    "Completed rigorous coursework with distinction while contributing to groundbreaking research initiatives that advanced the field of study.",
    "Achieved academic excellence while developing strong analytical and problem-solving skills through comprehensive theoretical and practical learning experiences."
  ],
  skills: [
    "Advanced proficiency with extensive hands-on experience in implementing complex solutions and mentoring team members.",
    "Expert-level capabilities demonstrated through successful project delivery and continuous professional development.",
    "Highly skilled with proven ability to adapt to emerging technologies and industry best practices."
  ]
};

export const enhanceWithAI = (section: string, content: string): Promise<string> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const enhancements = aiEnhancements[section as keyof typeof aiEnhancements] || [
        "Enhanced version with improved clarity, impact, and professional language that better showcases your achievements and capabilities."
      ];
      const randomEnhancement = enhancements[Math.floor(Math.random() * enhancements.length)];
      resolve(randomEnhancement);
    }, 1500); // Simulate API delay
  });
};