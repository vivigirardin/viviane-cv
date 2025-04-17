
import { ReactNode } from "react";

interface SectionProps {
  title: string;
  icon?: ReactNode;
  children: ReactNode;
}

export function Section({ title, icon, children }: SectionProps) {
  return (
    <div className="mb-8 print:mb-4">
      <div className="flex items-center gap-2.5 mb-4 print:mb-2 border-b pb-2 print:pb-1">
        {icon && <span className="text-primary">{icon}</span>}
        <h2 className="text-2xl font-semibold text-primary">{title}</h2>
      </div>
      <div className="pl-1">{children}</div>
    </div>
  );
}
