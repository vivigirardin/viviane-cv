
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
            .section-break {
              break-before: page;
            }
          }
        `
      }} />
      <ResumeBuilder />
    </div>
  );
};

export default Index;
