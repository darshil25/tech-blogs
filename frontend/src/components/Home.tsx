import { useGetProfileQuery } from '../../API/blogApi';
import { Avatar } from './BlogCard';
import Blogs from './Blogs';

const Home = () => {
  const { data: user, isLoading: profileLoading } = useGetProfileQuery({});



  if (profileLoading) return <div>Loading.....</div>;
  return (
    <div className="flex flex-col">
      <div className="flex justify-between p-4">
        <h1 className="text-amber-500 text-2xl font-bold">Blogs 4 U</h1>
        <div className="flex items-center gap-3">
          <p className='h-fit'>Welcome, {user.firstName + ' ' + user.lastName}</p>
          <Avatar name={user.firstName + ' ' + user.lastName} />
        </div>
      </div>
      <Blogs />
    </div>
  );
};

export default Home;
