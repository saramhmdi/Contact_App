import { Link } from "react-router-dom";
import { useContext } from "react";

import { Tooltip } from "react-tooltip";
import {
  MdOutlineAlternateEmail,
  MdDeleteOutline,
  MdOutlinePhoneAndroid,
} from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";

import { ContactContext } from "../context/Dispatcher";

import styles from "../styles/ContactItem.module.css";

function ContactItem({ contact: { firstName, lastName, email, phone, id } }) {
  const {
    state: { selectedContacts },
    dispatch,
  } = useContext(ContactContext);

  const isSelected = selectedContacts.includes(id);

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
        <button
          onClick={() => dispatch({ type: "DELETE_CONTACT", payload: id })}
        >
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
          onChange={() =>
            dispatch({ type: "TOGGLE_SELECT_CONTACT", payload: id })
          }
        />
      </div>
    </li>
  );
}

export default ContactItem;
