
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Map,
  ChevronRight,
  School,
  GraduationCap,
  Building,
  FileText,
  Lightbulb
} from 'lucide-react';
import type { CareerPath } from '../types';
import { getCareerPathDetails } from '../services/careerPathService';

// Define detailed education requirements for each career path
const educationPathways = {
  "tech-software-dev": {
    highSchool: {
      subjects: ["Mathematics", "Computer Science", "Physics", "English"],
      activities: ["Coding clubs", "Hackathons", "Science Olympiads"],
      preparation: "Focus on mathematics (especially calculus and discrete math) and computer science fundamentals. Start learning programming languages like Python or JavaScript."
    },
    undergraduate: {
      recommended: ["B.Tech/B.E in Computer Science", "B.Sc in Software Engineering", "BCA (Bachelor of Computer Applications)"],
      entrance: ["JEE Main/Advanced for IITs and NITs", "BITSAT for BITS", "State-level engineering entrance exams"],
      alternativePath: "Consider specialized coding bootcamps or online certifications if university isn't your path."
    },
    postgraduate: {
      options: ["M.Tech/M.E in Computer Science", "MCA", "MBA in IT Management"],
      specializations: ["Artificial Intelligence", "Data Science", "Cybersecurity", "Web/Mobile Development"],
      entrance: ["GATE for M.Tech programs", "CAT/XAT/MAT for MBA programs"]
    },
    certifications: ["AWS Certified Developer", "Microsoft Certified: Azure Developer", "Google Cloud Professional Developer", "Oracle Certified Professional Java Programmer"]
  },
  "data-science": {
    highSchool: {
      subjects: ["Mathematics", "Statistics", "Computer Science", "Physics"],
      activities: ["Mathematics Olympiads", "Data analysis projects", "Coding competitions"],
      preparation: "Strong focus on mathematics, statistics and probability. Begin learning programming languages like Python or R."
    },
    undergraduate: {
      recommended: ["B.Tech/B.E in Computer Science", "B.Sc in Statistics/Mathematics", "B.Sc in Data Science"],
      entrance: ["JEE Main/Advanced for engineering", "CUET for central universities", "University-specific entrance tests"],
      alternativePath: "Online data science bootcamps and microdegrees can provide specialized skills."
    },
    postgraduate: {
      options: ["M.Tech in Data Science", "M.Sc in Data Analytics", "MBA with Business Analytics specialization"],
      specializations: ["Machine Learning", "Big Data Analytics", "Statistical Modeling", "Natural Language Processing"],
      entrance: ["GATE for M.Tech programs", "JAM for M.Sc programs", "CAT/XAT for MBA"]
    },
    certifications: ["IBM Data Science Professional", "Google Data Analytics Professional", "Microsoft Certified: Azure Data Scientist", "Tensorflow Developer Certificate"]
  },
  "ai-ml-engineer": {
    highSchool: {
      subjects: ["Mathematics (Advanced)", "Physics", "Computer Science", "Statistics"],
      activities: ["AI/Robotics clubs", "Mathematics competitions", "Coding projects"],
      preparation: "Strong emphasis on calculus, linear algebra, and probability. Begin learning Python and explore basic machine learning concepts."
    },
    undergraduate: {
      recommended: ["B.Tech/B.E in Computer Science/AI", "B.Sc in Mathematics with CS", "B.Tech in Data Science"],
      entrance: ["JEE Main/Advanced for top engineering colleges", "BITSAT", "University-specific AI program entrances"],
      alternativePath: "Self-study through platforms like Coursera, edX combined with open-source projects."
    },
    postgraduate: {
      options: ["M.Tech in AI/ML", "M.Sc in Artificial Intelligence", "MS in Computer Science with AI specialization"],
      specializations: ["Deep Learning", "Natural Language Processing", "Computer Vision", "Reinforcement Learning"],
      entrance: ["GATE for Indian institutions", "GRE for foreign universities", "University-specific AI program tests"]
    },
    certifications: ["TensorFlow Developer Certification", "AWS Machine Learning Specialty", "Microsoft Certified: Azure AI Engineer", "NVIDIA Deep Learning Institute Certification"]
  },
  "healthcare-medicine": {
    highSchool: {
      subjects: ["Biology", "Chemistry", "Physics", "Mathematics"],
      activities: ["Science clubs", "Hospital volunteering", "Health-related community service"],
      preparation: "Focus on biology and chemistry with strong fundamentals in physics and mathematics. Develop communication and empathy skills."
    },
    undergraduate: {
      recommended: ["MBBS", "BDS (Dentistry)", "BAMS (Ayurveda)", "BHMS (Homeopathy)"],
      entrance: ["NEET-UG for all medical programs", "AIIMS and JIPMER entrance exams"],
      alternativePath: "Consider allied health sciences or nursing if medical school isn't your path."
    },
    postgraduate: {
      options: ["MD/MS in various specialties", "DNB programs", "DM/MCh for super-specialties"],
      specializations: ["Medicine", "Surgery", "Pediatrics", "Gynecology", "Orthopedics", "Cardiology", "Neurology"],
      entrance: ["NEET-PG for MD/MS", "NEET-SS for super specialties", "University-specific entrance exams"]
    },
    certifications: ["Medical Council of India registration", "Specialty board certifications", "Advanced life support certifications"]
  },
  default: {
    highSchool: {
      subjects: ["English", "Mathematics", "Science", "Social Studies"],
      activities: ["Related clubs and extracurricular activities", "Volunteer work", "Skill-building projects"],
      preparation: "Focus on developing strong fundamentals in all subjects while exploring specific interests related to your career path."
    },
    undergraduate: {
      recommended: ["Bachelor's degree in relevant field"],
      entrance: ["Common entrance exams for your chosen field", "University-specific entrance tests"],
      alternativePath: "Consider vocational training, associate degrees, or certification programs as alternatives."
    },
    postgraduate: {
      options: ["Master's programs in specialized areas", "Professional certifications"],
      specializations: ["Various specializations depending on field"],
      entrance: ["Field-specific entrance examinations", "University requirements"]
    },
    certifications: ["Industry-standard certifications relevant to your field"]
  }
};

