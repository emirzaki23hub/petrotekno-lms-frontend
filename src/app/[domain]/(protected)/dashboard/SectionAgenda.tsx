import React, { useState, useMemo } from "react";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";

interface AgendaItem {
  title: string;
  time: string;
}

type AgendaItems = {
  [date: string]: AgendaItem[];
};

const mockAgendaItems: AgendaItems = {
  "2024-08-05": [
    { title: "Production Operations: Test Module 24", time: "09:00 AM" },
    { title: "Team Meeting", time: "02:00 PM" },
  ],
  "2024-08-06": [{ title: "Client Presentation", time: "10:30 AM" }],
};

const AgendaItem: React.FC<AgendaItem> = ({ title, time }) => (
  <div className="bg-warning-50 border border-warning-400 font-mono flex gap-4 rounded-m p-4">
    <div className="border-warning-400 border-l-4"></div>
    <div className="flex flex-col gap-1 items-start">
      <div className="text-sm font-bold ">{title}</div>
      <div className="text-xs text-neutral-400 leading-5 ">{time}</div>
    </div>
  </div>
);

const SectionAgenda: React.FC = () => {
  const [date, setDate] = useState<Date>(new Date());

  const agendaItems = useMemo(() => {
    const formattedDate = format(date, "yyyy-MM-dd");
    return mockAgendaItems[formattedDate] || [];
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

        <div className="flex flex-col gap-4">
          {agendaItems.length > 0 ? (
            agendaItems.map((item: AgendaItem, index: number) => (
              <AgendaItem key={index} title={item.title} time={item.time} />
            ))
          ) : (
            <div className="text-center text-neutral-400">
              No agenda items for this date.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SectionAgenda;
