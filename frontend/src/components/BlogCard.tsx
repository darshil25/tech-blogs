import React from 'react';

interface blogCardProps {
  authorName: string;
  title: string;
  content: string;
  publishedDate: string;
  onClick: () => void
}

const Avatar = ({ name }: { name: string }) => {
  const parts = name.split(' ');
  console.log('🚀 ~ Avatar ~ parts:', parts);
  return (
    <div className="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
      <span className="font-medium text-gray-600 dark:text-gray-300">
        {parts[0].charAt(0)}
        {parts[1]?.charAt(0)}
      </span>
    </div>
  );
};

const BlogCard = ({
  authorName,
  title,
  content,
  publishedDate,
  onClick
}: blogCardProps) => {
  return (
    <div className="flex flex-col gap-6 border-b border-b-gray-200 py-8 cursor-pointer" onClick={onClick}>
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <Avatar name={authorName} />
          <p>{authorName}</p>
          <p className="text-gray-500">{publishedDate}</p>
        </div>
        <h2 className='text-xl font-semibold'>{title}</h2>
        <div>{content.slice(0, 100) + '...'}</div>
      </div>
      <p className='text-gray-400 text-sm'>{`${Math.ceil(content.length / 100)} min read`}</p>
    </div>
  );
};

export {BlogCard, Avatar};
