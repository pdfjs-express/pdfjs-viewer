interface GetDocumentPagesOptions {
  scale?: number;
  url: string
}

export default async ({
  scale = 1,
  url
}: GetDocumentPagesOptions): Promise<Array<string>> => {
  const PDFJS = window.pdfjsLib;

  // First, we need to load the document using the getDocument utility
  const loadingTask = PDFJS.getDocument(url);
  const pdf = await loadingTask.promise;

  const { numPages } = pdf;

  const canvasURLs = [];

  // Now for every page in the document, we're going to add a page to the array
  for (let i = 0; i < numPages; i++) {
    const page = await pdf.getPage(i + 1);

    const viewport = page.getViewport(scale);
    const { width, height } = viewport;
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    canvas.className = 'page'
    await page.render({
      canvasContext: canvas.getContext('2d'),
      viewport
    })

    canvasURLs.push(canvas.toDataURL());
  }

  return canvasURLs;
}