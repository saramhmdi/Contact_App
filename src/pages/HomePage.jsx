import { useContext } from "react";

import ContactsList from "../components/ContactsList";
import Loader from "../components/Loader";
import SearchDeleteAdd from "../components/SearchDeleteAdd";
import { ContactContext } from "../context/Dispatcher";

function HomePage() {
  const {
    state: { isLoading },
  } = useContext(ContactContext);

  return (
    <div style={{ margin: "25px" }}>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <SearchDeleteAdd />
          <ContactsList />
        </>
      )}
    </div>
  );
}

export default HomePage;
