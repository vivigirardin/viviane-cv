
import { useState } from "react";
import { ResumeBuilder } from "@/components/cv/ResumeBuilder";
import { MarkdownCV } from "@/components/cv/MarkdownCV";
import { Button } from "@/components/ui/button";
import { FileText, FileCode, Printer } from "lucide-react";

const Index = () => {
  const [viewMode, setViewMode] = useState<'full' | 'simple'>('full');

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-50 to-gray-200 print:p-0 print:bg-white text-left">
      <style dangerouslySetInnerHTML={{
        __html: `
          @media print {
            @page {
              margin: 0.5cm;
              size: auto;
            }
            body {
              -webkit-print-color-adjust: exact;
              print-color-adjust: exact;
            }
            /* Preserve all styles when printing */
            .print\\:hidden {
              display: none !important;
            }
            .print\\:shadow-none {
              box-shadow: none !important;
            }
            /* Ensure grid layout is preserved in print */
            .grid {
              display: grid !important;
            }
            .md\\:grid-cols-3 {
              grid-template-columns: repeat(3, minmax(0, 1fr)) !important;
            }
            .md\\:col-span-2 {
              grid-column: span 2 / span 2 !important;
            }
            .md\\:col-span-1 {
              grid-column: span 1 / span 1 !important;
            }
            /* Ensure proper text alignment in print */
            .text-center {
              text-align: center !important;
            }
            .md\\:text-left {
              text-align: left !important;
            }
            /* Fix spacing between header and content */
            .mb-8 {
              margin-bottom: 1rem !important;
            }
            .mt-8 {
              margin-top: 1rem !important;
            }
            .pb-6 {
              padding-bottom: 1rem !important;
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
              className="flex items-center gap-2 rounded-l-none rounded-r-none"
              onClick={() => setViewMode('simple')}
            >
              <FileCode size={16} />
              Simple Markdown
            </Button>
            <a href="/header-only.html" target="_blank" rel="noopener noreferrer">
              <Button
                variant="outline"
                className="flex items-center gap-2 rounded-l-none"
              >
                <Printer size={16} />
                Header Only
              </Button>
            </a>
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
