
import { useStore } from '../store/useStore';
import type { CareerPath } from '../types';
import { generateCareerPathsWithAI } from '../utils/openaiUtils';

export const generateCareerPathSuggestions = async (): Promise<CareerPath[]> => {
  const { openAIKey } = useStore.getState();
  
  // If we have an OpenAI key and the user has completed the assessment, use AI to generate paths
  if (openAIKey && useStore.getState().isAssessmentComplete) {
    try {
      return await generateCareerPathsWithAI();
    } catch (error) {
      console.error("Error generating AI career paths:", error);
      // Fall back to mock paths on API error
    }
  }
  
  // Return mock paths if no API key or assessment not complete
  return getMockCareerPaths();
};

export const getCareerPathDetails = async (pathId: string): Promise<CareerPath> => {
  // In a real app, you would fetch the detailed path from an API
  // For now, we'll simulate a server request
  return new Promise((resolve) => {
    setTimeout(() => {
      const allPaths = getDetailedMockCareerPaths();
      const path = allPaths.find(p => p.id === pathId);
      resolve(path || allPaths[0]);
    }, 800); // Simulate network delay
  });
};

// Mock career paths
const getMockCareerPaths = (): CareerPath[] => {
  return [
    {
      id: "tech-software-dev",
      title: "Software Development",
      description: "Design, develop, and maintain software applications across various platforms and industries.",
      type: "modern",
      skills: ["Programming", "Problem-Solving", "Software Design", "Testing"],
      outlook: "Excellent growth prospects with continual demand across all industries",
      salary: {
        entry: 70000,
        mid: 110000,
        senior: 160000
      }
    },
    {
      id: "healthcare-medicine",
      title: "Medicine & Healthcare",
      description: "Diagnose, treat, and help prevent diseases and injuries in individual patients and communities.",
      type: "traditional",
      skills: ["Scientific Knowledge", "Patient Care", "Critical Thinking", "Communication"],
      outlook: "Stable demand with growth in specialized fields and telemedicine",
      salary: {
        entry: 80000,
        mid: 150000,
        senior: 300000
      }
    },
    {
      id: "creative-design",
      title: "Digital Design & UX",
      description: "Create engaging digital experiences through visual communication and user interface design.",
      type: "modern",
      skills: ["Visual Design", "User Research", "Prototyping", "Design Systems"],
      outlook: "Growing demand as digital experiences become increasingly important",
      salary: {
        entry: 55000,
        mid: 90000,
        senior: 130000
      }
    },
    {
      id: "data-science",
      title: "Data Science & Analytics",
      description: "Extract insights from complex data to drive business decisions and develop AI solutions.",
      type: "emerging",
      skills: ["Statistics", "Machine Learning", "Data Visualization", "Programming"],
      outlook: "Rapidly growing field with demand across all sectors",
      salary: {
        entry: 75000,
        mid: 115000,
        senior: 170000
      }
    },
    {
      id: "business-finance",
      title: "Financial Analysis",
      description: "Analyze financial data and market trends to guide investment decisions and business strategy.",
      type: "traditional",
      skills: ["Financial Modeling", "Market Analysis", "Risk Assessment", "Communication"],
      outlook: "Stable demand with increasing need for tech-savvy analysts",
      salary: {
        entry: 65000,
        mid: 100000,
        senior: 150000
      }
    },
    {
      id: "education-teaching",
      title: "Education & Teaching",
      description: "Facilitate learning and intellectual development in various subjects and educational settings.",
      type: "traditional",
      skills: ["Subject Expertise", "Curriculum Development", "Communication", "Assessment"],
      outlook: "Stable with growing demand for specialized educators and digital learning",
      salary: {
        entry: 45000,
        mid: 65000,
        senior: 95000
      }
    },
    {
      id: "engineering-civil",
      title: "Civil Engineering",
      description: "Design, develop, and oversee construction projects including buildings, roads, bridges, and water systems.",
      type: "traditional",
      skills: ["Structural Analysis", "Project Management", "CAD Software", "Problem-Solving"],
      outlook: "Steady growth with infrastructure development and sustainability focus",
      salary: {
        entry: 60000,
        mid: 95000,
        senior: 140000
      }
    },
    {
      id: "law-legal",
      title: "Legal Practice",
      description: "Provide legal advice and representation to individuals, businesses, and organizations.",
      type: "traditional",
      skills: ["Legal Research", "Critical Thinking", "Negotiation", "Written Communication"],
      outlook: "Stable demand with growth in specialized areas like technology law",
      salary: {
        entry: 70000,
        mid: 130000,
        senior: 250000
      }
    },
    {
      id: "marketing-digital",
      title: "Digital Marketing",
      description: "Plan and execute marketing campaigns across digital platforms to drive business growth.",
      type: "modern",
      skills: ["Content Strategy", "Analytics", "Social Media", "SEO/SEM"],
      outlook: "Strong growth as businesses continue digital transformation",
      salary: {
        entry: 50000,
        mid: 85000,
        senior: 130000
      }
    },
    {
      id: "ai-ml-engineer",
      title: "AI & Machine Learning",
      description: "Develop intelligent systems and algorithms that can learn from and make decisions based on data.",
      type: "emerging",
      skills: ["Deep Learning", "Neural Networks", "Python", "Mathematics"],
      outlook: "Exponential growth as AI transforms industries",
      salary: {
        entry: 90000,
        mid: 140000,
        senior: 200000
      }
    },
    {
      id: "cybersecurity-analyst",
      title: "Cybersecurity",
      description: "Protect systems, networks, and data from cyber threats and security breaches.",
      type: "emerging",
      skills: ["Network Security", "Risk Assessment", "Incident Response", "Ethical Hacking"],
      outlook: "Critical growth field with persistent demand across all sectors",
      salary: {
        entry: 75000,
        mid: 120000,
        senior: 175000
      }
    },
    {
      id: "biotech-researcher",
      title: "Biotechnology Research",
      description: "Apply biological processes and organisms to develop new products and technologies.",
      type: "emerging",
      skills: ["Molecular Biology", "Genetic Engineering", "Lab Techniques", "Data Analysis"],
      outlook: "Revolutionary field with breakthrough potential in medicine and agriculture",
      salary: {
        entry: 65000,
        mid: 110000,
        senior: 160000
      }
    }
  ];
};

