
interface ExperienceItemProps {
  position: string;
  company: string;
  dates: string;
  details?: string;
}

export function ExperienceItem({ position, company, dates, details }: ExperienceItemProps) {
  return (
    <div className="mb-6 hover:bg-gray-50 p-3 rounded-md transition-colors">
      <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-2">
        <h3 className="text-lg font-semibold text-gray-800">{position}</h3>
        <span className="text-sm font-medium bg-primary/10 text-primary px-2 py-0.5 rounded mt-1 md:mt-0">{dates}</span>
      </div>
      <div className="text-md font-medium text-muted-foreground mb-2">{company}</div>
      {details && (
        <div 
          className="text-sm text-gray-700" 
          dangerouslySetInnerHTML={{ __html: details }} 
        />
      )}
    </div>
  );
}
