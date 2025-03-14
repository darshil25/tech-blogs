import { useLocation } from 'react-router-dom';
import { useGetBlogQuery } from '../../API/blogApi';
import { Avatar } from './BlogCard';
import TopBar from './TopBar';

const Blog = () => {
  const location = useLocation();
  const blogId = location.pathname.split('/').pop();

  const { data: blogData, isLoading: blogLoading } = useGetBlogQuery(blogId, {
    skip: blogId === 'new',
  });

  if (blogLoading) return <div>LOADING....</div>;
  return (
    <div className="flex flex-col">
      {/* <input type="text" value={blogData.title} />
      <textarea value={blogData.content}/> */}
      <TopBar />
      <div className="flex justify-center">
        <div className="grid grid-cols-12 px-10 w-full pt-12 max-w-screen-xl gap-12">
          <div className="col-span-8">
            <div className="text-5xl font-extrabold">{blogData.title}</div>
            <div className="text-slate-500 pt-2">Post on 2nd December 2023</div>
            <div className="pt-4">{blogData.content}</div>
          </div>
          <div className="col-span-4">
            <div className="text-slate-600 text-lg">Author</div>
            <div className="flex w-full">
              <div className="pr-4 flex flex-col justify-center">
                <Avatar
                  name={
                    blogData.author.firstName + ' ' + blogData.author.lastName
                  }
                />
              </div>
              <div>
                <div className="text-xl font-bold">
                  {blogData.author.firstName + ' ' + blogData.author.lastName}
                </div>
                <div className="pt-2 text-slate-500">
                  Random catch phrase about the author's ability to grab the
                  user's attention
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;
