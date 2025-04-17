
import { Briefcase, GraduationCap, Archive, Star, Globe, Heart, Printer, User, MoreHorizontal, Mail, Phone, Linkedin, Github } from "lucide-react";
import { Header } from "./Header";
import { Section } from "./Section";
import { ExperienceItem } from "./ExperienceItem";
import { SkillsLanguages } from "./SkillsLanguages";
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

      <div className="print:block border-b pb-4 mb-6">
        <h1 className="text-3xl font-bold mb-4 text-primary">{cvData.profile.name}</h1>
        <div className="flex flex-wrap gap-4 text-sm mb-2">
          <a href={`mailto:${cvData.profile.contacts.email}`} className="flex items-center gap-1.5 text-gray-600 hover:text-primary">
            <Mail size={16} className="text-primary" />
            {cvData.profile.contacts.email}
          </a>
          <a href={`tel:${cvData.profile.contacts.phone}`} className="flex items-center gap-1.5 text-gray-600 hover:text-primary">
            <Phone size={16} className="text-primary" />
            {cvData.profile.contacts.phone}
          </a>
          <a href={`https://${cvData.profile.contacts.linkedin}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-gray-600 hover:text-primary">
            <Linkedin size={16} className="text-primary" />
            {cvData.profile.contacts.linkedin}
          </a>
          <a href={`https://${cvData.profile.contacts.github}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-gray-600 hover:text-primary">
            <Github size={16} className="text-primary" />
            {cvData.profile.contacts.github}
          </a>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4 print:mt-0">
        <div className="md:col-span-2">
          {cvData.summary && (
            <Section title="Summary" icon={<User size={20} />}>
              <div className="text-sm leading-relaxed mb-4 text-gray-700 p-3 bg-gray-50 print:bg-white rounded-md">
                {cvData.summary}
              </div>
            </Section>
          )}

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

          <Section title="Others" icon={<MoreHorizontal size={20} />}>
            {cvData.others.map((item, index) => (
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
          <Section title="Skills" icon={<Star size={20} />}>
            <SkillsLanguages 
              title="" 
              skills={cvData.skills} 
              useProgressBars={true} 
            />
          </Section>
          
          <Section title="Languages" icon={<Globe size={20} />}>
            <SkillsLanguages title="" content={cvData.languages} />
          </Section>
          
          <Section title="Interests" icon={<Heart size={20} />}>
            <SkillsLanguages title="" content={cvData.interests} />
          </Section>
        </div>
      </div>
      
      <div className="text-center text-sm text-gray-500 mt-10 pt-4 border-t print:hidden">
        © {new Date().getFullYear()} {cvData.profile.name} - Resume created with CV Builder
      </div>
    </div>
  );
}
