import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import useRouter from '../util/router';
import { Document } from 'react-pdf/dist/esm/entry.webpack';
import { Page } from 'react-pdf';
import Loading from '../components/Loading';
import { getFile } from '../util/files';
import { convertAndAnalyze } from '../util/text';
import { FiArrowLeftCircle } from 'react-icons/fi';
import { FiArrowRightCircle } from 'react-icons/fi';
import AnalysisModal from '../components/Analysis';

const Doc = () => {
  const [numPages, setNumPages] = useState(null);
  const [file, setFile] = useState('');
  const [pageNumber, setPageNumber] = useState(1);
  const [loading, setLoading] = useState(true);
  const [show, setShow] = useState(false);
  const [analysis, setAnalysis] = useState({ summary: '', keywords: [] });

  const router = useRouter();

  useEffect(() => {
    const loadUrl = async () => {
      const file = await getFile(router.params.id);
      setFile(file);
      setLoading(false);
    };
    loadUrl();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  const handleLeftClick = (e) => {
    if (pageNumber === 1) {
      return;
    } else {
      setPageNumber(pageNumber - 1);
    }
  };

  const handleRightClick = (e) => {
    if (pageNumber === numPages) {
      return;
    } else {
      setPageNumber(pageNumber + 1);
    }
  };

  const convertFile = async () => {
    setLoading(true);
    const fileAnalysis = await convertAndAnalyze(router.params.id);
    setLoading(false);
    if (fileAnalysis.summary) {
      setAnalysis(fileAnalysis);
      setShow(true);
      window.scrollTo(0, 0);
      return;
    }
  };

  return (
    <Layout>
      <AnalysisModal show={show} setShow={setShow} analysis={analysis} />
      {loading ? (
        <Loading />
      ) : (
        <div className="w-full flex flex-col items-center p-12 space-y-6">
          <p className="text-4xl tex-while text-center text-white">
            {file.title}
          </p>
          <div className="w-full flex flex-row justify-center space-x-6">
            <button
              onClick={convertFile}
              className="bg-green-500 px-8 py-2 rounded-md text-xl text-white hover:bg-green-400"
            >
              {'Convert & analyze'}
            </button>
          </div>
          <div className="w-full flex flex-row items-start justify-center">
            <button
              className="text-6xl text-green-500 cursor-pointer transform hover:scale-110 duration-100 m-12"
              onClick={handleLeftClick}
            >
              <FiArrowLeftCircle />
            </button>
            <div className="flex flex-col items-center rounded-md">
              <div className="w-full flex justify-center items-center bg-green-500 rounded-t-md text-white text-xl py-2">
                Page {pageNumber} of {numPages}
              </div>
              <Document
                file={file.url}
                onLoadSuccess={onDocumentLoadSuccess}
                loading={Loading}
              >
                <Page pageNumber={pageNumber} />
              </Document>
            </div>
            <button
              className="text-6xl text-green-500 cursor-pointer transform hover:scale-110 duration-100 m-12"
              onClick={handleRightClick}
            >
              <FiArrowRightCircle />
            </button>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default Doc;
