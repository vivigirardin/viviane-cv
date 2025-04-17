import { useState } from "react";
import { ResumeBuilder } from "@/components/cv/ResumeBuilder";
import { MarkdownCV } from "@/components/cv/MarkdownCV";
import { Button } from "@/components/ui/button";
import { FileText, FileCode } from "lucide-react";

const Index = () => {
  const [viewMode, setViewMode] = useState<'full' | 'simple'>('full');

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-50 to-gray-200 print:p-0 print:bg-white text-left">
      <style dangerouslySetInnerHTML={{
        __html: `
          @media print {
            @page {
              margin: 1cm;
              size: A4;
              padding: 0;
            }
            body {
              -webkit-print-color-adjust: exact !important;
              print-color-adjust: exact !important;
              color-adjust: exact !important;
              background: white !important;
              margin: 0;
              padding: 0;
            }
            
            /* Hide elements when printing */
            .print\\:hidden {
              display: none !important;
            }
            
            /* Remove shadows in print */
            .print\\:shadow-none {
              box-shadow: none !important;
            }
            
            /* Preserve layout in print */
            .grid {
              display: grid !important;
            }
            
            .md\\:grid-cols-3 {
              grid-template-columns: repeat(3, minmax(0, 1fr)) !important;
            }
            
            /* Force white background */
            .bg-gradient-to-br, .bg-gray-50, .bg-primary\\/10 {
              background: white !important;
            }
            
            /* Ensure borders print */
            .border-b {
              border-bottom-width: 1px !important;
              border-bottom-style: solid !important;
              border-bottom-color: #e5e7eb !important;
            }
            
            /* Remove gaps */
            .gap-6 {
              gap: 1rem !important;
            }
            
            /* Adjust margins */
            .mt-4 {
              margin-top: 0.5rem !important;
            }
            
            .mb-4 {
              margin-bottom: 0.5rem !important;
            }
            
            /* Make text darker for better print */
            .text-gray-600 {
              color: #374151 !important;
            }
            
            .text-gray-700 {
              color: #1f2937 !important;
            }
            
            /* Ensure cards print properly */
            .card {
              background-color: white !important;
              border: 1px solid #e5e7eb !important;
              break-inside: avoid !important;
            }
            
            /* Preserve icons */
            svg.text-primary {
              color: currentColor !important;
            }
          }
        `
      }} />
      
      <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6">
        <div className="flex justify-center mb-6 print:hidden">
          <div className="inline-flex rounded-md shadow-sm" role="group">
            <Button
              variant={viewMode === 'full' ? 'default' : 'outline'}
              className="flex items-center gap-2 rounded-r-none"
              onClick={() => setViewMode('full')}
            >
              <FileText size={16} />
              Full CV
            </Button>
            <Button
              variant={viewMode === 'simple' ? 'default' : 'outline'}
              className="flex items-center gap-2 rounded-l-none"
              onClick={() => setViewMode('simple')}
            >
              <FileCode size={16} />
              Simple Markdown
            </Button>
          </div>
        </div>
        
        {viewMode === 'full' ? (
          <ResumeBuilder />
        ) : (
          <MarkdownCV />
        )}
      </div>
    </div>
  );
};

export default Index;
