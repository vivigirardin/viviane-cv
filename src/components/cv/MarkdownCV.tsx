
import { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Download, Printer, Code, Globe, Briefcase } from "lucide-react";
import { Card } from "@/components/ui/card";
import { cvData } from "@/data/cvData";
import { SkillsLanguages } from "@/components/cv/SkillsLanguages";

export function MarkdownCV() {
  const [markdown, setMarkdown] = useState<string>('');

  useEffect(() => {
    fetch('/src/data/simplifiedCV.md')
      .then(response => response.text())
      .then(text => {
        setMarkdown(text);
      })
      .catch(error => {
        console.error('Error loading markdown:', error);
        setMarkdown('Error loading CV');
      });
  }, []);

  const handlePrint = () => {
    window.print();
  };
  
  const handleDownload = () => {
    const element = document.createElement('a');
    const file = new Blob([markdown], {type: 'text/markdown'});
    element.href = URL.createObjectURL(file);
    element.download = 'viviane_girardin_cv.md';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-lg print:shadow-none">
      <div className="flex justify-end gap-2 mb-4 p-4 print:hidden">
        <Button 
          onClick={handlePrint} 
          variant="outline" 
          className="flex items-center gap-2"
        >
          <Printer size={16} />
          Print
        </Button>
        <Button 
          onClick={handleDownload} 
          variant="outline" 
          className="flex items-center gap-2"
        >
          <Download size={16} />
          Download MD
        </Button>
      </div>
      
      <div className="md:grid md:grid-cols-3 gap-6 p-6 print:p-0">
        <div className="md:col-span-2 print:col-span-2">
          <pre className="whitespace-pre-wrap font-sans text-base text-left leading-relaxed">
            {markdown}
          </pre>
        </div>
        
        <div className="print:col-span-1 space-y-4 mt-6 md:mt-0">
          <Card className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <Briefcase size={18} className="text-primary" />
              <h3 className="text-lg font-medium">Technical Skills</h3>
            </div>
            <SkillsLanguages
              title=""
              skills={cvData.skills}
              useProgressBars={true}
            />
          </Card>
          
          <Card className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <Globe size={18} className="text-primary" />
              <h3 className="text-lg font-medium">Languages</h3>
            </div>
            <SkillsLanguages
              title=""
              content={cvData.languages}
            />
          </Card>
          
          <Card className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <Code size={18} className="text-primary" />
              <h3 className="text-lg font-medium">Interests</h3>
            </div>
            <SkillsLanguages
              title=""
              content={cvData.interests}
            />
          </Card>
        </div>
      </div>
    </div>
  );
}
