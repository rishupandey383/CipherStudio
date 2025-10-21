import React from 'react';
import CipherSchoolsLogo from './icons/CipherSchoolsLogo';
import MailIcon from './icons/MailIcon';
import GooglePlayButton from './images/GooglePlayButton';
import YoutubeIcon from './icons/YoutubeIcon';
import InstagramIcon from './icons/InstagramIcon';
import LinkedinIcon from './icons/LinkedinIcon';
import GithubIcon from './icons/GithubIcon';
import FacebookIcon from './icons/FacebookIcon';
import TwitterIcon from './icons/TwitterIcon';


const socialLinks = [
    { href: 'https://www.youtube.com/c/CipherSchools', icon: YoutubeIcon, label: 'YouTube' },
    { href: 'https://www.instagram.com/cipherschools/', icon: InstagramIcon, label: 'Instagram' },
    { href: 'https://in.linkedin.com/company/cipherschool', icon: LinkedinIcon, label: 'LinkedIn' },
    { href: '#', icon: GithubIcon, label: 'GitHub' },
    { href: 'https://www.facebook.com/cipherschools/', icon: FacebookIcon, label: 'Facebook' },
    { href: 'https://twitter.com/CipherSchools', icon: TwitterIcon, label: 'Twitter' },
];

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-50 dark:bg-slate-900 border-t border-gray-200 dark:border-slate-800 relative z-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Column 1: Info */}
            <div className="space-y-4 lg:col-span-1">
                <CipherSchoolsLogo className="h-10 w-auto" />
                <p className="text-sm text-gray-600 dark:text-gray-400 max-w-sm">
CipherStudio is a revolutionary browser-based React IDE that lets you code, run, and visualize your React apps instantly — all from your browser.
Built for speed and simplicity, it connects passionate learners and developers with the tools they need to turn ideas into stunning web experiences — effortlessly.                </p>
                <div className="flex items-center gap-2">
                    <MailIcon className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                    <a href="mailto:support@cipherschools.com" className="text-sm text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">
                        support@cipherschools.com
                    </a>
                </div>
            </div>

            {/* Column 2 & 3 - Spacing and Content */}
            <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-8">
                 {/* Empty column for spacing on large screens */}
                <div className="hidden lg:block"></div>
                
                {/* Get the app & Socials */}
                <div className="space-y-4">
                     <h3 className="text-base font-semibold text-gray-800 dark:text-gray-200 tracking-tight">Get the App</h3>
                     <a href="#" aria-label="Get it on Google Play">
                        <GooglePlayButton className="h-12 w-auto" />
                     </a>
                     <div className="pt-4">
                        <h3 className="text-base font-semibold text-gray-800 dark:text-gray-200 mb-2 tracking-tight">Follow Us</h3>
                        <div className="flex items-center space-x-4">
                            {socialLinks.map(link => (
                                <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer" className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-200 hover:scale-110" aria-label={link.label}>
                                    <link.icon className="w-6 h-6" />
                                </a>
                            ))}
                        </div>
                     </div>
                </div>
            </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;