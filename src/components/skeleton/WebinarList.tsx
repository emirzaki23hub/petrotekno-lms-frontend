import { Skeleton } from "../ui/skeleton";

const WebinarList = () => {
  return (
    <div className="h-auto rounded-m flex gap-4 flex-col">
      <div className="flex bg-white flex-col border border-[#E4E6E8] drop-shadow-md rounded-m">
        <div className="flex max-lg:flex-col rounded-m gap-2 justify-between font-mono lg:items-center">
          <div className="flex max-lg:flex-col gap-2">
            <Skeleton className="h-[104px] lg:w-[161px] lg:h-[104px] w-full rounded-l-m" />
            <div className="flex flex-col gap-4 justify-center max-lg:px-4">
              <Skeleton className="h-6 w-3/4 rounded" />
              <Skeleton className="h-4 w-1/2 rounded" />
            </div>
          </div>
          <div className="lg:pr-4 max-lg:p-4">
            <Skeleton className="h-[56px] w-[133px] rounded-m" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WebinarList;
