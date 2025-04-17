
import { ResumeBuilder } from "@/components/cv/ResumeBuilder";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 py-10 px-4 print:p-0 print:bg-white">
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
          }
        `
      }} />
      <ResumeBuilder />
    </div>
  );
};

export default Index;
