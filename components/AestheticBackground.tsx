import React from 'react';

const AestheticBackground: React.FC = () => (
  <div className="fixed inset-0 -z-10 h-full w-full">
    {/* Animated Gradient */}
    <div className="absolute inset-0 z-0 bg-gradient-to-br from-white via-slate-100 to-purple-50 dark:from-[#0D1117] dark:via-[#1A143A] dark:to-[#0D1117] animate-gradient" style={{ backgroundSize: '200% 200%' }} />
    
    {/* Grid Pattern */}
    <div
      className="absolute inset-0 bg-[linear-gradient(to_right,theme(colors.slate.200)_1px,transparent_1px),linear-gradient(to_bottom,theme(colors.slate.200)_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,theme(colors.slate.800)_1px,transparent_1px),linear-gradient(to_bottom,theme(colors.slate.800)_1px,transparent_1px)] bg-[size:24px_24px] opacity-60 dark:opacity-40 [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]">
    </div>
  </div>
);

export default AestheticBackground;