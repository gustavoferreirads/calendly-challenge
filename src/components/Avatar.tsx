import { avatarUrl } from '@/const/imageUrl';
import { strings } from '@/const/strings';
import React from 'react';

type AvatarProps = {
  src?: string;
  alt?: string;
};

const Avatar: React.FC<AvatarProps> = ({ src = avatarUrl.default, alt }) => {
  return (
    <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
      {src ? (
        <img src={src} alt={alt || strings.avatar} className="w-full h-full object-cover" />
      ) : (
        <div className="text-gray-500 text-2xl font-semibold">?</div>
      )}
    </div>
  );
};

export default Avatar;