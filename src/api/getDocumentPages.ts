interface GetDocumentPagesOptions {
  scale?: number;
  url: string;
  onPageComplete: (pageIndex: number, url: string) => void;
  onFinished: () => void
}

export default async ({
  scale = 1,
  url,
  onPageComplete,
  onFinished,
}: GetDocumentPagesOptions) => {
  const PDFJS = window.pdfjsLib;

  // First, we need to load the document using the getDocument utility
  const loadingTask = PDFJS.getDocument(url);
  const pdf = await loadingTask.promise;

  const { numPages } = pdf;

  const canvasPromises = [];

  // Now for every page in the document, we're going to add a page to the array
  for (let i = 0; i < numPages; i++) {
    const pageIndex = i;
    const page = await pdf.getPage(i + 1);

    const viewport = page.getViewport({ scale });
    const { width, height } = viewport;
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    canvas.className = 'page'
    canvasPromises.push(
      page.render({
        canvasContext: canvas.getContext('2d'),
        viewport
      }).then(() => {
        onPageComplete(pageIndex, canvas.toDataURL());
      })
    )
  }

  await Promise.all(canvasPromises);
  onFinished();
}