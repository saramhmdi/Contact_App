export const ADD_CONTACT = "ADD_CONTACT";
export const EDIT_CONTACT = "EDIT_CONTACT";
export const DELETE_CONTACT = "DELETE_CONTACT";
export const DELETE_SELECTED_CONTACTS = "DELETE_SELECTED_CONTACTS";
export const SET_SEARCH = "SET_SEARCH";
export const TOGGLE_SELECT_CONTACT = "TOGGLE_SELECT_CONTACT";
export const SUCCESS = "SUCCESS";
export const FAILED = "FAILED";

export const addContact = (contact) => ({
  type: ADD_CONTACT,
  payload: contact,
});

export const editContact = (contact) => ({
  type: EDIT_CONTACT,
  payload: contact,
});

export const deleteContact = (id) => ({
  type: DELETE_CONTACT,
  payload: id,
});

export const deleteSelectedContacts = () => ({
  type: DELETE_SELECTED_CONTACTS,
});

export const setSearch = (search) => ({
  type: SET_SEARCH,
  payload: search,
});

export const toggleSelectContact = (id) => ({
  type: TOGGLE_SELECT_CONTACT,
  payload: id,
});

export const success = (data) => ({
  type: SUCCESS,
  payload: data,
});

export const failed = (error) => ({
  type: FAILED,
  payload: error,
});
