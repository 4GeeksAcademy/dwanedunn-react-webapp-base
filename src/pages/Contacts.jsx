import React, { useState, useEffect } from 'react';
import storeReducer from '../store';
import { useNavigate } from 'react-router-dom';
import { FaTrash } from 'react-icons/fa';
import { MdEdit } from 'react-icons/md';
import {fetchContacts} from '../hooks/Actions'
// Import necessary components from react-router-dom and other parts of the application.
import { Link } from 'react-router-dom';
import useGlobalReducer from '../hooks/useGlobalReducer'; // Custom hook for accessing the global state.

export const Contacts = () => {
  const navigate = useNavigate();
  const { store, dispatch } = useGlobalReducer();

 
  // Call the fetch only once on load -TODO: WORKING!
  useEffect(() => {
    fetchContacts(store, dispatch);
  }, []);

  async function deleteContact(contact_id) {
    const response = await fetch(
      `https://playground.4geeks.com/contact/agendas/dwanedunn/contacts/${contact_id}`,
      { method: 'DELETE' }
    );
    if (!response.ok) {
      console.log('DELETE Failed');
    }
    // const result = await response.json();
    // console.log('delete result', result);
    fetchContacts(store, dispatch);
    return;
  }

  return (
    <section className="d-flex flex-column">
      {(Array.isArray(store.contacts) ? store.contacts : []).map((contact) => {
        return (
          <div key={contact.id} className="d-flex justify-content-start">
            <div className="profile-img" style={{ width: '10rem' }}>
              <img
                src="https://picsum.photos/80/80"
                alt="picsum"
                className="rounded-circle"
              />
            </div>
            <div className="details" style={{ width: '12rem' }}>
              <p>{contact.name}</p>
              <p>{contact.email}</p>
              <p>{contact.phone}</p>
              <p>{contact.address}</p>
            </div>
            <div className="actions" style={{ width: '12rem' }}>
              <div className="buttons d-flex justify-content-center">
                <MdEdit
                  className="me-3"
                  onClick={(event) => navigate(`/contacts/${contact.id}`)}
                />
                <FaTrash onClick={() => deleteContact(contact.id)} />
              </div>
            </div>
          </div>
        );
      })}
    </section>
  );
};
