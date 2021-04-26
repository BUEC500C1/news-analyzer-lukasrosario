import React, { useState } from 'react';
import Modal from './Modal';
import { uploadFile, importFile } from '../util/files';
import useRouter from '../util/router';

const Article = ({
  article: { id, title, previewUrl, fileUrl },
  search = false,
  onClick = null
}) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/doc/${id}`);
  };

  return (
    <button
      onClick={search ? onClick : handleClick}
      className="w-64 h-64 flex flex-col items-center justify-end bg-white border-2 border-green-500 rounded-md space-y-4 transform hover:scale-110 duration-100 m-6 box-content relative"
    >
      <img alt={title} src={previewUrl} className="h-full" />
      <div className="absolute w-full bg-black bg-opacity-75 text-white text-xl py-2 px-2">
        {title}
      </div>
    </button>
  );
};

export const NewArticle = ({ setShow }) => {
  const handleNewClick = () => {
    setShow(true);
    window.scrollTo(0, 0);
  };
  return (
    <button
      onClick={handleNewClick}
      className="w-64 h-64 flex flex-col items-center justify-center bg-green-500 rounded-md space-y-4 transform hover:scale-110 duration-100 m-6"
    >
      <p className="text-5xl text-white">+</p>
      <p className="text-2xl text-white">New Article</p>
    </button>
  );
};

export const SearchModal = ({
  show,
  setShow,
  setLoading,
  article: { title, previewUrl, fileUrl }
}) => {
  const router = useRouter();

  const handleSubmit = async () => {
    setLoading(true);
    setShow(false);
    await importFile(title, previewUrl, fileUrl);
    router.push('/');
  };

  return (
    <Modal show={show} setShow={setShow}>
      <div className="w-full h-full flex flex-col items-center justify-center">
        <img alt={title} src={previewUrl} className="w-64 mb-6" />
        <p className="text-2xl text-white mb-6">{title}</p>
        <a
          href={fileUrl}
          target="__blank"
          className="text-2xl text-green-500 underline mb-6"
        >
          {fileUrl}
        </a>
        <button
          onClick={handleSubmit}
          className="bg-green-500 px-8 py-2 rounded-md text-xl text-white hover:bg-green-400"
        >
          Import
        </button>
      </div>
    </Modal>
  );
};

export const ArticleModal = ({ show, setShow, reloadFiles }) => {
  const [inputs, setInputs] = useState({ title: '', file: null });

  const handleChange = (e) => {
    if (e.target.name === 'title') {
      setInputs({ ...inputs, [e.target.name]: e.target.value });
    } else {
      setInputs({ ...inputs, [e.target.name]: e.target.files[0] });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await uploadFile(inputs);
    setShow(false);
    setInputs({ title: '', file: null });
    reloadFiles();
  };

  return (
    <Modal show={show} setShow={setShow}>
      <div className="w-full h-full flex flex-col items-center justify-center">
        <p className="text-2xl text-white mb-6">Upload a new article</p>
        <form
          onSubmit={handleSubmit}
          className="w-full h-full flex flex-col items-center justify-center"
        >
          <input
            name="title"
            type="text"
            required
            placeholder="Article Title"
            className="w-72 py-2 text-xl border-2 border-green-300 rounded-md bg-gray-700 text-white pl-2 mb-6"
            value={inputs.title}
            onChange={handleChange}
          />
          <label className="w-72 flex flex-col items-center px-4 py-6 bg-gray-700 hover:bg-gray-600 text-blue rounded-lg shadow-lg border-2 border-green-300 cursor-pointer text-white mb-12">
            {inputs.file ? (
              inputs.file.name
            ) : (
              <>
                <svg
                  className="w-8 h-8"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
                </svg>
                <span className="mt-2 text-base leading-normal">
                  Select a file
                </span>
              </>
            )}
            <input
              required
              name="file"
              type="file"
              className="hidden"
              accept=".pdf"
              onChange={handleChange}
            />
          </label>
          <button
            type="submit"
            className="bg-green-500 px-8 py-2 rounded-md text-xl text-white hover:bg-green-400"
          >
            Upload
          </button>
        </form>
      </div>
    </Modal>
  );
};

export default Article;
