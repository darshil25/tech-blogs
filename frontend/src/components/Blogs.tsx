import { useNavigate } from 'react-router-dom';
import { useGetAllBlogsQuery } from '../../API/blogApi';
import { Fragment } from 'react/jsx-runtime';
import { BlogCard } from './BlogCard';

interface Blog {
  id: string;
  title: string;
  content: string;
  authorId: string;
}

const Blogs = () => {
  const { data: blogs, isLoading: blogsLoading } = useGetAllBlogsQuery({});

  const navigate = useNavigate();

  const handleBlogClick = (id: string) => {
    navigate(`/blog/${id}`);
  };

  if (blogsLoading) return <div>Loading.....</div>;

  return (
    <div className="p-20">
      {blogs &&
        blogs.map((blog: Blog, index: number) => (
          <Fragment key={index}>
            <BlogCard
              authorName={'Darshil'}
              content={blog.content}
              publishedDate="12 Dec 2024"
              title={blog.title}
              onClick={() => handleBlogClick(blog.id)}
            />
          </Fragment>
        ))}
    </div>
  );
};

export default Blogs;
