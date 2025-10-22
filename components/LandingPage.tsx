import React, { useRef } from 'react';
import type { Theme } from '../types';
import useOnScreen from '../hooks/useOnScreen';
import LandingHeader from './LandingHeader';
import AestheticBackground from './AestheticBackground';
import HeroImage from './images/HeroImage';
import AiImage from './images/AiImage';
import AiChipIcon from './icons/AiChipIcon';
import ComponentIcon from './icons/ComponentIcon';
import BookIcon from './icons/BookIcon';
import CheckIcon from './icons/CheckIcon';
import Footer from './Footer';

interface LandingPageProps {
  onGetStarted: () => void;
  onLogin: () => void;
  onGoToDashboard: () => void;
  currentUser: { email: string } | null;
  theme: Theme;
  onToggleTheme: () => void;
}

const features = [
  {
    icon: AiChipIcon,
    title: 'AI-Powered Code Generation',
    description:
      'Generate boilerplate, write functions, and debug code with our intelligent AI assistant.',
  },
  {
    icon: ComponentIcon,
    title: 'Interactive Component Playground',
    description:
      'Build and test your components in a live, interactive environment with instant feedback.',
  },
  {
    icon: BookIcon,
    title: 'Collaborative Real-time Editing',
    description:
      'Work with your team in the same file at the same time, with changes synced instantly.',
  },
];

const LandingPage: React.FC<LandingPageProps> = ({
  onGetStarted,
  onLogin,
  onGoToDashboard,
  currentUser,
  theme,
  onToggleTheme,
}) => {
  const aiSectionRef = useRef<HTMLElement>(null);
  const isAiSectionVisible = useOnScreen(aiSectionRef, '-150px');
  const featuresSectionRef = useRef<HTMLElement>(null);
  const isFeaturesSectionVisible = useOnScreen(featuresSectionRef, '-150px');

  const mainButtonAction = currentUser ? onGoToDashboard : onGetStarted;
  const mainButtonText = currentUser ? 'Go to Dashboard' : 'Start Building Now';

  return (
    <div className={`min-h-screen font-sans text-gray-800 dark:text-gray-200 ${theme}`}>
      <style>{`
        :root {
          --brand-teal: #33D1C4;
          --brand-magenta: #D946EF;
          --brand-violet: #8B5CF6;
        }
      `}</style>

      <AestheticBackground />
      <LandingHeader
        onGetStarted={onGetStarted}
        onLogin={onLogin}
        theme={theme}
        onToggleTheme={onToggleTheme}
        currentUser={currentUser}
        onGoToDashboard={onGoToDashboard}
      />

      <main className="relative z-10 overflow-hidden">
        {/* Hero Section */}
        <section
          id="hero"
          className="container mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 text-center"
        >
          <h1
            className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4 animate-fade-in-up"
            style={{ animationDelay: '0.2s' }}
          >
            Build at the Speed of Thought with{' '}
            <span
              className="bg-gradient-to-r from-[var(--brand-teal)] to-[var(--brand-violet)] text-transparent bg-clip-text animate-gradient"
              style={{ backgroundSize: '200% 200%' }}
            >
              CipherStudio
            </span>
          </h1>

          <p
            className="max-w-3xl mx-auto text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-8 animate-fade-in-up"
            style={{ animationDelay: '0.4s' }}
          >
            A next-generation browser-based React IDE where you can write, run, and preview React code
            instantly — all from your browser.
          </p>

          {/* ✅ Fixed closing tag issue here */}
          <p
            className="max-w-3xl mx-auto text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-8 animate-fade-in-up"
            style={{ animationDelay: '0.4s' }}
          >
            Crafted with passion by the CipherStudio Team — empowering your React journey to be faster,
            smoother, and endlessly inspiring.
          </p>

          <div
            className="flex justify-center gap-4 animate-fade-in-up"
            style={{ animationDelay: '0.6s' }}
          >
            <button
              onClick={mainButtonAction}
              className="px-8 py-3 text-lg font-semibold text-white bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-lg shadow-lg hover:shadow-xl hover:shadow-fuchsia-500/30 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-violet-300 dark:focus:ring-violet-800"
            >
              {mainButtonText}
            </button>
          </div>

          <div className="mt-16 animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
            <HeroImage className="max-w-4xl mx-auto w-full h-auto animate-float" />
          </div>
        </section>

        {/* AI Section */}
        <section
          ref={aiSectionRef}
          id="agent"
          className="container mx-auto px-4 sm:px-6 lg:px-8 py-20"
        >
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div
              className={`transition-all duration-700 ${
                isAiSectionVisible
                  ? 'opacity-100 translate-y-0 delay-200'
                  : 'opacity-0 translate-y-10'
              }`}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">
                Your AI Co-pilot for Code
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                CipherStudio's AI doesn't just autocomplete, it understands your intent. From
                scaffolding entire applications to finding the most obscure bugs, it's the partner
                you've always wanted.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center gap-3">
                  <CheckIcon className="w-6 h-6 text-green-500" />
                  <span>Context-aware code completion</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckIcon className="w-6 h-6 text-green-500" />
                  <span>Automated refactoring and optimization</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckIcon className="w-6 h-6 text-green-500" />
                  <span>Natural language to code translation</span>
                </li>
              </ul>
            </div>

            <div
              className={`transition-all duration-700 ${
                isAiSectionVisible
                  ? 'opacity-100 translate-y-0 delay-400'
                  : 'opacity-0 translate-y-10'
              }`}
            >
              <AiImage className="w-full h-auto rounded-lg" />
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section
          ref={featuresSectionRef}
          id="features"
          className="bg-gray-50/50 dark:bg-gray-900/50 backdrop-blur-sm py-20"
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div
              className={`text-center mb-12 transition-all duration-700 ${
                isFeaturesSectionVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
            >
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                A Studio, Not Just an Editor
              </h2>
              <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
                Everything you need, right where you need it.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <div
                  key={feature.title}
                  className={`bg-white/80 dark:bg-gray-800/80 p-8 rounded-xl shadow-lg transition-all duration-500 hover:-translate-y-2 ${
                    isFeaturesSectionVisible
                      ? 'opacity-100 translate-y-0'
                      : 'opacity-0 translate-y-10'
                  }`}
                  style={{ transitionDelay: `${index * 150}ms` }}
                >
                  <feature.icon className="w-12 h-12 mb-4" />
                  <h3 className="text-xl font-semibold mb-2 tracking-tight">{feature.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default LandingPage;
