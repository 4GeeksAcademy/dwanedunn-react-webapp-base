import React, { useEffect } from 'react';
import storeReducer from '../store';

export const Contacts = () => {
  const { store, dispatch } = useGlobalReducer();
  async function fetchContacts() {
    const url = `${store.BASE_URL}/${store.SLUB}`;
    const response = await fetch(url);
    const body = await response.json();
    if (!response.ok) {
      throw new Error(`status:${response.status},message:${body}`);
      dispatch({
        type: 'SET_CONTACTS',
        payload: body.contacts,
      });
    }
  }

  useEffect(() => {
    fetchContacts();
  }, []);
  return (
    <ul>
      {store.contacts.map((contact) => {
        return (
          <li key={contact.id}>
            <h2>{contact.name}</h2>
            <p>{contact.email}</p>
            <p>{contact.phone}</p>
          </li>
        );
      })}
      {store.contacts.length === 0 && (
        <li>
          <h2>No contacts found</h2>
        </li>
      )}
    </ul>
  );
};
