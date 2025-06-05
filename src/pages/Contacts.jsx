import React, { useState, useEffect } from 'react';
import storeReducer from '../store';
import { useNavigate } from 'react-router-dom';
import { FaTrash } from 'react-icons/fa';
import { MdEdit } from 'react-icons/md';

// Import necessary components from react-router-dom and other parts of the application.
import { Link } from 'react-router-dom';
import useGlobalReducer from '../hooks/useGlobalReducer'; // Custom hook for accessing the global state.

export const Contacts = () => {
  const navigate = useNavigate();
  const { store, dispatch } = useGlobalReducer();

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
  // Call the fetch only once on load -TODO: WORKING!
  useEffect(() => {
    fetchContacts();
  }, []);

  return (
    <section className="d-flex flex-column border border-danger">
      {(Array.isArray(store.contacts) ? store.contacts : []).map((contact) => {
        return (
          <div key={contact.id}>
            <div className="profile-img" style={{ width: '10rem' }}>
              <img
                src="https://picsum.photos/80/80"
                alt="picsum"
                className="rounded-circle"
              />
            </div>
            <div
              className="details border border-success"
              style={{ width: '12rem' }}
            >
              <p>{contact.name}</p>
              <p>{contact.email}</p>
              <p>{contact.phone}</p>
              <p>{contact.address}</p>
            </div>
            <div
              className="actions border border-secondary"
              style={{ width: '12rem' }}
            >
              <div className="buttons d-flex justify-content-center">
                <MdEdit
                  className="me-3"
                  onClick={(event) => navigate(`/contacts/${contact.id}`)}
                />
                <FaTrash
                  onClick={() => console.log('dispatch("delete_contact")')}
                />
              </div>
            </div>
          </div>
        );
      })}
    </section>
  );
};