// Skillset development recommendations
const skillPathways = {
  "tech-software-dev": {
    technical: [
      "Programming Languages (Python, JavaScript, Java, C++)",
      "Web Development (HTML, CSS, JavaScript frameworks)",
      "Database Management (SQL, NoSQL)",
      "Version Control (Git, GitHub)",
      "Cloud Computing (AWS, Azure, GCP)"
    ],
    soft: [
      "Problem-solving and logical thinking",
      "Communication and teamwork",
      "Time management and organization",
      "Adaptability to new technologies",
      "Project management"
    ],
    resources: [
      "CodeAcademy, freeCodeCamp for interactive learning",
      "GitHub repositories with open-source projects",
      "Stack Overflow for community support",
      "Programming bootcamps and hackathons",
      "Industry conferences and meetups"
    ]
  },
  "data-science": {
    technical: [
      "Programming (Python, R)",
      "Statistical Analysis and Mathematics",
      "Machine Learning Algorithms",
      "Data Visualization (Tableau, PowerBI)",
      "Big Data Technologies (Hadoop, Spark)"
    ],
    soft: [
      "Analytical thinking",
      "Business acumen",
      "Data storytelling and communication",
      "Problem formulation",
      "Research methodology"
    ],
    resources: [
      "Kaggle for datasets and competitions",
      "DataCamp and Coursera for structured learning",
      "Research papers and academic journals",
      "Data science conferences",
      "Industry webinars and workshops"
    ]
  },
  "ai-ml-engineer": {
    technical: [
      "Advanced Mathematics (Linear Algebra, Calculus, Probability)",
      "Machine Learning Algorithms and Frameworks",
      "Neural Networks and Deep Learning",
      "Programming (Python, TensorFlow, PyTorch)",
      "Data Processing and Engineering"
    ],
    soft: [
      "Research mindset",
      "Critical thinking",
      "Creativity in problem-solving",
      "Technical communication",
      "Ethical AI considerations"
    ],
    resources: [
      "ArXiv for latest research papers",
      "Google AI, DeepMind, and OpenAI blogs",
      "Specialized AI/ML courses on Coursera/edX",
      "GitHub repositories of state-of-the-art models",
      "AI conferences (NeurIPS, ICML, ICLR)"
    ]
  },
  default: {
    technical: [
      "Core skills specific to your field",
      "Digital literacy and basic computing skills",
      "Data analysis fundamentals",
      "Project management tools",
      "Industry-specific software"
    ],
    soft: [
      "Communication and interpersonal skills",
      "Problem-solving and critical thinking",
      "Adaptability and lifelong learning",
      "Leadership and teamwork",
      "Time management and organization"
    ],
    resources: [
      "Online learning platforms (Coursera, LinkedIn Learning)",
      "Industry-specific associations and publications",
      "Professional networking events",
      "YouTube tutorials and educational channels",
      "Mentorship programs"
    ]
  }
};

