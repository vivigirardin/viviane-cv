
import { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Download, Printer, Code, Globe, Briefcase, ExternalLink, Mail, Phone, Linkedin, Github, User, GraduationCap, Award, MoreHorizontal } from "lucide-react";
import { Card } from "@/components/ui/card";
import { cvData } from "@/data/cvData";
import { SkillsLanguages } from "@/components/cv/SkillsLanguages";

export function MarkdownCV() {
  const [markdown, setMarkdown] = useState<string>('');
  const [printHeaderOnly, setPrintHeaderOnly] = useState<boolean>(false);

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
  
  const handlePrintHeaderOnly = () => {
    setPrintHeaderOnly(true);
    setTimeout(() => {
      window.print();
      setPrintHeaderOnly(false);
    }, 100);
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
    
    // Replace icons in section headers
    renderedText = renderedText.replace(/<i data-lucide="user"><\/i>/g, '<User size={20} className="inline mr-2 text-primary" />');
    renderedText = renderedText.replace(/<i data-lucide="briefcase"><\/i>/g, '<Briefcase size={20} className="inline mr-2 text-primary" />');
    renderedText = renderedText.replace(/<i data-lucide="graduation-cap"><\/i>/g, '<GraduationCap size={20} className="inline mr-2 text-primary" />');
    renderedText = renderedText.replace(/<i data-lucide="award"><\/i>/g, '<Award size={20} className="inline mr-2 text-primary" />');
    renderedText = renderedText.replace(/<i data-lucide="more-horizontal"><\/i>/g, '<MoreHorizontal size={20} className="inline mr-2 text-primary" />');
    
    // Format headings
    renderedText = renderedText.replace(/^# (.*$)/gm, '<h1 class="text-3xl font-bold mt-1 mb-4">$1</h1>');
    renderedText = renderedText.replace(/^## (.*$)/gm, '<h2 class="text-2xl font-semibold mt-6 mb-3 border-b pb-1 flex items-center">$1</h2>');
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

  // Extract header content (name and contacts) from markdown
  const extractHeader = (text: string) => {
    const headerMatch = text.match(/^# (.*$)[\s\S]*?(\*\*Email:\*\*.*\*\*GitHub:\*\*.*)/m);
    if (headerMatch && headerMatch.length >= 3) {
      return {
        name: headerMatch[1],
        contacts: headerMatch[2]
      };
    }
    return { name: '', contacts: '' };
  };

  const header = extractHeader(markdown);

  return (
    <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-lg print:shadow-none">
      <div className="flex justify-end gap-2 mb-4 p-4 print:hidden">
        <Button 
          onClick={handlePrint} 
          variant="outline" 
          className="flex items-center gap-2"
        >
          <Printer size={16} />
          Print Full CV
        </Button>
        <Button 
          onClick={handlePrintHeaderOnly} 
          variant="outline" 
          className="flex items-center gap-2"
        >
          <Printer size={16} />
          Print Header Only
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
      
      <style jsx global>{`
        @media print {
          @page { 
            margin: 0.5cm;
            size: auto;
          }
          body {
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
          .print-section { display: block !important; }
          .print-hidden { display: none !important; }
          .print-show-header-only .cv-body,
          .print-show-header-only .cv-sidebar { 
            display: none !important; 
          }
          .print-preserve-grid {
            display: grid !important;
            grid-template-columns: 2fr 1fr !important;
          }
        }
      `}</style>
      
      <div className={`md:grid md:grid-cols-3 gap-6 p-6 print:p-4 print:preserve-grid ${printHeaderOnly ? 'print-show-header-only' : ''}`}>
        <div className="md:col-span-2 print:col-span-2">
          <div className="print-section">
            <h1 className="text-3xl font-bold mt-1 mb-4">{header.name}</h1>
            <div dangerouslySetInnerHTML={{ 
              __html: renderMarkdown(header.contacts) 
            }} className="mb-6" />
          </div>
          
          <div className="markdown-content cv-body" 
            dangerouslySetInnerHTML={{ 
              __html: renderMarkdown(markdown.replace(/^# .*$/m, '').replace(/^\*\*Email:\*\*.*\*\*GitHub:\*\*.*$/m, '')) 
            }}
          />
        </div>
        
        <div className="print:col-span-1 space-y-4 mt-6 md:mt-0 cv-sidebar">
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
