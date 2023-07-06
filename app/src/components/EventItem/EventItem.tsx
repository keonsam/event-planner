import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Event } from "../../types/Event";
import styles from "./EventItem.module.css";
import {
  faCalendar,
  faLocationDot,
  faPencil,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";

type Props = {
  event: Event;
  onDelete: () => void;
  onEdit: () => void;
};
const EventItem = ({ event, onDelete, onEdit }: Props) => {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <h2 className={styles.title}>{event.name}</h2>
        <div className={styles.headerIcons}>
          {/* Change to icon buttons */}
          <FontAwesomeIcon
            icon={faPencil}
            className={styles.iconPencil}
            onClick={onEdit}
          />
          <FontAwesomeIcon
            icon={faTrash}
            className={styles.iconTrash}
            onClick={onDelete}
          />
        </div>
      </div>
      <div className={styles.data}>
        <div className={styles.dataPoint}>
          <span className={styles.iconCircle}>
            <FontAwesomeIcon icon={faCalendar} className={styles.icon} />
          </span>
          <p className={styles.dataText}>
            {new Date(event.dateOfEvent).toUTCString()}
          </p>
        </div>
        <div className={styles.dataPoint}>
          <span className={styles.iconCircle}>
            <FontAwesomeIcon icon={faLocationDot} className={styles.icon} />
          </span>
          <p className={styles.dataText}>{event.location}</p>
        </div>
      </div>
      <h3 className={styles.about}>About</h3>
      <p className={styles.description}>{event.description}</p>
    </div>
  );
};

export default EventItem;
