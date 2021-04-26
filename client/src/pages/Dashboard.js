import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import Article, { NewArticle, ArticleModal } from '../components/Article';
import Loading from '../components/Loading';
import { fetchFiles } from '../util/files';

const Dashboard = () => {
  const [show, setShow] = useState(false);
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadFiles = async () => {
      const userFiles = await fetchFiles();
      setFiles(userFiles);
      setLoading(false);
    };
    loadFiles();
  }, []);

  const reloadFiles = async () => {
    const userFiles = await fetchFiles();
    setFiles(userFiles);
  };

  return (
    <Layout>
      <ArticleModal show={show} setShow={setShow} reloadFiles={reloadFiles} />
      {loading ? (
        <Loading />
      ) : (
        <div className="w-full p-12 flex flex-row flex-wrap justify-center animate-fade-in">
          {files.map((file) => (
            <Article key={file.id} article={file} />
          ))}
          <NewArticle setShow={setShow} />
        </div>
      )}
    </Layout>
  );
};

export default Dashboard;
