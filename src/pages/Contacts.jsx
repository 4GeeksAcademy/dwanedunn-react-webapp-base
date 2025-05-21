import React, { useState, useEffect } from 'react';
import storeReducer from '../store';
import { useNavigate } from 'react-router-dom';
import { FaTrash } from 'react-icons/fa';

// Import necessary components from react-router-dom and other parts of the application.
import { Link } from 'react-router-dom';
import useGlobalReducer from '../hooks/useGlobalReducer'; // Custom hook for accessing the global state.

export const Contacts = () => {
  const navigate = useNavigate();
  const { store, dispatch } = useGlobalReducer();
  async function delteContact(id) {
    const url = `${store.BASE_URL}/${store.SLUG}/contacts/${id}`;
    const response = await fetch(url, {
      method: 'DELETE',
      // headers: {
      //   'Content-Type': 'application/json',
      // Authorization: `Bearer ${store.TOKEN}`,
    });
    // body should be empty, but in case of error we can use it
    const body = await response.json();
    if (!response.ok)
      throw new Error(`status:${response.status},message:${body}`);
    await fetchContacts();
  }

  async function fetchContacts() {
    const url = `${store.BASE_URL}/${store.SLUG}`;
    const response = await fetch(url);
    const body = await response.json();

    if (!response.ok) {
      console.log('Error fetching contacts:', body);
      throw new Error(`status:${response.status},message:${body}`);
    }
    dispatch({
      type: 'SET_CONTACTS',
      payload: body.contacts,
    });
  }

  useEffect(() => {
    if (store.BASE_URL && store.SLUG) {
      fetchContacts().catch((err) => {
        console.error('Failed to fetch contacts:', err);
      });
    }
  }, [store.BASE_URL, store.SLUG]);

  return (
    <ul>
      {(Array.isArray(store.contacts) ? store.contacts : []).map((contact) => {
        return (
          <li
            key={contact.id}
            onClick={(event) => navigate(`/contacts/${contact.id}`)}
            // onClick={(event) => deleteContact(contact.id)} // delete click
          >
            <h2>{contact.name}</h2>
            <p>{contact.email}</p>
            <p>{contact.phone}</p>
            <p>{contact.address}</p>
            <FaTrash onClick={(event) => deleteContact(contact.id)} />
          </li>
        );
      })}
      {(!store.contacts || store.contacts.length === 0) && (
        <li>
          <h2>No contacts found</h2>
        </li>
      )}
    </ul>
  );
};
