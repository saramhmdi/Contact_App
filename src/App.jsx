import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import ContactsProvider from "./context/Dispatcher";
import NotFound from "./pages/404";
import AddEditContact from "./pages/AddEditContact";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <ContactsProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/add-contact" element={<AddEditContact />} />
          <Route path="/edit-contact/:id" element={<AddEditContact />} />
          <Route path="/" element={<HomePage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <ToastContainer/>
      </BrowserRouter>
    </ContactsProvider>
  );
}

export default App;
