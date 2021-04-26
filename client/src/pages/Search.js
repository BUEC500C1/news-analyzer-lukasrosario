import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import Loading from '../components/Loading';
import useRouter from '../util/router';
import { searchNews } from '../util/files';
import Article, { SearchModal } from '../components/Article';

const Search = () => {
  const [loading, setLoading] = useState(true);
  const [articles, setArticles] = useState([]);
  const [current, setCurrent] = useState({
    title: '',
    previewUrl: '',
    fileUrl: ''
  });
  const [show, setShow] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const loadHeadlines = async () => {
      const response = await searchNews(router.params.term);
      setArticles(response);
      setLoading(false);
    };
    loadHeadlines();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClick = (article) => {
    setCurrent(article);
    setShow(true);
    window.scrollTo(0, 0);
  };

  return (
    <Layout>
      <SearchModal
        show={show}
        setShow={setShow}
        setLoading={setLoading}
        article={current}
      />
      {loading ? (
        <Loading />
      ) : (
        <div className="w-full p-12 flex flex-row flex-wrap justify-center animate-fade-in">
          {articles.map((article, index) => (
            <Article
              onClick={() => handleClick(article)}
              search
              key={index}
              article={article}
            />
          ))}
        </div>
      )}
    </Layout>
  );
};

export default Search;
