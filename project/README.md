# Professional Resume Editor

A modern, feature-rich resume editor built with React, TypeScript, and Tailwind CSS. This application allows users to create, edit, and enhance their resumes with AI assistance.

## Features

- **Resume Upload**: Support for PDF and DOCX file uploads with mock parsing
- **Comprehensive Editing**: Edit all resume sections including personal info, summary, experience, education, and skills
- **AI Enhancement**: Mock AI-powered content enhancement for each section
- **Real-time Saving**: Automatic saving to local storage
- **Export Functionality**: Download resume as JSON file
- **Responsive Design**: Optimized for desktop and tablet devices
- **Modern UI**: Clean, professional interface with smooth animations

## Tech Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Build Tool**: Vite
- **Deployment**: Render (Static Site)

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd resume-editor
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Deployment

This application is configured for deployment on Render as a static site. The `render.yaml` file contains the deployment configuration.

### Deploy to Render

1. Connect your GitHub repository to Render
2. Create a new Static Site service
3. Render will automatically detect the configuration and deploy

## Project Structure

```
src/
├── components/          # React components
│   ├── ActionBar.tsx
│   ├── EducationSection.tsx
│   ├── ExperienceSection.tsx
│   ├── FileUpload.tsx
│   ├── PersonalInfoSection.tsx
│   ├── SkillsSection.tsx
│   └── SummarySection.tsx
├── types/              # TypeScript type definitions
│   └── Resume.ts
├── utils/              # Utility functions
│   ├── mockAI.ts
│   └── resumeParser.ts
├── App.tsx             # Main application component
├── main.tsx           # Application entry point
└── index.css          # Global styles
```

## Features Overview

### Resume Upload
- Drag and drop interface for file uploads
- Support for PDF and DOCX files
- Mock parsing with realistic loading states

### Section Editing
- **Personal Information**: Name, contact details, social links
- **Professional Summary**: AI-enhanced summary section
- **Work Experience**: Multiple positions with achievements
- **Education**: Academic background with honors
- **Skills**: Categorized skills with proficiency levels

### AI Enhancement
- Mock AI service with realistic response times
- Section-specific enhancement suggestions
- Professional language improvements

### Data Management
- Automatic saving to localStorage
- Resume state persistence across sessions
- JSON export functionality

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.