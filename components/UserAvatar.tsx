import React from 'react';

interface UserAvatarProps {
  email: string;
  onClick: () => void;
  className?: string;
}

const UserAvatar: React.FC<UserAvatarProps> = ({ email, onClick, className }) => {
  const initial = email ? email.charAt(0).toUpperCase() : '?';

  return (
    <button
      onClick={onClick}
      className={`flex items-center justify-center w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 text-white font-bold text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-slate-900 transition-transform hover:scale-110 ${className}`}
      title={`Dashboard for ${email}`}
    >
      {initial}
    </button>
  );
};

export default UserAvatar;
