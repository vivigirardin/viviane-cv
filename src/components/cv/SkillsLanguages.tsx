
interface SkillsLanguagesProps {
  title: string;
  content: string;
}

export function SkillsLanguages({ title, content }: SkillsLanguagesProps) {
  return (
    <div className="mb-4">
      {title && <h3 className="text-lg font-medium mb-2">{title}</h3>}
      <div 
        className="text-sm space-y-1.5 leading-relaxed" 
        dangerouslySetInnerHTML={{ 
          __html: content
            .split('<br>')
            .map(item => `<div class="p-1.5 rounded bg-gray-50 hover:bg-primary/10 transition-colors">${item}</div>`)
            .join('')
        }} 
      />
    </div>
  );
}
