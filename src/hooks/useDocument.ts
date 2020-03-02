import { useState, useEffect } from 'react';
import getDocumentPages from '../api/getDocumentPages';
import useGlobalState from '../state/useGlobalState';

export default ({
  url
}) => {
  const [pages, setPages] = useState<string[]>([]);
  const [zoom] = useGlobalState('zoom');

  useEffect(() => {
    getDocumentPages({
      url,
      scale: zoom,
      onPageComplete: (index, url) => {
        setPages(old => {
          const clone = [...old];
          clone[index] = url;
          return clone;
        })
      },
      onFinished: () => { /*TODO*/ }
    });
  }, [url, zoom])

  return {
    pages
  }
}