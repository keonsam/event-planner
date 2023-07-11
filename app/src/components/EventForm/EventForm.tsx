import { FormEvent, useEffect, useState } from "react";
import Modal from "../Modal/Modal";
import styles from "./EventForm.module.css";
import axiosClient from "../../config/axiosClient";
import { Event } from "../../types/Event";
import TextField from "../TextField/TextField";
import Button from "../Button/Button";
import { eventFormSchema } from "../../types/schema";
import TextArea from "../TextArea/TextArea";
import { AxiosError } from "axios";

type FieldName = "name" | "description" | "dateOfEvent" | "location";

type EventData = {
  name: string;
  description: string;
  dateOfEvent: string;
  location: string;
};

type EventError = Partial<
  EventData & { formError: string; [key: string]: string }
>;

type Props = {
  id: string;
  onClose: (update?: boolean) => void;
};

const EventForm = ({ id, onClose }: Props) => {
  const [eventData, setEventData] = useState<EventData>({
    name: "",
    dateOfEvent: new Date().toISOString(),
    description: "",
    location: "",
  });

  const [error, setError] = useState<EventError>({});

  // event handles
  const handleChange = (fieldName: FieldName, value: string) => {
    const message =
      eventFormSchema[fieldName].validate(eventData[fieldName]).error
        ?.details[0].message || "";

    setEventData({
      ...eventData,
      [fieldName]: value,
    });

    setError({
      ...error,
      [fieldName]: message,
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
      if (err instanceof AxiosError) {
        setError({
          ...error,
          formError: err.message,
        });
      }
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
      } catch (err) {
        if (err instanceof AxiosError) {
          setError({
            ...error,
            formError: err.message,
          });
        }
      }
    };

    if (id && !eventData.name) {
      getEvent();
    }
  }, [id, eventData.name, error]);

  const isValid =
    !!eventData.name &&
    !!eventData.dateOfEvent &&
    !!eventData.description &&
    !!eventData.location &&
    !error.name &&
    !error.dateOfEvent &&
    !error.description &&
    !error.location;

  return (
    <Modal>
      <form onSubmit={handleSubmit}>
        <h2 className={styles.title}>{id ? "Edit" : "Create"} Event</h2>
        <TextField
          label="Name"
          id="eventName"
          value={eventData.name}
          onChange={(value) => handleChange("name", value)}
          error={error.name}
        />

        <TextField
          label="Event Date"
          id="eventDate"
          value={eventData.dateOfEvent.slice(0, 16)}
          onChange={(value) =>
            handleChange("dateOfEvent", new Date(value).toISOString())
          }
          error={error.dateOfEvent}
          type="datetime-local"
        />

        <TextField
          label="Location"
          id="location"
          value={eventData.location}
          onChange={(value) => handleChange("location", value)}
          error={error.location}
        />

        <TextArea
          label="Description"
          id="description"
          onChange={(value) => handleChange("description", value)}
          value={eventData.description}
          required
          error={error.description}
        />

        <p className={styles.formError}>{error.formError && error.formError}</p>

        <div className={styles.buttonContainer}>
          <Button label="Cancel" size="medium" onClick={() => onClose()} />
          <Button
            label={id ? "Save" : "Create"}
            size="medium"
            primary
            type="submit"
            disabled={!isValid}
          />
        </div>
      </form>
    </Modal>
  );
};

export default EventForm;