// Detailed mock career paths with journey information
const getDetailedMockCareerPaths = (): CareerPath[] => {
  const basicPaths = getMockCareerPaths();
  
  const detailedPaths = basicPaths.map(path => {
    // Add journey information based on path ID
    switch(path.id) {
      case "tech-software-dev":
        return {
          ...path,
          journey: [
            {
              title: "Education & Foundational Skills",
              description: "Complete a bachelor's degree in Computer Science or related field. Build foundational programming skills and develop personal projects.",
            },
            {
              title: "Junior Developer",
              description: "Work on assigned tasks within a development team. Focus on code quality and learning industry standards.",
            },
            {
              title: "Mid-Level Developer",
              description: "Take ownership of features and modules. Mentor junior developers and contribute to architectural decisions.",
            },
            {
              title: "Senior Developer/Tech Lead",
              description: "Lead development teams, architect solutions, and make high-level technical decisions.",
            }
          ],
          marketTrends: {
            overview: "Software development remains one of the most in-demand career paths with robust growth projected for decades. The field continues to evolve with new technologies, languages, and frameworks.",
            growthRate: 85,
            stability: 90,
            emergingOpportunities: [
              "Artificial Intelligence and Machine Learning integration",
              "AR/VR application development",
              "Edge computing and IoT",
              "Cybersecurity specialization"
            ]
          },
          notableProfessionals: [
            {
              name: "Sundar Pichai",
              achievement: "CEO of Google and Alphabet",
              description: "Indian-American business executive who led the development of Google Chrome and now leads one of the world's most influential tech companies."
            },
            {
              name: "Margaret Hamilton",
              achievement: "Director of Software Engineering for Apollo Program",
              description: "Computer scientist whose work at NASA was critical for successful Apollo moon landings and pioneered software engineering as a discipline."
            }
          ]
        };
        
      case "data-science":
        return {
          ...path,
          journey: [
            {
              title: "Education & Foundation",
              description: "Degree in Statistics, Math, Computer Science or related field. Develop core skills in statistics, programming, and data manipulation.",
            },
            {
              title: "Data Analyst",
              description: "Apply statistical techniques to analyze data and create visualizations and reports for business insights.",
            },
            {
              title: "Data Scientist",
              description: "Develop sophisticated analysis techniques, predictive models, and machine learning algorithms.",
            },
            {
              title: "Lead Data Scientist/AI Specialist",
              description: "Direct data strategy, lead ML/AI initiatives, and integrate data science into core business operations.",
            }
          ],
          marketTrends: {
            overview: "Data Science continues to be one of the fastest-growing fields across all industries, with particular expansion in healthcare, finance, retail, and manufacturing.",
            growthRate: 95,
            stability: 85,
            emergingOpportunities: [
              "Automated machine learning (AutoML)",
              "Real-time analytics and stream processing",
              "Domain-specific AI applications",
              "Ethical AI and model governance"
            ]
          },
          notableProfessionals: [
            {
              name: "Andrew Ng",
              achievement: "Co-founder of Coursera and deeplearning.ai",
              description: "Computer scientist and entrepreneur who pioneered machine learning research and revolutionized online education with a focus on AI."
            },
            {
              name: "Fei-Fei Li",
              achievement: "Co-Director of Stanford's Human-Centered AI Institute",
              description: "Computer vision expert who created ImageNet and champions AI ethics, education, and human-centered artificial intelligence development."
            }
          ]
        };
      
      case "healthcare-medicine":
        return {
          ...path,
          journey: [
            {
              title: "Pre-Medical Education",
              description: "Undergraduate degree with pre-med requirements. Focus on biology, chemistry, physics, and mathematics.",
            },
            {
              title: "Medical School",
              description: "Intensive education in medical sciences and clinical practice. Complete rotations in various specialties.",
            },
            {
              title: "Residency",
              description: "Supervised specialty training in hospitals or clinics. Progressively take on more responsibility for patient care.",
            },
            {
              title: "Fellowship (Optional)",
              description: "Additional specialized training for sub-specialties.",
            },
            {
              title: "Established Practice",
              description: "Full medical practice with continuing education and potential leadership roles.",
            }
          ],
          marketTrends: {
            overview: "Healthcare remains essential with growing demand due to aging populations and advances in medical technology. Telemedicine and specialized care are expanding rapidly.",
            growthRate: 70,
            stability: 95,
            emergingOpportunities: [
              "Precision medicine and genomics",
              "Telemedicine and remote patient monitoring",
              "Medical technology integration",
              "Preventive healthcare and wellness"
            ]
          },
          notableProfessionals: [
            {
              name: "Dr. Devi Shetty",
              achievement: "Founder of Narayana Health",
              description: "Indian cardiac surgeon who revolutionized healthcare delivery through innovative cost reduction techniques, making heart surgery affordable for millions."
            },
            {
              name: "Dr. Soumya Swaminathan",
              achievement: "Former Chief Scientist at WHO",
              description: "Indian pediatrician and clinical researcher who led global scientific response to major health challenges including the COVID-19 pandemic."
            }
          ]
        };

      case "ai-ml-engineer":
        return {
          ...path,
          journey: [
            {
              title: "Educational Foundation",
              description: "Bachelor's or Master's degree in Computer Science, AI, Mathematics or related fields with focus on machine learning and AI fundamentals.",
            },
            {
              title: "Junior AI Engineer",
              description: "Work on implementing and optimizing existing AI models. Develop skills in data preprocessing and model evaluation.",
            },
            {
              title: "Mid-Level AI Specialist",
              description: "Design and develop custom AI solutions for complex problems. Lead small teams on specialized AI projects.",
            },
            {
              title: "Senior AI Architect",
              description: "Define AI strategy and architecture. Research and implement cutting-edge AI methodologies for organization-wide solutions.",
            }
          ],
          marketTrends: {
            overview: "AI and Machine Learning are transforming every industry, with extremely high demand for skilled professionals who can develop and implement AI solutions.",
            growthRate: 98,
            stability: 90,
            emergingOpportunities: [
              "Generative AI applications",
              "AI ethics and responsible AI",
              "Edge AI deployment",
              "Multimodal AI systems",
              "AI-human collaboration frameworks"
            ]
          },
          notableProfessionals: [
            {
              name: "Geoffrey Hinton",
              achievement: "Godfather of Deep Learning",
              description: "Cognitive psychologist and computer scientist whose pioneering work on neural networks and deep learning revolutionized artificial intelligence."
            },
            {
              name: "Demis Hassabis",
              achievement: "CEO and co-founder of DeepMind",
              description: "British AI researcher who led the development of AlphaGo and is advancing AI capabilities through groundbreaking research and applications."
            }
          ]
        };

      case "cybersecurity-analyst":
        return {
          ...path,
          journey: [
            {
              title: "Foundation & Education",
              description: "Degree in Computer Science, Cybersecurity or related field. Obtain basic security certifications like CompTIA Security+ or CEH.",
            },
            {
              title: "Security Analyst",
              description: "Monitor security systems, identify vulnerabilities, and respond to security incidents. Implement security controls.",
            },
            {
              title: "Security Specialist",
              description: "Develop and implement comprehensive security strategies. Lead security assessments and incident response.",
            },
            {
              title: "CISO/Security Director",
              description: "Define organizational security vision, policy, and architecture. Manage security teams and communicate with executive leadership.",
            }
          ],
          marketTrends: {
            overview: "Cybersecurity continues to be one of the most critical and fastest-growing fields as digital threats evolve and organizations prioritize security across all operations.",
            growthRate: 92,
            stability: 95,
            emergingOpportunities: [
              "Cloud security specialization",
              "IoT security",
              "Zero trust architecture implementation",
              "AI-based security systems",
              "Quantum-resistant cryptography"
            ]
          },
          notableProfessionals: [
            {
              name: "Bruce Schneier",
              achievement: "Security Technologist and Author",
              description: "Cryptographer and computer security professional known for his influential work in cybersecurity, cryptography, and digital privacy advocacy."
            },
            {
              name: "Katie Moussouris",
              achievement: "Founder of Luta Security",
              description: "Computer security researcher who pioneered bug bounty programs and vulnerability disclosure practices now used by major technology companies worldwide."
            }
          ]
        };
      
      default:
        // For other career paths, add default journey structure
        return {
          ...path,
          journey: [
            {
              title: "Education & Foundation",
              description: `Develop core knowledge and skills in ${path.title} through formal education and initial training.`,
            },
            {
              title: "Early Career",
              description: "Apply foundational knowledge in entry-level positions while developing specialized skills.",
            },
            {
              title: "Mid-Career Growth",
              description: "Take on more responsibility and develop leadership skills within your organization or field.",
            },
            {
              title: "Senior Role / Specialization",
              description: "Lead initiatives, mentor others, and potentially specialize in a specific area of expertise.",
            }
          ],
          marketTrends: {
            overview: `The ${path.title} field continues to evolve with new trends and opportunities emerging regularly.`,
            growthRate: 65,
            stability: 75,
            emergingOpportunities: [
              "Technology integration and digital transformation",
              "Remote and flexible work arrangements",
              "International opportunities and global markets",
              "Specialized niche development"
            ]
          },
          notableProfessionals: [
            {
              name: "Industry Leader 1",
              achievement: `Pioneering work in ${path.title}`,
              description: `Made significant contributions to the field of ${path.title} through innovation and leadership.`
            },
            {
              name: "Industry Leader 2",
              achievement: `Award-winning professional in ${path.title}`,
              description: `Recognized expert who has advanced the field of ${path.title} through groundbreaking work.`
            }
          ]
        };
    }
  });
  
  return detailedPaths;
};
