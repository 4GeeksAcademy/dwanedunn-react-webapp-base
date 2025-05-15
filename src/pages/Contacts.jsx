import React from 'react';
import storeReducer from '../store';

export const Contacts = () => {
  const { store, dispatch } = useGlobalReducer();
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
    </ul>
  );
};
