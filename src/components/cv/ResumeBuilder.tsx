
import { Briefcase, GraduationCap, Archive, Globe, Heart, Printer, User, MoreHorizontal, Code } from "lucide-react";
import { Header } from "./Header";
import { Section } from "./Section";
import { ExperienceItem } from "./ExperienceItem";
import { cvData } from "@/data/cvData";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";

export function ResumeBuilder() {
  useEffect(() => {
    document.title = `${cvData.profile.name} - Resume`;
  }, []);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 bg-white shadow-lg rounded-lg print:shadow-none print:p-0 print:bg-white">
      <div className="flex justify-end mb-4 print:hidden">
        <Button 
          onClick={handlePrint} 
          variant="outline" 
          className="flex items-center gap-2"
        >
          <Printer size={16} />
          Print CV
        </Button>
      </div>
      
      <Header 
        name={cvData.profile.name} 
        tagline="" 
        contacts={cvData.profile.contacts} 
      />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <div className="md:col-span-2">
          <Section title="Summary" icon={<User size={20} />}>
            <div className="text-sm leading-relaxed mb-4 text-gray-700 p-3 bg-gray-50 print:bg-white rounded-md">
              {cvData.summary}
            </div>
          </Section>

          <Section title="Technical Experience" icon={<Code size={20} />}>
            {Object.entries(cvData.technicalExperience).map(([category, items]) => (
              <div key={category} className="mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-3 capitalize">
                  {category.replace(/([A-Z])/g, ' $1').trim()}
                </h3>
                <div className="space-y-3">
                  {items.map((item, index) => (
                    <div key={index} className="p-3 bg-gray-50 rounded-md hover:bg-gray-100 transition-colors">
                      <div className="font-medium text-primary">{item.name}</div>
                      <div className="text-sm text-gray-600 mt-1">{item.details}</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </Section>

          <Section title="Work Experience" icon={<Briefcase size={20} />}>
            {cvData.experiences.map((item, index) => (
              <ExperienceItem 
                key={index}
                position={item.position}
                company={item.company}
                dates={item.dates}
                details={item.details}
              />
            ))}
          </Section>

          <Section title="Education" icon={<GraduationCap size={20} />}>
            {cvData.education.map((item, index) => (
              <ExperienceItem 
                key={index}
                position={item.position}
                company={item.company}
                dates={item.dates}
                details={item.details}
              />
            ))}
          </Section>
        </div>
        
        <div className="md:col-span-1">
          <Section title="Courses & Certificates" icon={<Archive size={20} />}>
            {cvData.courses.map((item, index) => (
              <ExperienceItem 
                key={index}
                position={item.position}
                company={item.company}
                dates={item.dates}
                details={item.details}
              />
            ))}
          </Section>
          
          <Section title="Languages" icon={<Globe size={20} />}>
            <div 
              className="text-sm space-y-1.5" 
              dangerouslySetInnerHTML={{ __html: cvData.languages }} 
            />
          </Section>
          
          <Section title="Interests" icon={<Heart size={20} />}>
            <div 
              className="text-sm" 
              dangerouslySetInnerHTML={{ __html: cvData.interests }} 
            />
          </Section>
        </div>
      </div>
      
      <div className="text-center text-sm text-gray-500 mt-10 pt-4 border-t print:hidden">
        © {new Date().getFullYear()} {cvData.profile.name} - Resume created with CV Builder
      </div>
    </div>
  );
}
