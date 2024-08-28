import React, { useState, useEffect } from "react";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { restDashboard } from "@/rest/dashboard";
import { useDomainHelper } from "@/hooks/useDomainHelper";
import AgendaItemSkeleton from "@/components/skeleton/AgendaItemSkeleton";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

interface AgendaItem {
  time: string;
  activity: string;
}

const AgendaItemComponent: React.FC<AgendaItem> = ({ activity, time }) => (
  <div className="bg-warning-50 border border-warning-400 font-mono flex gap-4 rounded-m p-4">
    <div className="border-warning-400 border-l-4"></div>
    <div className="flex flex-col gap-1 items-start">
      <div className="text-sm font-bold ">{activity}</div>
      <div className="text-xs text-neutral-400 leading-5 ">{time}</div>
    </div>
  </div>
);

const SectionAgenda: React.FC = () => {
  const [date, setDate] = useState<Date>(new Date());
  const [agendaItems, setAgendaItems] = useState<AgendaItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { getPartBeforeDot } = useDomainHelper();
  const partBeforeDot = getPartBeforeDot();

  useEffect(() => {
    const fetchAgendaItems = async () => {
      setLoading(true);
      setError(null);

      try {
        const token = localStorage.getItem("authToken");

        if (!token) {
          throw new Error("No authentication token found. Please log in.");
        }

        const response = await restDashboard.getAgendaList(
          token,
          partBeforeDot
        );

        if (response.data?.data) {
          const formattedDate = format(date, "yyyy-MM-dd");
          const agendaForDate = response.data.data.find(
            (item: { date: string }) => item.date === formattedDate
          );

          if (agendaForDate && agendaForDate.agenda) {
            setAgendaItems(
              agendaForDate.agenda.map((agendaItem: AgendaItem) => ({
                activity: agendaItem.activity,
                time: agendaItem.time,
              }))
            );
          } else {
            setAgendaItems([]);
          }
        }
      } catch (err) {
        setError("Failed to fetch agenda items. Please try again later.");
        console.error("Error fetching agenda items:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAgendaItems();
  }, [date]);

  return (
    <div className="bg-white h-full rounded-m flex gap-4 flex-col p-4">
      <div className="text-[20px] leading-6 pb-4 font-bold border-[#E4E6E8] border-b flex items-start justify-start">
        Agenda
      </div>
      <div className="grid grid-cols-2 max-lg:grid-cols-1 gap-6">
        <Calendar
          mode="single"
          selected={date}
          onSelect={(newDate) => newDate && setDate(newDate)}
          className="w-full"
        />
        <ScrollArea className="lg:h-[360px] pr-5">
          <div className="flex flex-col gap-4">
            {loading ? (
              <>
                <AgendaItemSkeleton />
                <AgendaItemSkeleton />
                <AgendaItemSkeleton />
              </>
            ) : error ? (
              <div className="text-center text-red-500">{error}</div>
            ) : agendaItems.length > 0 ? (
              agendaItems.map((item: AgendaItem, index: number) => (
                <AgendaItemComponent key={index} {...item} />
              ))
            ) : (
              <div className="text-center text-neutral-400">
                No agenda items for this date.
              </div>
            )}
          </div>
          <ScrollBar />
        </ScrollArea>
      </div>
    </div>
  );
};

export default SectionAgenda;
