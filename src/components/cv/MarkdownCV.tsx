
import { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Download, Printer, Code, Globe, Briefcase, ExternalLink, Mail, Phone, Linkedin, Github } from "lucide-react";
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

  const renderMarkdown = (text: string) => {
    // Replace email links
    let renderedText = text.replace(
      /\[([^[\]]*@[^[\]]*)\]\(mailto:([^()]*)\)/g, 
      '<a href="mailto:$2" class="text-primary hover:underline flex items-center gap-1.5"><Mail size={14} />$1</a>'
    );
    
    // Replace phone links
    renderedText = renderedText.replace(
      /\[(\+[0-9]+)\]\(tel:([^()]*)\)/g,
      '<a href="tel:$2" class="text-primary hover:underline flex items-center gap-1.5"><Phone size={14} />$1</a>'
    );
    
    // Replace LinkedIn links
    renderedText = renderedText.replace(
      /\[(linkedin\.com\/in\/[^[\]]*)\]\(https:\/\/linkedin\.com\/in\/([^()]*)\)/g,
      '<a href="https://linkedin.com/in/$2" target="_blank" rel="noopener noreferrer" class="text-primary hover:underline flex items-center gap-1.5"><Linkedin size={14} />$1</a>'
    );
    
    // Replace GitHub links
    renderedText = renderedText.replace(
      /\[(github\.com\/[^[\]]*)\]\(https:\/\/github\.com\/([^()]*)\)/g,
      '<a href="https://github.com/$2" target="_blank" rel="noopener noreferrer" class="text-primary hover:underline flex items-center gap-1.5"><Github size={14} />$1</a>'
    );
    
    // Replace other links
    renderedText = renderedText.replace(
      /\[([^[\]]*)\]\(([^()]*)\)/g,
      '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-primary hover:underline flex items-center gap-1.5">$1<ExternalLink size={14} /></a>'
    );
    
    // Format headings
    renderedText = renderedText.replace(/^# (.*$)/gm, '<h1 class="text-3xl font-bold mt-1 mb-4">$1</h1>');
    renderedText = renderedText.replace(/^## (.*$)/gm, '<h2 class="text-2xl font-semibold mt-6 mb-3 border-b pb-1">$1</h2>');
    renderedText = renderedText.replace(/^### (.*$)/gm, '<h3 class="text-xl font-semibold mt-4 mb-1 text-primary">$1</h3>');
    
    // Format lists
    renderedText = renderedText.replace(/^\- (.*$)/gm, '<li class="flex items-start gap-2"><span class="text-primary mt-1">•</span><span>$1</span></li>');
    
    // Format bold text
    renderedText = renderedText.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    
    // Format italic text
    renderedText = renderedText.replace(/\*(.*?)\*/g, '<em>$1</em>');
    
    // Add paragraphs to sequences of text that are not already in HTML tags
    const paragraphs = renderedText.split('\n\n');
    renderedText = paragraphs.map(p => {
      if (!p.trim()) return '';
      if (p.indexOf('<h') === 0 || p.indexOf('<li') === 0 || p.indexOf('<ul') === 0) return p;
      if (p.indexOf('<') === 0) return p;
      return `<p class="mb-3">${p}</p>`;
    }).join('\n');
    
    // Wrap lists
    renderedText = renderedText.replace(/(<li.*<\/li>\n)+/g, (match) => `<ul class="list-none mb-4 space-y-1">${match}</ul>`);
    
    return renderedText;
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
          <div 
            className="markdown-content" 
            dangerouslySetInnerHTML={{ __html: renderMarkdown(markdown) }}
          />
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
