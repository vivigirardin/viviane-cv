
import { Progress } from "@/components/ui/progress";

interface SkillsLanguagesProps {
  title: string;
  content?: string;
  skills?: {
    name: string;
    level: number;
    description?: string;
  }[];
  useProgressBars?: boolean;
}

export function SkillsLanguages({ 
  title, 
  content, 
  skills = [], 
  useProgressBars = false 
}: SkillsLanguagesProps) {
  // If using the old content string format
  if (content && !useProgressBars) {
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

  // If using the new skills array format with progress bars
  return (
    <div className="mb-4">
      {title && <h3 className="text-lg font-medium mb-2">{title}</h3>}
      <div className="space-y-3">
        {skills.map((skill, index) => (
          <div key={index} className="p-1.5 rounded bg-gray-50 hover:bg-primary/10 transition-colors">
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium">{skill.name}</span>
              <span className="text-xs text-gray-500">{skill.level}/10</span>
            </div>
            <Progress value={skill.level * 10} className="h-2" />
            {skill.description && (
              <div className="mt-1 text-xs text-gray-600">{skill.description}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
