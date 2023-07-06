import Modal from "../Modal/Modal";
import styles from "./DeleteModal.module.css";
import axiosClient from "../../config/axiosClient";
import Button from "../Button/Button";

type Props = {
  id: string;
  onClose: (update?: boolean) => void;
};

const DeleteModal = ({ id, onClose }: Props) => {
  const handleDelete = async () => {
    try {
      const { data: result } = await axiosClient.delete(`/events/${id}`);

      if (result) {
        onClose(true);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Modal>
      <div className={styles.container}>
        <h2>Confirm Event Deletion</h2>
        <div className={styles.buttonContainer}>
          <Button label="Cancel" size="medium" onClick={() => onClose()} />
          <Button
            label="Confirm"
            size="medium"
            primary
            onClick={handleDelete}
          />
        </div>
      </div>
    </Modal>
  );
};

export default DeleteModal;
