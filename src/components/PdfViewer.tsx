import React, { useEffect, useState, useRef } from "react";
import * as pdfjsLib from "pdfjs-dist";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

interface PdfViewerProps {
  url: string;
}

const PdfViewer: React.FC<PdfViewerProps> = ({ url }) => {
  const [pdfDoc, setPdfDoc] = useState<pdfjsLib.PDFDocumentProxy | null>(null);
  const [pageNum, setPageNum] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  const [currentPageImage, setCurrentPageImage] = useState<string | null>(null);
  const [direction, setDirection] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadPdf = async () => {
      try {
        const loadingTask = pdfjsLib.getDocument({
          url,
          withCredentials: true, // Add this line to include credentials
        });
        const pdf = await loadingTask.promise;
        setPdfDoc(pdf);
        setPageCount(pdf.numPages);
        renderPage(1, pdf, 1);
      } catch (error) {
        console.error("Error loading PDF:", error);
      }
    };

    loadPdf();
  }, [url]);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  useEffect(() => {
    if (pdfDoc) {
      renderPage(pageNum, pdfDoc, 1);
    }
  }, [pageNum, zoomLevel, pdfDoc]);

  const renderPage = async (
    num: number,
    pdf: pdfjsLib.PDFDocumentProxy,
    scale: number
  ) => {
    const page = await pdf.getPage(num);
    const viewport = page.getViewport({ scale: scale * zoomLevel });

    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    canvas.height = viewport.height;
    canvas.width = viewport.width;

    const renderContext = {
      canvasContext: context!,
      viewport: viewport,
    };

    await page.render(renderContext).promise;
    setCurrentPageImage(canvas.toDataURL());
  };

  const nextPage = () => {
    if (pageNum < pageCount) {
      setDirection(1);
      setPageNum((prevPageNum) => prevPageNum + 1);
    }
  };

  const prevPage = () => {
    if (pageNum > 1) {
      setDirection(-1);
      setPageNum((prevPageNum) => prevPageNum - 1);
    }
  };

  const printPdf = () => {
    if (url) {
      const printWindow = window.open(url, "_blank");

      if (printWindow) {
        printWindow.onload = () => {
          printWindow.print();
        };
      }
    } else {
      console.error("PDF URL is not provided.");
    }
  };

  const downloadPdf = () => {
    const link = document.createElement("a");
    link.href = url;
    link.download = "document.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  const zoomIn = () => {
    setZoomLevel((prevZoom) => Math.min(prevZoom + 0.2, 3)); // Max zoom 3x
  };

  const zoomOut = () => {
    setZoomLevel((prevZoom) => Math.max(prevZoom - 0.2, 0.5)); // Min zoom 0.5x
  };

  const variants = {
    enter: (direction: number) => ({
      opacity: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
        duration: 0.5,
      },
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
        duration: 0.5,
      },
    },
    exit: (direction: number) => ({
      zIndex: 0,
      opacity: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
        duration: 0.5,
      },
    }),
  };

  return (
    <div
      ref={containerRef}
      className={`relative flex justify-center items-center w-full overflow-hidden bg-[#333639] ${
        isFullscreen ? "h-screen" : "h-[610px]"
      }`}
    >
      <AnimatePresence initial={false} mode="popLayout" custom={direction}>
        <motion.img
          key={pageNum}
          src={currentPageImage || ""}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          style={{ transform: `scale(${zoomLevel})` }}
          exit="exit"
          className={cn(
            "lg:p-5 lg:pt-24   max-h-full object-contain",
            isFullscreen && "max-w-full"
          )}
        />
      </AnimatePresence>

      <div className="absolute drop-shadow-2xl bg-[#333639] w-full justify-between items-center border-white top-0 right-0 p-5 flex">
        <div className="text-white max-lg:text-xs text-lg font-semibold">
          YourFileName.pdf
        </div>

        <div className="text-white text-lg font-semibold">
          {pageNum} / {pageCount}
        </div>

        {/* Action Buttons on the Right */}
        <div className="flex gap-2 lg:gap-5">
          {/* Print PDF Button */}
          <button
            onClick={printPdf}
            className="z-10 text-white rounded-full shadow-lg  transition-colors"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_2248_6618)">
                <path
                  d="M19 8H5C3.34 8 2 9.34 2 11V17H6V21H18V17H22V11C22 9.34 20.66 8 19 8ZM16 19H8V14H16V19ZM19 12C18.45 12 18 11.55 18 11C18 10.45 18.45 10 19 10C19.55 10 20 10.45 20 11C20 11.55 19.55 12 19 12ZM18 3H6V7H18V3Z"
                  fill="white"
                />
              </g>
              <defs>
                <clipPath id="clip0_2248_6618">
                  <rect width="24" height="24" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </button>

          {/* Download PDF Button */}
          <button
            onClick={downloadPdf}
            className="text-white rounded-full shadow-lg transition-colors"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M14 11V14H2V11H0V14C0 15.1 0.9 16 2 16H14C15.1 16 16 15.1 16 14V11H14ZM13 7L11.59 5.59L9 8.17V0H7V8.17L4.41 5.59L3 7L8 12L13 7Z"
                fill="white"
              />
            </svg>
          </button>

          <button
            onClick={toggleFullscreen}
            className="text-white rounded-full shadow-lg  transition-colors"
          >
            {isFullscreen ? (
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="white"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 19V15H5M19 9V5H15M5 9V5H9M15 19V15H19"
                  />
                </svg>
              </span>
            ) : (
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="white"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M16 4h4v4M4 4h4v4M4 16h4v4M16 16h4v4"
                  />
                </svg>
              </span>
            )}
          </button>
          <button
            onClick={zoomOut}
            className="text-white rounded-full shadow-lg  transition-colors"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M15 13H9v-2h6v2z" fill="currentColor" />
              <path
                d="M15.2 15.2a6.5 6.5 0 1 0-1.4 1.4l4.5 4.5a1 1 0 0 0 1.4-1.4l-4.5-4.5zM12 14a5 5 0 1 1 0-10 5 5 0 0 1 0 10z"
                fill="currentColor"
              />
            </svg>
          </button>

          <button
            onClick={zoomIn}
            className="text-white rounded-full shadow-lg  transition-colors"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15 11h-4V7h-2v4H7v2h4v4h2v-4h4v-2z"
                fill="currentColor"
              />
              <path
                d="M15.2 15.2a6.5 6.5 0 1 0-1.4 1.4l4.5 4.5a1 1 0 0 0 1.4-1.4l-4.5-4.5zM12 14a5 5 0 1 1 0-10 5 5 0 0 1 0 10z"
                fill="currentColor"
              />
            </svg>
          </button>
        </div>
      </div>

      <button
        onClick={prevPage}
        className="absolute left-4 z-10 top-1/2 transform -translate-y-1/2 bg-[#FFFFFF] text-white h-12 w-12  flex justify-center items-center rounded-m shadow-lg hover:bg-opacity-70 transition-colors"
        disabled={pageNum <= 1}
      >
        <svg
          className="rotate-180" // Rotate the SVG 180 degrees
          width="17"
          height="28"
          viewBox="0 0 17 28"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M16.1705 13.2601L2.91049 0.40013C2.08049 -0.40187 0.500488 0.084131 0.500488 1.14013V26.8601C0.500488 27.9161 2.08049 28.4021 2.91049 27.6001L16.1705 14.7401C16.2742 14.6467 16.357 14.5326 16.4138 14.4051C16.4705 14.2776 16.4998 14.1397 16.4998 14.0001C16.4998 13.8606 16.4705 13.7226 16.4138 13.5951C16.357 13.4677 16.2742 13.3535 16.1705 13.2601Z"
            fill="#919BA2"
          />
        </svg>
      </button>

      <button
        onClick={nextPage}
        className="absolute right-4 z-10 top-1/2 transform -translate-y-1/2 bg-[#FFFFFF] text-white h-12 w-12  flex justify-center items-center rounded-m shadow-lg hover:bg-opacity-70 transition-colors"
        disabled={pageNum >= pageCount}
      >
        <svg
          width="17"
          height="28"
          viewBox="0 0 17 28"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M16.1705 13.2601L2.91049 0.40013C2.08049 -0.40187 0.500488 0.084131 0.500488 1.14013V26.8601C0.500488 27.9161 2.08049 28.4021 2.91049 27.6001L16.1705 14.7401C16.2742 14.6467 16.357 14.5326 16.4138 14.4051C16.4705 14.2776 16.4998 14.1397 16.4998 14.0001C16.4998 13.8606 16.4705 13.7226 16.4138 13.5951C16.357 13.4677 16.2742 13.3535 16.1705 13.2601Z"
            fill="#919BA2"
          />
        </svg>
      </button>
    </div>
  );
};

export default PdfViewer;
