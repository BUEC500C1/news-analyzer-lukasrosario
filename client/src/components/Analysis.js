import React from 'react';
import Modal from './Modal';

export const AnalysisModal = ({
  show,
  setShow,
  analysis: { summary, keywords }
}) => {
  return (
    <Modal show={show} setShow={setShow}>
      <div className="w-full h-full flex flex-col items-center justify-center">
        <p className="text-2xl text-white mb-2">Article Summary</p>
        <div className="bg-gray-700 w-96 max-h-64 overflow-y-auto border-2 rounded-md border-green-500 text-white px-4 py-2 mb-6">
          {summary}
        </div>
        <p className="text-2xl text-white mb-2">Article Keywords</p>
        <div className="w-full flex flex-row flex-wrap justify-center">
          {keywords.map(
            (keyword, index) =>
              keyword.length < 21 && (
                <p
                  key={index}
                  className="bg-green-500 text-white h-10 flex items-center justify-center overflow-hidden px-8 rounded-md max-w-sm m-2"
                >
                  {keyword}
                </p>
              )
          )}
        </div>
      </div>
    </Modal>
  );
};

export default AnalysisModal;
