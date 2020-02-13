import { useState, useEffect } from 'react';
import getDocumentPages from '../api/getDocumentPages';

export default ({
  url
}) => {
  const [pages, setPages] = useState<string[]>([]);
  useEffect(() => {
    const getPages = async () => {
      const canvases = await getDocumentPages({
        url
      });

      setPages(canvases);
    }
    getPages();
  }, [url])
  return {
    pages
  }
}