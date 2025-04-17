
import { Mail, Phone, Linkedin, Github } from "lucide-react";

interface HeaderProps {
  name: string;
  tagline: string;
  contacts: {
    email: string;
    phone: string;
    linkedin: string;
    github: string;
  };
}

export function Header({ name, tagline, contacts }: HeaderProps) {
  return (
    <div className="mb-8 text-left border-b pb-4 print:pb-2 print:mb-4">
      <h1 className="text-5xl font-bold mb-2 text-primary">{name}</h1>
      <p className="text-xl mb-6 print:mb-3 text-muted-foreground italic">{tagline}</p>
      
      <div className="flex flex-wrap justify-start gap-6 text-sm">
        <div className="flex items-center gap-4">
          <a href={`mailto:${contacts.email}`} className="flex items-center gap-1.5 hover:text-primary transition-colors">
            <Mail className="text-primary" size={18} />
            <span>{contacts.email}</span>
          </a>
          
          <a href={`tel:${contacts.phone}`} className="flex items-center gap-1.5 hover:text-primary transition-colors">
            <Phone className="text-primary" size={18} />
            <span>{contacts.phone}</span>
          </a>
          
          <a href={`https://${contacts.linkedin}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-primary transition-colors">
            <Linkedin className="text-primary" size={18} />
            <span>{contacts.linkedin}</span>
          </a>
          
          <a href={`https://${contacts.github}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-primary transition-colors">
            <Github className="text-primary" size={18} />
            <span>{contacts.github}</span>
          </a>
        </div>
      </div>
    </div>
  );
}
