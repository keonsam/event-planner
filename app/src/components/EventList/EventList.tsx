import { useEffect, useState } from "react";
import axiosClient from "../../config/axiosClient";
import { Event } from "../../types/Event";

type Sort = "asc" | "desc";

const EventList = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [sort, setSort] = useState<Sort>("asc");
  const pageSize: number = 10;

  useEffect(() => {
    const getEvents = async () => {
      try {
        const { data: events } = await axiosClient.get<Event[]>("/events");
        setEvents(events);
      } catch (error) {
        console.log(error);
      }
    };

    getEvents();
  });
  return <div>
    {events?length && events.map((event)=> {

    })}
  </div>;
};

export default EventList;
