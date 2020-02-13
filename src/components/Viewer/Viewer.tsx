import React from 'react';
import useDocument from '../../hooks/useDocument';
import './Viewer.scss';

export default () => {

  const { pages } = useDocument({
    url: "https://pdfjs-express.s3-us-west-2.amazonaws.com/docs/choosing-a-pdf-viewer.pdf"
  });

  return (
    <div className='viewer'>
      {
        pages.map((canvasURL, idx) => {
          return <img src={canvasURL} key={idx} />
        })
      }
    </div>
  )
}