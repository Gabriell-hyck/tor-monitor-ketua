import { Github, Twitter, Linkedin, Globe } from 'lucide-react';
import { socialLinks } from '../../utils/constants';

const icons = {
  github: Github,
  twitter: Twitter,
  linkedin: Linkedin,
  website: Globe,
};

export default function SocialLinks() {
  return (
    <div className="flex flex-wrap gap-3">
      {Object.entries(socialLinks).map(([platform, url]) => {
        const Icon = icons[platform] || Globe;
        return (
          <a
            key={platform}
            href={url}
            target="_blank"
            rel="noreferrer"
            className="w-12 h-12 rounded-full bg-white dark:bg-gray-800 shadow-card flex items-center justify-center text-soft hover:text-accent hover:bg-primary/20 dark:hover:bg-gray-700 transition-all hover:scale-110"
            title={platform}
          >
            <Icon size={20} />
          </a>
        );
      })}
    </div>
  );
}