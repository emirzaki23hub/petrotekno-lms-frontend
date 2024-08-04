import { Button } from "@/components/ui/button";
import Image from "next/image";

interface CertificationCardProps {
  title: string;
  imageSrc: string;
  key: number;
}

const CertificationCard: React.FC<CertificationCardProps> = ({
  title,
  imageSrc,
  key,
}) => (
  <div
    key={key}
    className="flex border border-[#E4E6E8] p-6 rounded-m flex-col gap-4 justify-center items-center"
  >
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
    <Button className="h-[56px] rounded-m bg-secondary-500 text-white text-base">
      Download Certification
    </Button>
  </div>
);

export default CertificationCard;