export function Roadmap() {
  const [selectedCareerPath, setSelectedCareerPath] = useState<CareerPath | null>(null);
  const [careerPaths, setCareerPaths] = useState<CareerPath[]>([]);
  const [expandedSection, setExpandedSection] = useState<string | null>("skills");
  const [educationPath, setEducationPath] = useState(educationPathways.default);
  const [skillPath, setSkillPath] = useState(skillPathways.default);

  useEffect(() => {
    const fetchCareerPaths = async () => {
      try {
        // In a real app, this would fetch from an API or local storage
        // For now, we'll simulate getting a simple list
        const paths = [
          { id: "tech-software-dev", title: "Software Development", type: "modern" },
          { id: "data-science", title: "Data Science", type: "emerging" },
          { id: "healthcare-medicine", title: "Healthcare Administration", type: "traditional" },
          { id: "marketing-digital", title: "Digital Marketing", type: "modern" },
          { id: "financial-analysis", title: "Financial Analysis", type: "traditional" },
          { id: "ai-ml-engineer", title: "AI & Machine Learning", type: "emerging" },
          { id: "cybersecurity-analyst", title: "Cybersecurity", type: "emerging" },
          { id: "graphic-design", title: "Graphic Design", type: "modern" },
          { id: "content-creation", title: "Content Creation", type: "modern" },
          { id: "human-resources", title: "Human Resources", type: "traditional" },
          { id: "project-management", title: "Project Management", type: "traditional" },
          { id: "law", title: "Legal Practice", type: "traditional" },
          { id: "architecture", title: "Architecture", type: "traditional" },
          { id: "education", title: "Education", type: "traditional" },
        ] as CareerPath[];
        
        setCareerPaths(paths);
        
        // If there's a locally stored selected path, load it
        const storedPathId = localStorage.getItem('selectedCareerPathId');
        if (storedPathId) {
          const storedPath = paths.find(p => p.id === storedPathId);
          if (storedPath) {
            handlePathSelect(storedPath);
          }
        }
      } catch (error) {
        console.error("Error fetching career paths:", error);
      }
    };

    fetchCareerPaths();
  }, []);

  const handlePathSelect = async (path: CareerPath) => {
    try {
      // Fetch the detailed career path
      const detailedPath = await getCareerPathDetails(path.id);
      
      // Save the selected path ID to localStorage
      localStorage.setItem('selectedCareerPathId', path.id);
      
      // Set the selected career path
      setSelectedCareerPath(detailedPath);

      // Set education and skill pathways
      const eduPath = educationPathways[detailedPath.id as keyof typeof educationPathways] || educationPathways.default;
      setEducationPath(eduPath);
      
      const skillsPath = skillPathways[detailedPath.id as keyof typeof skillPathways] || skillPathways.default;
      setSkillPath(skillsPath);
    } catch (error) {
      console.error("Error fetching career path details:", error);
    }
  };

  const toggleSection = (section: string) => {
    if (expandedSection === section) {
      setExpandedSection(null);
    } else {
      setExpandedSection(section);
    }
  };

  const renderCareerPathSelector = () => (
    <div className="bg-white rounded-xl shadow-md p-6 mb-8">
      <h3 className="text-lg font-semibold mb-4">Select a Career Path to View Roadmap</h3>
      <div className="space-y-3">
        {careerPaths.map((path) => (
          <button
            key={path.id}
            onClick={() => handlePathSelect(path)}
            className={`w-full text-left px-4 py-3 rounded-lg flex justify-between items-center ${
              selectedCareerPath?.id === path.id
                ? 'bg-indigo-100 border border-indigo-300'
                : 'bg-gray-50 hover:bg-gray-100 border border-transparent'
            } transition-colors`}
          >
            <div className="flex items-center">
              <span className="font-medium">{path.title}</span>
              <span className="ml-2 text-xs px-2 py-1 rounded-full bg-gray-200 text-gray-700">
                {path.type}
              </span>
            </div>
            <ChevronRight className="h-4 w-4 text-gray-500" />
          </button>
        ))}
      </div>
    </div>
  );

  const renderEducationPathway = () => (
    <div className="bg-white rounded-xl shadow-md p-6 mb-8">
      <div 
        className="flex justify-between items-center cursor-pointer" 
        onClick={() => toggleSection('education')}
      >
        <div className="flex items-center">
          <School className="h-6 w-6 text-indigo-600 mr-3" />
          <h3 className="text-lg font-semibold">Education Pathway</h3>
        </div>
        <ChevronRight 
          className={`h-5 w-5 text-gray-500 transition-transform ${
            expandedSection === 'education' ? 'transform rotate-90' : ''
          }`} 
        />
      </div>
      
      {expandedSection === 'education' && (
        <div className="mt-5 space-y-6">
          <div className="border-l-2 border-indigo-200 pl-4 ml-3">
            <h4 className="font-semibold text-indigo-700 flex items-center">
              <GraduationCap className="h-4 w-4 mr-2" />
              High School Preparation
            </h4>
            <div className="mt-3 space-y-3">
              <div>
                <p className="font-medium text-gray-700">Recommended Subjects:</p>
                <p className="text-gray-600">{educationPath.highSchool.subjects.join(", ")}</p>
              </div>
              <div>
                <p className="font-medium text-gray-700">Extracurricular Activities:</p>
                <p className="text-gray-600">{educationPath.highSchool.activities.join(", ")}</p>
              </div>
              <div>
                <p className="font-medium text-gray-700">Preparation Strategy:</p>
                <p className="text-gray-600">{educationPath.highSchool.preparation}</p>
              </div>
            </div>
          </div>
          
          <div className="border-l-2 border-indigo-200 pl-4 ml-3">
            <h4 className="font-semibold text-indigo-700 flex items-center">
              <Building className="h-4 w-4 mr-2" />
              Undergraduate Education
            </h4>
            <div className="mt-3 space-y-3">
              <div>
                <p className="font-medium text-gray-700">Recommended Programs:</p>
                <ul className="list-disc list-inside text-gray-600">
                  {educationPath.undergraduate.recommended.map((program, index) => (
                    <li key={index}>{program}</li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="font-medium text-gray-700">Entrance Exams:</p>
                <ul className="list-disc list-inside text-gray-600">
                  {educationPath.undergraduate.entrance.map((exam, index) => (
                    <li key={index}>{exam}</li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="font-medium text-gray-700">Alternative Paths:</p>
                <p className="text-gray-600">{educationPath.undergraduate.alternativePath}</p>
              </div>
            </div>
          </div>
          
          <div className="border-l-2 border-indigo-200 pl-4 ml-3">
            <h4 className="font-semibold text-indigo-700 flex items-center">
              <FileText className="h-4 w-4 mr-2" />
              Postgraduate Options
            </h4>
            <div className="mt-3 space-y-3">
              <div>
                <p className="font-medium text-gray-700">Advanced Degree Options:</p>
                <ul className="list-disc list-inside text-gray-600">
                  {educationPath.postgraduate.options.map((option, index) => (
                    <li key={index}>{option}</li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="font-medium text-gray-700">Specializations:</p>
                <ul className="list-disc list-inside text-gray-600">
                  {educationPath.postgraduate.specializations.map((spec, index) => (
                    <li key={index}>{spec}</li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="font-medium text-gray-700">Entrance Requirements:</p>
                <ul className="list-disc list-inside text-gray-600">
                  {educationPath.postgraduate.entrance.map((req, index) => (
                    <li key={index}>{req}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          
          <div className="border-l-2 border-indigo-200 pl-4 ml-3">
            <h4 className="font-semibold text-indigo-700 flex items-center">
              <FileText className="h-4 w-4 mr-2" />
              Professional Certifications
            </h4>
            <div className="mt-3">
              <ul className="list-disc list-inside text-gray-600">
                {educationPath.certifications.map((cert, index) => (
                  <li key={index}>{cert}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
  
  const renderSkillDevelopment = () => (
    <div className="bg-white rounded-xl shadow-md p-6 mb-8">
      <div 
        className="flex justify-between items-center cursor-pointer" 
        onClick={() => toggleSection('skills')}
      >
        <div className="flex items-center">
          <Lightbulb className="h-6 w-6 text-indigo-600 mr-3" />
          <h3 className="text-lg font-semibold">Skill Development Roadmap</h3>
        </div>
        <ChevronRight 
          className={`h-5 w-5 text-gray-500 transition-transform ${
            expandedSection === 'skills' ? 'transform rotate-90' : ''
          }`} 
        />
      </div>
      
      {expandedSection === 'skills' && (
        <div className="mt-5 space-y-6">
          <div>
            <h4 className="font-semibold text-indigo-700 mb-2">Technical Skills</h4>
            <ul className="list-disc list-inside text-gray-600 space-y-1">
              {skillPath.technical.map((skill, index) => (
                <li key={index}>{skill}</li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-indigo-700 mb-2">Soft Skills</h4>
            <ul className="list-disc list-inside text-gray-600 space-y-1">
              {skillPath.soft.map((skill, index) => (
                <li key={index}>{skill}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center space-x-4 mb-6">
          <Map className="h-8 w-8 text-indigo-600" />
          <h1 className="text-3xl font-bold text-gray-900">Your Career Roadmap</h1>
        </div>

        {!selectedCareerPath && !(localStorage.getItem('isAssessmentComplete') === 'true') && (
          <div className="bg-amber-50 border border-amber-200 p-6 rounded-xl shadow-sm mb-8">
            <div className="flex items-start space-x-4">
              <div className="bg-amber-200 p-2 rounded-full">
                <Map className="h-6 w-6 text-amber-700" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-amber-800 mb-1">Complete Your Career DNA First</h3>
                <p className="text-amber-700">
                  For the most accurate and personalized roadmap recommendations, 
                  please complete your Career DNA assessment first.
                </p>
                <a 
                  href="/career-dna"
                  className="inline-flex items-center space-x-1 text-indigo-600 font-medium mt-3 hover:text-indigo-700"
                >
                  <span>Go to Career DNA Assessment</span>
                  <ChevronRight className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        )}

        {!selectedCareerPath ? (
          renderCareerPathSelector()
        ) : (
          <>
            <div className="bg-white rounded-xl shadow-md p-6 mb-8">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-semibold text-gray-900">
                  {selectedCareerPath.title} Roadmap
                </h2>
                <button 
                  onClick={() => setSelectedCareerPath(null)}
                  className="text-sm text-indigo-600 hover:text-indigo-800"
                >
                  Change Career Path
                </button>
              </div>
              <p className="text-gray-600 mb-4">{selectedCareerPath.description}</p>
            </div>

            {renderEducationPathway()}
            {renderSkillDevelopment()}
          </>
        )}
      </motion.div>
    </div>
  );
}
