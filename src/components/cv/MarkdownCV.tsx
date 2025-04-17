
import { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Download, Printer } from "lucide-react";

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
    <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg print:shadow-none">
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
      
      <div className="p-6 print:p-0">
        <pre className="whitespace-pre-wrap font-sans text-base text-left leading-relaxed">
          {markdown}
        </pre>
      </div>
    </div>
  );
}
