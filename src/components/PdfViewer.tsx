import React, { useEffect, useState, useRef, useCallback } from "react";
import * as pdfjsLib from "pdfjs-dist";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { useDomainHelper } from "@/hooks/useDomainHelper";

pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

interface PdfViewerProps {
  url: string;
  title: string;
}

const PdfViewer: React.FC<PdfViewerProps> = ({ url, title }) => {
  const [pdfDoc, setPdfDoc] = useState<pdfjsLib.PDFDocumentProxy | null>(null);
  const [pageNum, setPageNum] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  const [currentPageImage, setCurrentPageImage] = useState<string | null>(null);
  const [direction, setDirection] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);

  const { getPartBeforeDot } = useDomainHelper();
  const partBeforeDot = getPartBeforeDot();

  const nextPage = useCallback(() => {
    if (pageNum < pageCount) {
      setDirection(1);
      setPageNum((prev) => prev + 1);
    }
  }, [pageNum, pageCount]);

  const prevPage = useCallback(() => {
    if (pageNum > 1) {
      setDirection(-1);
      setPageNum((prev) => prev - 1);
    }
  }, [pageNum]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight" || event.key === "PageDown") nextPage();
      if (event.key === "ArrowLeft" || event.key === "PageUp") prevPage();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [nextPage, prevPage]);

  useEffect(() => {
    const loadPdf = async () => {
      try {
        const loadingTask = pdfjsLib.getDocument({ url });
        const pdf = await loadingTask.promise;
        setPdfDoc(pdf);
        setPageCount(pdf.numPages);
        renderPage(1, pdf);
      } catch (error) {
        console.error("Error loading PDF:", error);
      }
    };
    loadPdf();
  }, [url]);

  useEffect(() => {
    if (pdfDoc) renderPage(pageNum, pdfDoc);
  }, [pageNum, pdfDoc]);

  const renderPage = async (num: number, pdf: pdfjsLib.PDFDocumentProxy) => {
    const page = await pdf.getPage(num);
    const viewport = page.getViewport({ scale: 2 });
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    if (context) {
      canvas.height = viewport.height;
      canvas.width = viewport.width;
      const renderContext = { canvasContext: context, viewport };
      await page.render(renderContext).promise;
      setCurrentPageImage(canvas.toDataURL());
    }
  };

  const zoomIn = () => setZoomLevel((prev) => Math.min(prev + 0.2, 3));
  const zoomOut = () => setZoomLevel((prev) => Math.max(prev - 0.2, 0.5));

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  useEffect(() => {
    const handleFs = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener("fullscreenchange", handleFs);
    return () => document.removeEventListener("fullscreenchange", handleFs);
  }, []);

  const printPdf = () => {
    const printWindow = window.open(url, "_blank");
    if (printWindow) printWindow.onload = () => printWindow.print();
  };

  const downloadPdf = () => {
    const link = document.createElement("a");
    link.href = url;
    link.download = "document.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // ✅ Correct Framer Motion variants
  const variants = {
    enter: (dir: number) => ({
      opacity: 0,
      x: dir > 0 ? "20%" : "-20%",
      scale: zoomLevel,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: zoomLevel,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        scale: { duration: 0.2 },
      },
    },
    exit: (dir: number) => ({
      zIndex: 0,
      opacity: 0,
      x: dir < 0 ? "20%" : "-20%",
      scale: zoomLevel,
      transition: { duration: 0.2 },
    }),
  };

  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `
            .hide-scrollbar::-webkit-scrollbar { display: none; }
            .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
          `,
        }}
      />
      <div
        ref={containerRef}
        className={cn(
          "relative flex justify-center items-center w-full bg-[#333639] overflow-hidden select-none",
          isFullscreen ? "h-screen" : "h-[750px]"
        )}
      >
        <div
          className={cn(
            "w-full h-full flex items-center justify-center p-5 pt-24 hide-scrollbar",
            "overflow-hidden"
          )}
        >
          <AnimatePresence initial={false} mode="popLayout" custom={direction}>
            <motion.img
              key={pageNum}
              src={currentPageImage || ""}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              className="max-h-full max-w-full object-contain shadow-2xl origin-center pointer-events-auto"
              style={{ backfaceVisibility: "hidden" }}
            />
          </AnimatePresence>
        </div>

        {/* Toolbar (unchanged from your code) */}
        <div className="absolute drop-shadow-2xl z-[25] bg-[#333639] w-full justify-between items-center top-0 right-0 p-5 flex border-b border-white/10">
          <div
            dangerouslySetInnerHTML={{ __html: title }}
            className="text-white max-lg:text-xs text-base font-semibold truncate pr-4"
          />
          <div className="text-white text-lg font-semibold shrink-0">
            {pageNum} / {pageCount}
          </div>
          <div className="flex gap-2 lg:gap-5 items-center">
            <button onClick={printPdf} className="text-white hover:text-gray-300 transition-colors">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M19 8H5C3.34 8 2 9.34 2 11V17H6V21H18V17H22V11C22 9.34 20.66 8 19 8ZM16 19H8V14H16V19ZM19 12C18.45 12 18 11.55 18 11C18 10.45 18.45 10 19 10C19.55 10 20 10.45 20 11C20 11.55 19.55 12 19 12ZM18 3H6V7H18V3Z" fill="white" />
              </svg>
            </button>
            {partBeforeDot === "eacop" && (
              <button onClick={downloadPdf} className="text-white hover:text-gray-300 transition-colors">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M14 11V14H2V11H0V14C0 15.1 0.9 16 2 16H14C15.1 16 16 15.1 16 14V11H14ZM13 7L11.59 5.59L9 8.17V0H7V8.17L4.41 5.59L3 7L8 12L13 7Z" fill="white" />
                </svg>
              </button>
            )}
            <button onClick={toggleFullscreen} className="text-white hover:text-gray-300 transition-colors">
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="white">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isFullscreen ? "M9 19V15H5M19 9V5H15M5 9V5H9M15 19V15H19" : "M16 4h4v4M4 4h4v4M4 16h4v4M16 16h4v4"} />
              </svg>
            </button>
            <div className="h-6 w-[1px] bg-white/20 mx-1 lg:mx-2" />
            <button onClick={zoomOut} className="text-white hover:text-gray-300 transition-colors">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M15 13H9v-2h6v2z" fill="currentColor" />
                <path d="M15.2 15.2a6.5 6.5 0 1 0-1.4 1.4l4.5 4.5a1 1 0 0 0 1.4-1.4l-4.5-4.5zM12 14a5 5 0 1 1 0-10 5 5 0 0 1 0 10z" fill="currentColor" />
              </svg>
            </button>
            <button onClick={zoomIn} className="text-white hover:text-gray-300 transition-colors">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M15 11h-4V7h-2v4H7v2h4v4h2v-4h4v-2z" fill="currentColor" />
                <path d="M15.2 15.2a6.5 6.5 0 1 0-1.4 1.4l4.5 4.5a1 1 0 0 0 1.4-1.4l-4.5-4.5zM12 14a5 5 0 1 1 0-10 5 5 0 0 1 0 10z" fill="currentColor" />
              </svg>
            </button>
          </div>
        </div>

        {/* Navigation Buttons */}
        <button
          onClick={prevPage}
          className="absolute left-4 z-20 top-1/2 -translate-y-1/2 bg-white text-white h-12 w-12 flex justify-center items-center rounded shadow-lg hover:bg-opacity-90 transition-all disabled:opacity-0"
          disabled={pageNum <= 1}
        >
          <svg className="rotate-180" width="17" height="28" viewBox="0 0 17 28" fill="none">
            <path d="M16.1705 13.2601L2.91049 0.40013C2.08049 -0.40187 0.500488 0.084131 0.500488 1.14013V26.8601C0.500488 27.9161 2.08049 28.4021 2.91049 27.6001L16.1705 14.7401C16.2742 14.6467 16.357 14.5326 16.4138 14.4051C16.4705 14.2776 16.4998 14.1397 16.4998 14.0001Z" fill="#919BA2" />
          </svg>
        </button>
        <button
          onClick={nextPage}
          className="absolute right-4 z-20 top-1/2 -translate-y-1/2 bg-white text-white h-12 w-12 flex justify-center items-center rounded shadow-lg hover:bg-opacity-90 transition-all disabled:opacity-0"
          disabled={pageNum >= pageCount}
        >
          <svg width="17" height="28" viewBox="0 0 17 28" fill="none">
            <path d="M16.1705 13.2601L2.91049 0.40013C2.08049 -0.40187 0.500488 0.084131 0.500488 1.14013V26.8601C0.500488 27.9161 2.08049 28.4021 2.91049 27.6001L16.1705 14.7401C16.2742 14.6467 16.357 14.5326 16.4138 14.4051C16.4705 14.2776 16.4998 14.1397 16.4998 14.0001Z" fill="#919BA2" />
          </svg>
        </button>
      </div>
    </>
  );
};

export default PdfViewer;