import { Link } from "react-router-dom";
import { useState, useContext } from "react";
import axios from "axios";

import { Tooltip } from "react-tooltip";
import { MdDeleteOutline, MdAddCircleOutline } from "react-icons/md";

import { showToast } from "../utils/helpers";
import { ContactContext } from "../context/Dispatcher";
import { deleteSelectedContacts, setSearch } from "../actions/ContactActions";

import Modal from "./Modal";

import styles from "../styles/SearchDeleteAdd.module.css";

function SearchDeleteAdd() {
  const [searchValue, setSearchValue] = useState("");
  const [isShowModal, setIsShowModal] = useState(false);

  const {
    state: { selectedContacts },
    dispatch,
  } = useContext(ContactContext);

  const searchHandler = (e) => {
    setSearchValue(e.target.value);
    const inputValue = e.target.value;
    dispatch(setSearch(inputValue));
  };

  const confirmDeleteHandler =async () => {
    try{
      const deleteRequests = selectedContacts.map((id) =>
        axios.delete(`http://localhost:8000/contacts/${id}`)
      );
      await axios.all(deleteRequests);
    dispatch(deleteSelectedContacts());
    showToast("Selected contacts deleted successfully!");
    setIsShowModal(false);
    }catch(error){
      showToast("Failed to delete selected contacts!", "error");

    }

  };

  const showDeleteConfirmationModal = () => {
    setIsShowModal(true);
  };
  return (
    <div className={styles.container}>
      <input
        type="text"
        placeholder="🔍Search..."
        value={searchValue}
        onChange={searchHandler}
      />
      <div className={styles.icons}>
        <button
          onClick={showDeleteConfirmationModal}
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
      {isShowModal && (
        <Modal
          message="Are you sure you want to delete selected contacts?"
          onConfirm={confirmDeleteHandler}
          onCancel={() => setIsShowModal(false)}
        />
      )}
    </div>
  );
}

export default SearchDeleteAdd;
