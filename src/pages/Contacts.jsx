import React, { useState, useEffect } from 'react';
import storeReducer from '../store';

// Import necessary components from react-router-dom and other parts of the application.
import { Link } from 'react-router-dom';
import useGlobalReducer from '../hooks/useGlobalReducer'; // Custom hook for accessing the global state.

export const Contacts = () => {
  const { store, dispatch } = useGlobalReducer();
  async function fetchContacts() {
    const url = `${store.BASE_URL}/${store.SLUG}`;
    console.log('contacts url:', url);
    const response = await fetch(url);
    const body = await response.json();
    console.log('response:', response);
    if (!response.ok) {
      console.log('Error fetching contacts:', body);
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
