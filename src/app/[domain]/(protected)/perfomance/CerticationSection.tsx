"use client";
import React from "react";
import CertificationCard from "./CertificationCard";
import { Certification } from "@/types";
import { useDomainHelper } from "@/hooks/useDomainHelper";
import { getCertificaiton } from "@/rest/perfomance";
import { cn } from "@/lib/utils";

const CerticationSection = () => {
  const [trainings, setTrainings] = React.useState<Certification[]>([]);
  const [loading, setLoading] = React.useState(true);

  const { getPartBeforeDot } = useDomainHelper();
  const partBeforeDot = getPartBeforeDot();

  React.useEffect(() => {
    const loadData = async () => {
      try {
        const token = localStorage.getItem("authToken");

        if (!token) {
          throw new Error("No authentication token found. Please log in.");
        }

        setLoading(true);

        const response = await getCertificaiton(token, partBeforeDot);
        const data = response?.data?.data;

        if (!Array.isArray(data)) {
          console.error("Training data is not an array");
          setTrainings([]);
          return;
        }

        setTrainings(data);
      } catch (error) {
        console.error("Fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [partBeforeDot]);

  return (
    <div className="p-6 bg-white rounded-m flex flex-col gap-4">
      <div className="text-[20px] leading-6 font-bold border-[#E4E6E8] border-b h-10">
        Certification Obtain{" "}
      </div>

      <div className={cn("flex flex-col \ p-6",
        trainings.length === 0 && 'items-center justify-center'
      )}>
        {trainings.length > 0 ? (
          <div className="grid grid-cols-4 max-lg:grid-cols-1 gap-2">
            {trainings.map((cert, index) => (
              <div
                key={cert.title}
                className="flex border border-[#E4E6E8] p-6 rounded-m flex-col gap-4 justify-center items-center">
                <CertificationCard
                  index={index}
                  title={cert.title}
                  imageSrc={cert.icon_url}
                  download={cert.download_url}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-lg text-neutral-800">
            No certifications available at the moment.
          </div>
        )}
      </div>
    </div>
  );
};

export default CerticationSection;
