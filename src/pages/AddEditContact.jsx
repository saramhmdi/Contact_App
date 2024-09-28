import { useContext, useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

import { IoPersonAddSharp } from "react-icons/io5";
import {
  MdOutlineAlternateEmail,
  MdOutlinePhoneAndroid,
  MdArrowBack,
} from "react-icons/md";

import Loader from "../components/Loader";
import { validateField, validateFields, showToast } from "../utils/helpers";
import { ContactContext } from "../context/Dispatcher";

import styles from "../styles/AddEditContact.module.css";

function AddEditContact() {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    state: { isLoading, data },
    dispatch,
  } = useContext(ContactContext);

  const isEditMode = !!id;
  const [contact, setContact] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (isEditMode) {
      const contactValue = data.find((contact) => contact.id === id);
      if (contactValue) {
        setContact(contactValue);
      }
    }
  }, [isEditMode, id, data]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setContact({ ...contact, [name]: value });

    const error = validateField(name, value);
    setErrors({ ...errors, [name]: error });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = validateFields(contact);
    setErrors(newErrors);

    const hasErrors = Object.values(newErrors).some((error) => error);
    const hasEmptyFields = Object.values(contact).some(
      (value) => value.trim() === ""
    );

    if (hasErrors || hasEmptyFields) {
      return;
    }

    if (isEditMode) {
      dispatch({ type: "EDIT_CONTACT", payload: { ...contact, id } });
      showToast("Contact edited successfully!");
    } else {
      const newContact = { ...contact, id: Date.now() };
      dispatch({ type: "ADD_CONTACT", payload: newContact });
      showToast("Contact added successfully!");
    }

    navigate("/");
  };

  return (
    <div className={styles.wrapper}>
      {isLoading ? (
        <Loader />
      ) : (
        <div className={styles.container}>
          <div className={styles.header}>
            <Link to="/" className={styles.back_to_contact_list}>
              <MdArrowBack />
            </Link>
            <p>{`${isEditMode ? "Edit" : "Add"} Contact`}</p>
            <IoPersonAddSharp fontSize={50} color="#0088cc" />
          </div>
          <form onSubmit={handleSubmit}>
            <div className={styles.form_field}>
              <label>
                First Name <span>*</span>
              </label>
              <input
                type="text"
                name="firstName"
                value={contact.firstName}
                onChange={handleChange}
              />
              {errors.firstName && (
                <p className={styles.error}>{errors.firstName}</p>
              )}
            </div>
            <div className={styles.form_field}>
              <label>
                Last Name <span>*</span>
              </label>
              <input
                type="text"
                name="lastName"
                value={contact.lastName}
                onChange={handleChange}
              />
              {errors.lastName && (
                <p className={styles.error}>{errors.lastName}</p>
              )}
            </div>
            <div className={styles.form_field}>
              <label>
                <MdOutlineAlternateEmail color="#0088cc" /> Email <span>*</span>
              </label>
              <input
                type="email"
                name="email"
                value={contact.email}
                onChange={handleChange}
              />
              {errors.email && <p className={styles.error}>{errors.email}</p>}
            </div>
            <div className={styles.form_field}>
              <label>
                <MdOutlinePhoneAndroid color="#0088cc" /> Phone <span>*</span>
              </label>
              <input
                type="text"
                name="phone"
                value={contact.phone}
                onChange={handleChange}
              />
              {errors.phone && <p className={styles.error}>{errors.phone}</p>}
            </div>
            <button type="submit" className={styles.button}>
              {isEditMode ? "Update Contact" : "Add Contact"}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default AddEditContact;
