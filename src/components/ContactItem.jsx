import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import axios from "axios";

import { Tooltip } from "react-tooltip";
import {
  MdOutlineAlternateEmail,
  MdDeleteOutline,
  MdOutlinePhoneAndroid,
} from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";

import { ContactContext } from "../context/Dispatcher";
import { showToast } from "../utils/helpers";
import { deleteContact, toggleSelectContact } from "../actions/ContactActions";
import Modal from "./Modal";

import styles from "../styles/ContactItem.module.css";

function ContactItem({ contact: { firstName, lastName, email, phone, id } }) {
  const {
    state: { selectedContacts },
    dispatch,
  } = useContext(ContactContext);
  const [isShowModal, setIsShowModal] = useState(false);
  const isSelected = selectedContacts.includes(id);
  const confirmDeleteHandler = async () => {
    try {
      await axios.delete(`http://localhost:8000/contacts/${id}`);
      dispatch(deleteContact(id));
      showToast("Contact deleted successfully!");
    } catch (error) {
      showToast("Failed to delete contact!", "error");
    }
  };
  const deleteHandler = () => {
    setIsShowModal(true);
  };
  return (
    <li className={styles.item}>
      <p>{`${firstName} ${lastName}`}</p>
      <p>
        <span>
          <MdOutlineAlternateEmail />
        </span>
        {email}
      </p>
      <p>
        <span>
          <MdOutlinePhoneAndroid />
        </span>
        {phone}
      </p>
      <div>
        <Link to={`edit-contact/${id}`}>
          <FaRegEdit
            data-tooltip-id="edit-contact-tooltip"
            data-tooltip-content="Edit contact"
            className={styles.edit_icon}
          />
        </Link>
        <Tooltip place="top" id="edit-contact-tooltip" variant="info" />
        <button onClick={deleteHandler} className={styles.button}>
          <MdDeleteOutline
            data-tooltip-id="delete-tooltip"
            className={styles.delete_icon}
            data-tooltip-content="Delete contact"
          />
        </button>
        <Tooltip
          place="top"
          id="delete-tooltip"
          style={{ backgroundColor: "#e60023" }}
        />
        <input
          type="checkbox"
          checked={isSelected}
          onChange={() => dispatch(toggleSelectContact(id))}
        />
      </div>
      {isShowModal && (
        <Modal
          message="Are you sure you want to delete contact?"
          onConfirm={confirmDeleteHandler}
          onCancel={() => setIsShowModal(false)}
        />
      )}
    </li>
  );
}

export default ContactItem;
