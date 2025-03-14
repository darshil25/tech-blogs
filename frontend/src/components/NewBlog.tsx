import React, { ChangeEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TopBar from './TopBar';
import { useNewBlogMutation } from '../../API/blogApi';

const NewBlog = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate();

  const [createBlog] = useNewBlogMutation();

  const handleSubmit = async () => {
    try {
      const blogData = {
        title,
        content: description
      }
      await createBlog(blogData).unwrap();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <TopBar />
      <div className="flex justify-center w-full pt-8">
        <div className="max-w-screen-lg w-full">
          <input
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            type="text"
            className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="Title"
          />

          <TextEditor
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          />
          <button
            onClick={handleSubmit}
            type="submit"
            className="mt-4 cursor-pointer inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800"
          >
            Publish post
          </button>
        </div>
      </div>
    </div>
  );
};

const TextEditor = ({
  onChange,
}: {
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
}) => {
  return (
    <div className="mt-2">
      <div className="w-full mb-4 ">
        <div className="flex items-center justify-between">
          <div className="my-2 bg-white rounded-b-lg w-full">
            <label className="sr-only">Publish post</label>
            <textarea
              onChange={onChange}
              id="editor"
              rows={25}
              className="resize-none focus:outline-none block w-full p-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 outline-none"
              placeholder="Write an article..."
              required
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewBlog;
