import { useContext } from "react";
import { ContactContext } from "../context/Dispatcher";

import ContactItem from "./ContactItem";
import styles from "../styles/ContactsList.module.css";

function ContactsList() {
  const {
    state: { data, search },
  } = useContext(ContactContext);
  const filteredContacts = data.filter(
    ({ firstName, lastName, email, phone }) =>
      [firstName, lastName, email, phone].some((field) =>
        field.toLowerCase().includes(search.toLowerCase())
      )
  );
  return (
    <div className={styles.container}>
      <h3>Contacts List</h3>
      {filteredContacts.length ? (
        <ul className={styles.contacts_list}>
          {filteredContacts.map((contact) => (
            <ContactItem key={contact.id} contact={contact} />
          ))}
        </ul>
      ) : (
        <p className={styles.no_contacts}>No Cantacts Yet!</p>
      )}
    </div>
  );
}

export default ContactsList;
