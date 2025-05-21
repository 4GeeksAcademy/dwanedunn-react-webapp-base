import React, { useEffect, useState } from 'react';
import useGlobalReducer from '../hooks/useGlobalReducer';
import { Navigate } from 'react-router-dom';
import { useParams, useNavigate } from 'react-router-dom';

export const EditContact = () => {
  const { store, dispatch } = useGlobalReducer();
  const params = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');

  function searchContactDetail(id) {
    // search store for the contact details (use the id from the url)
    const requiredContact = store.contacts.find((contact) => {
      if (contact.id == id) return true;
      return false;
    });
    if (!requiredContact) navigate('/'); // // if no contact found, navigate to contacts page
    // if contact found, update the input with its values
    setName(requiredContact.name);
    setPhone(requiredContact.phone);
    setEmail(requiredContact.email);
    setAddress(requiredContact.address);
  }
  async function saveContact() {
    // validate inputs
    if (name === '' || phone === '' || email === '' || address === '')
      throw new Error('Please fill in all fields, check your inputs');
    // }
    // create request body
    const requestBody = {
      name: name,
      phone: phone,
      email: email,
      address: address,
    };
    const url = `${store.BASE_URL}/${store.SLUG}/contacts/${params.contactId}`; // api url

    // fetch post to api
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        // Authorization: `Bearer ${store.TOKEN}`,
      },
      body: JSON.stringify(requestBody),
    });
    const body = await response.json();
    if (!response.ok)
      throw new Error(`status: ${response.status}, message: ${body}`);
    // send user home
    navigate('/contacts');
  }

  useEffect(() => {
    if (!params.contactId) return; // if no contactId, return
    searchContactDetail(params.contactId);
  }, [params]);
  return (
    <div className="row">
      <div className="d-flex w-100 flex-column">
        <form>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Full Name"
            type="text"
            className="form-control"
            name="name"
          />
          <input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+1 (xxx) xxx-xxx"
            type="text"
            className="form-control"
            name="phone"
          />
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="name@email.not"
            type="email"
            className="form-control"
            name="email"
          />
          <input
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Street Address"
            type="text"
            className="form-control"
            name="address"
          />
          <button
            type="button"
            className="btn btn-primary"
            onClick={(e) => saveContact()}
          >
            Save Edits to Contact
          </button>
        </form>
      </div>
    </div>
  );
};
