import { Button } from "@/components/ui/button";
import Image from "next/image";

interface CertificationCardProps {
  title: string;
  imageSrc: string;
  index: number;
  download: string; // URL to download the certification
}

const CertificationCard: React.FC<CertificationCardProps> = ({
  title,
  imageSrc,
  download,
}) => (
  <>
    <div className="flex justify-center items-center">
      <Image
        src={imageSrc}
        width={0}
        height={0}
        className="w-full h-full aspect-square"
        sizes="50vw"
        alt={title}
      />
    </div>
    <div className="text-base text-neutral-700 font-bold">{title}</div>
    <a
      href={download}
      download
      rel="noopener noreferrer"
      className="block mt-2">
      <Button className="h-[56px] w-full rounded-m bg-secondary-500 text-white text-base">
        Download Certification
      </Button>
    </a>
  </>
);

export default CertificationCard;
