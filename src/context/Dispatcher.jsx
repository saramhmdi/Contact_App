import { createContext, useReducer, useEffect } from "react";
import {
  ADD_CONTACT,
  EDIT_CONTACT,
  DELETE_CONTACT,
  DELETE_SELECTED_CONTACTS,
  SET_SEARCH,
  TOGGLE_SELECT_CONTACT,
  SUCCESS,
  FAILED,
} from "../actions/ContactActions";

const initialState = {
  isLoading: true,
  data: [],
  error: "",
  search: "",
  selectedContacts: [],
  filteredContacts: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case SUCCESS:
      return {
        ...state,
        isLoading: false,
        data: action.payload,
        filteredContacts: action.payload,
      };
    case FAILED:
      return { ...state, isLoading: false, error: action.payload };
    case SET_SEARCH: {
      const searchQuery = action.payload.toLowerCase();
      const filteredContacts = state.data.filter(
        ({ firstName, lastName, email, phone }) =>
          [firstName, lastName, email, phone].some((field) =>
            field.toLowerCase().includes(searchQuery)
          )
      );
      return { ...state, search: action.payload, filteredContacts };
    }
    case TOGGLE_SELECT_CONTACT:
      const selectedContacts = state.selectedContacts.includes(action.payload)
        ? state.selectedContacts.filter((id) => id !== action.payload)
        : [...state.selectedContacts, action.payload];
      return { ...state, selectedContacts };
    case DELETE_SELECTED_CONTACTS:
      return {
        ...state,
        data: state.data.filter(
          (contact) => !state.selectedContacts.includes(contact.id)
        ),
        selectedContacts: [],
      };
    case DELETE_CONTACT:
      return {
        ...state,
        data: state.data.filter((contact) => contact.id !== action.payload),
      };
    case ADD_CONTACT:
      return {
        ...state,
        data: [...state.data, action.payload],
      };
    case EDIT_CONTACT:
      return {
        ...state,
        data: state.data.map((contact) =>
          contact.id === action.payload.id ? action.payload : contact
        ),
      };
    default:
      throw new Error(`Unknown action type: ${action.type}`);
  }
};

export const ContactContext = createContext();

const ContactsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const res = await fetch("http://localhost:8000/contacts");
        const json = await res.json();
        dispatch({ type: SUCCESS, payload: json });
      } catch (error) {
        dispatch({ type: FAILED, payload: error.message });
      }
    };
    fetchContacts();
  }, []);

  return (
    <ContactContext.Provider value={{ state, dispatch }}>
      {children}
    </ContactContext.Provider>
  );
};
export default ContactsProvider;
