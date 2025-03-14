import Blogs from './Blogs';
import TopBar from './TopBar';

const Home = () => {
  return (
    <div className="flex flex-col">
      <TopBar />
      <Blogs />
    </div>
  );
};

export default Home;
