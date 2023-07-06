import { FormEvent, useEffect, useState } from "react";
import Modal from "../Modal/Modal";
import styles from "./EventForm.module.css";
import axiosClient from "../../config/axiosClient";
import { Event } from "../../types/Event";
import TextField from "../TextField/TextField";
import Button from "../Button/Button";

type EventData = {
  name: string;
  description: string;
  dateOfEvent: string;
  location: string;
};

type Props = {
  id: string;
  onClose: (update?: boolean) => void;
};

const EventForm = ({ id, onClose }: Props) => {
  const [eventData, setEventData] = useState<EventData>({
    name: "",
    description: "",
    dateOfEvent: "",
    location: "",
  });

  const handleChange = (fieldName: string, value: string) => {
    setEventData({
      ...eventData,
      [fieldName]: value,
    });
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    try {
      if (id) {
        await axiosClient.put(`/events/${id}`, eventData);
      } else {
        await axiosClient.post("/events", eventData);
      }
      onClose(true);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const getEvent = async () => {
      try {
        const { data: event } = await axiosClient.get<Event>(`/events/${id}`);

        console.log({ event });
        setEventData({
          name: event.name,
          dateOfEvent: event.dateOfEvent,
          description: event.description,
          location: event.location,
        });
      } catch (error) {
        console.log(error);
      }
    };

    if (id && !eventData.name) {
      getEvent();
    }
  }, [id, eventData.name]);

  return (
    <Modal>
      <form className={styles.eventForm} onSubmit={handleSubmit}>
        <h2 className={styles.title}>{id ? "Edit" : "Create"} Event</h2>
        <TextField
          label="Name"
          id="eventName"
          value={eventData.name}
          onChange={(value) => handleChange("name", value)}
        />

        <TextField
          label="Event Date"
          id="eventDate"
          value={eventData.dateOfEvent}
          onChange={(value) => handleChange("eventDate", value)}
          type="date"
        />

        <TextField
          label="Location"
          id="location"
          value={eventData.location}
          onChange={(value) => handleChange("location", value)}
        />

        {/* TODO: Move to component TextArea */}
        <div className={styles.textarea}>
          <label className={styles.label} htmlFor="description">
            Description
          </label>
          <textarea
            id="description"
            className={styles.input}
            onChange={({ target }) => handleChange("description", target.value)}
            value={eventData.description}
          />
        </div>

        <div className={styles.buttonContainer}>
          <Button label="Cancel" size="medium" onClick={() => onClose()} />
          <Button
            label={id ? "Save" : "Create"}
            size="medium"
            primary
            type="submit"
          />
        </div>
      </form>
    </Modal>
  );
};

export default EventForm;
