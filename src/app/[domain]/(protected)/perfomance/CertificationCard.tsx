import { Button } from "@/components/ui/button";
import Image from "next/image";

interface CertificationCardProps {
  title: string;
  imageSrc: string;
  index: number;
}

const CertificationCard: React.FC<CertificationCardProps> = ({
  title,
  imageSrc,
  index,
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
    <Button className="h-[56px] rounded-m bg-secondary-500 text-white text-base">
      Download Certification
    </Button>
  </>
);

export default CertificationCard;
