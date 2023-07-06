import { useCallback, useEffect, useState } from "react";
import axiosClient from "../../config/axiosClient";
import { Event } from "../../types/Event";
import EventItem from "../../components/EventItem/EventItem";
import EventForm from "../../components/EventForm/EventForm";
import DeleteModal from "../../components/DeleteModal/DeleteModal";
import Layout from "../../components/Layout/Layout";
import Button from "../../components/Button/Button";
import styles from "./EventList.module.css";

type Sort = "asc" | "desc";

type ShowModal = {
  show: boolean;
  type?: "Form" | "Delete";
};

const EventList = () => {
  // TODO: page pagination
  const [events, setEvents] = useState<Event[]>([]);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [sort, setSort] = useState<Sort>("asc");
  const [showModal, setShowModal] = useState<ShowModal>({
    show: false,
  });
  const [id, setId] = useState("");

  const pageSize = 10;

  const getEvents = useCallback(async () => {
    try {
      const { data: events } = await axiosClient.get<Event[]>(
        `/events?pageNumber=${pageNumber}&pageSize=${pageSize}&sort=${sort}`
      );
      console.log({ events });
      setEvents(events);
    } catch (error) {
      console.log(error);
    }
  }, [pageNumber, pageSize, sort]);

  const onCloseModal = async (update?: boolean) => {
    if (update) {
      await getEvents();
    }

    setShowModal({
      show: false,
    });
  };

  const handleShowModal = (id: string, modal: ShowModal) => {
    setId(id);
    setShowModal(modal);
  };

  useEffect(() => {
    if (!events.length) {
      getEvents();
    }
  }, [events, getEvents]);

  return (
    <Layout>
      {events?.length > 0 ? (
        <div className={styles.eventList}>
          {events.map((event) => {
            const { id } = event;
            return (
              <EventItem
                key={id}
                event={event}
                onDelete={() =>
                  handleShowModal(id, { show: true, type: "Delete" })
                }
                onEdit={() => handleShowModal(id, { show: true, type: "Form" })}
              />
            );
          })}
        </div>
      ) : (
        <p className={styles.noEvents}> No Events</p>
      )}

      <Button
        label="Create new event"
        primary
        onClick={() => handleShowModal("", { show: true, type: "Form" })}
      />

      {showModal.show && showModal.type === "Form" && (
        <EventForm onClose={onCloseModal} id={id} />
      )}

      {showModal.show && showModal.type === "Delete" && (
        <DeleteModal id={id} onClose={onCloseModal} />
      )}
    </Layout>
  );
};

export default EventList;
