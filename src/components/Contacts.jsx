import React from 'react';
import storeReducer from '../store';

const Contacts = () => {
  return (
    <ul>
        {store.Contacts.map(contact) => {
            return (
                <li key="{Contact.id}">{contact.name}</li>
            )
        }}
    </ul>
  )
};

export default Contacts;
