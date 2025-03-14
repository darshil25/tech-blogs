import { useGetProfileQuery } from '../../API/blogApi';
import { useNavigate } from 'react-router-dom';
import { Avatar } from './BlogCard';
import { Plus } from 'lucide-react';

const TopBar = () => {
  const { data: user, isLoading: profileLoading } = useGetProfileQuery({});
  const navigate = useNavigate();
  const handleCreateBlog = () => {
    navigate('/new-blog');
  };
  if (profileLoading) return <div>Loading.....</div>;

  return (
    <div className="flex justify-between p-4">
      <h1 className="text-amber-500 text-2xl font-bold">Blogs 4 U</h1>
      <div className="flex items-center gap-3">
        <p className="h-fit">Welcome, {user.firstName + ' ' + user.lastName}</p>
        <Avatar name={user.firstName + ' ' + user.lastName} />
        <button
          type="button"
          onClick={handleCreateBlog}
          className="flex items-center text-white cursor-pointer bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 rounded-full text-sm p-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        >
          <Plus />
          <p>New Blog</p>
        </button>
      </div>
    </div>
  );
};

export default TopBar;
