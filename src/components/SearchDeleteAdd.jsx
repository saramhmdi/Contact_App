import { Link } from "react-router-dom";
import { useState, useContext } from "react";

import { Tooltip } from "react-tooltip";
import { MdDeleteOutline, MdAddCircleOutline } from "react-icons/md";

import { ContactContext } from "../context/Dispatcher";

import styles from "../styles/SearchDeleteAdd.module.css";

function SearchDeleteAdd() {
  const [search, setSearch] = useState("");
  const {
    state: { selectedContacts },
    dispatch,
  } = useContext(ContactContext);
  const searchHandler = (e) => {
    setSearch(e.target.value);
    const inputValue = e.target.value;
    dispatch({ type: "SET_SEARCH", payload: inputValue });
  };
  const deleteSelectedContacts = () => {
    dispatch({ type: "DELETE_SELECTED_CONTACTS" });
  };
  return (
    <div className={styles.container}>
      <input
        type="text"
        placeholder="🔍Search..."
        value={search}
        onChange={searchHandler}
      />
      <div className={styles.icons}>
        <button
          onClick={deleteSelectedContacts}
          disabled={selectedContacts.length === 0}
        >
          <MdDeleteOutline
            data-tooltip-id="delete-contacts-tooltip"
            data-tooltip-content="Delete contacts"
            className={selectedContacts.length === 0 ? styles.disabled : ""}
          />
        </button>
        <Tooltip
          place="left"
          id="delete-contacts-tooltip"
          style={{ backgroundColor: "#e60023" }}
        />
        <Link to="/add-contact">
          <MdAddCircleOutline
            data-tooltip-id="add-tooltip"
            data-tooltip-content="Add contact"
            className={styles.add_icon}
          />
        </Link>
        <Tooltip place="left" id="add-tooltip" variant="info" />
      </div>
    </div>
  );
}

export default SearchDeleteAdd;
