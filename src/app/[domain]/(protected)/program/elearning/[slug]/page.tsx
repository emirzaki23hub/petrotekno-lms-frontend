"use client";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import IconPdf from "@/components/icons/IconPdf";
import { cn } from "@/lib/utils";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { Elearning } from "@/types";
import { restElearning } from "@/rest/elearning";
import { useDomainHelper } from "@/hooks/useDomainHelper";

const PdfViewer = dynamic(() => import("@/components/PdfViewer"), {
  ssr: false,
  loading: () => <p>Loading...</p>,
});

export default function Page({ params }: { params: { slug: string } }) {
  const [webinar, setWebinar] = useState<Elearning | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentSession, setCurrentSession] = useState<number>(1); // Default to session 1

  const { getPartBeforeDot } = useDomainHelper();
  const partBeforeDot = getPartBeforeDot();

  const router = useRouter();

  useEffect(() => {
    const fetchWebinar = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("authToken");

        if (!token) {
          throw new Error("No authentication token found. Please log in.");
        }

        const response = await restElearning.getElearningDetail(
          params.slug,
          token,
          partBeforeDot
        );

        if (response?.data?.success) {
          const webinarData = response.data.data || null;

          setWebinar(webinarData);
        } else {
          throw new Error("Failed to fetch webinar.");
        }
      } catch (error) {
        setError("An unexpected error occurred. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchWebinar();
  }, [params.slug, partBeforeDot]);

  useEffect(() => {
    if (webinar) {
      const sessionSlug = params.slug.split("/").pop(); // Get the last part of the URL
      const sessionIndex = webinar.sessions.data.findIndex(
        (session) =>
          session.title.toLowerCase().replace(/\s+/g, "-") === sessionSlug
      );
      if (sessionIndex !== -1) {
        setCurrentSession(sessionIndex + 1);
      }
    }
  }, [params.slug, webinar]);

  const handleReadButtonClick = async (sessionIndex: number) => {
    setCurrentSession(sessionIndex + 1);

    if (webinar) {
      const sessionId = webinar.sessions.data[sessionIndex].id;
      const token = localStorage.getItem("authToken");

      if (token) {
        try {
          await restElearning.putParticipantRead(
            params.slug,
            sessionId,
            token,
            partBeforeDot
          );
          // Optionally, you can update the local state to reflect that this session has been read
          const updatedWebinar = { ...webinar };
          updatedWebinar.sessions.data[sessionIndex].read_at =
            new Date().toISOString();
          setWebinar(updatedWebinar);
        } catch (error) {
          console.error("Failed to mark session as read:", error);
        }
      } else {
        console.error("No auth token found");
      }
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <p className="text-red-500 mb-4">{error}</p>
        <Button onClick={() => router.push("/program/elearning")}>
          Back to E-Learning
        </Button>
      </div>
    );
  }

  if (!webinar) {
    return (
      <div className="flex justify-center items-center h-screen">
        No webinar data available.
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-9">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/program">Program</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/program/elearning">
              E-Learning
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href={`/program/elearning/${params.slug}`}>
              Production Operations Training
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage className="text-primary-500 font-bold">
              Session - {currentSession}
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="flex gap-4 items-center">
        <Button
          onClick={() => router.back()}
          className="h-10 w-10 bg-[#E4E6E] border-black border"
        >
          <svg
            width="8"
            height="12"
            viewBox="0 0 8 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M7.24829 0.351588C7.47325 0.576621 7.59963 0.881791 7.59963 1.19999C7.59963 1.51818 7.47325 1.82335 7.24829 2.04839L3.29669 5.99999L7.24829 9.95159C7.46688 10.1779 7.58783 10.481 7.5851 10.7957C7.58236 11.1103 7.45616 11.4113 7.23367 11.6338C7.01118 11.8563 6.71021 11.9825 6.39557 11.9852C6.08093 11.9879 5.77781 11.867 5.55149 11.6484L0.75149 6.84839C0.526525 6.62335 0.400146 6.31818 0.400146 5.99999C0.400146 5.68179 0.526525 5.37662 0.75149 5.15159L5.55149 0.351588C5.77652 0.126623 6.08169 0.000244141 6.39989 0.000244141C6.71809 0.000244141 7.02326 0.126623 7.24829 0.351588Z"
              fill="#474E53"
            />
          </svg>
        </Button>
        <h1 className="text-[34px] leading-9 font-bold">
          Session - {currentSession}
        </h1>
      </div>
      {webinar?.sessions.data[currentSession - 1]?.type === "VIDEO" ? (
        <iframe
          width="100%"
          height="500"
          src={`https://www.youtube.com/embed/${
            webinar.sessions.data[currentSession - 1].video_url
          }`}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      ) : (
        <PdfViewer
          url={webinar?.sessions.data[currentSession - 1]?.file_url || ""}
        />
      )}
      <div className="flex gap-6 max-lg:flex-col">
        <div className="w-full p-6 bg-white rounded-m flex flex-col gap-4">
          <div className="text-[20px] leading-6 font-bold border-[#E4E6E8] border-b h-10">
            List
          </div>
          <div className="flex flex-col gap-4 font-mono">
            {webinar?.sessions.data.map((session, index) => (
              <div key={index} className="min-h-12 flex justify-between gap-2">
                <div className={cn("flex gap-6 items-center text-neutral-100")}>
                  <div
                    className={cn(
                      "py-3 px-[15px] rounded-full bg-neutral-100 text-neutral-400",
                      session.read_at && "bg-success-500 text-white"
                    )}
                  >
                    <IconPdf />
                  </div>
                  <div className="flex flex-col gap-1">
                    <div
                      className={cn(
                        "text-base text-neutral-800 font-bold",
                        session.read_at && "text-success-500"
                      )}
                    >
                      {session.title}
                    </div>
                    {/* <span
                      className={cn(
                        "text-xs leading-4 text-neutral-400 break-words",
                        session.read_at && "text-success-500"
                      )}
                    >
                      {session.file_url.split("/").pop() || ""}
                    </span> */}
                  </div>
                </div>
                <Button
                  variant="outline"
                  className="rounded-m border-neutral-500 border-2 text-sm font-bold px-6 py-2.5 min-w-20"
                  size="icon"
                  onClick={() => handleReadButtonClick(index)}
                >
                  Read
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
