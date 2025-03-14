import { useNavigate } from 'react-router-dom';
import { useGetAllBlogsQuery } from '../../API/blogApi';
import { Fragment } from 'react/jsx-runtime';
import { BlogCard } from './BlogCard';

interface Blog {
  id: string;
  title: string;
  content: string;
  authorId: string;
  author: {
    firstName: string,
    lastName: string
  }
  createdAt: Date
}

const Blogs = () => {
  const { data: blogs, isLoading: blogsLoading } = useGetAllBlogsQuery({});

  const navigate = useNavigate();

  const handleBlogClick = (id: string) => {
    navigate(`/blog/${id}`);
  };

  if (blogsLoading) return <div>Loading.....</div>;

  return (
    <div className="p-20 flex flex-col items-center">
      {blogs &&
        blogs.map((blog: Blog, index: number) => (
          <Fragment key={index}>
            <BlogCard
              authorName={blog.author.firstName + " " + blog.author.lastName}
              content={blog.content}
              title={blog.title}
              createdAt={blog.createdAt}
              onClick={() => handleBlogClick(blog.id)}
            />
          </Fragment>
        ))}
    </div>
  );
};

export default Blogs;
