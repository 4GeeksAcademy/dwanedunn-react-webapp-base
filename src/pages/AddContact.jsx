import React, { useState } from 'react';
import useGlobalReducer from '../hooks/useGlobalReducer';
import { Link } from 'react-router-dom';
import { fetchContacts } from '../hooks/Actions';

export const AddContact = () => {
  const { store, dispatch } = useGlobalReducer();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');

  async function AddContact() {
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
    const url = `${store.BASE_URL}/${store.SLUG}/contacts`; // api url

    // fetch post to api
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Authorization: `Bearer ${store.TOKEN}`,
      },
      body: JSON.stringify(requestBody),
    });
    const body = await response.json();
    if (!response.ok)
      throw new Error(`status: ${response.status}, message: ${body}`);
    // clear form
    setName('');
    setPhone('');
    setEmail('');
    setAddress('');
    fetchContacts(store, dispatch)
  }
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
          <Link to={'/'}>
            <button
              type="button"
              className="btn btn-primary"
              onClick={(e) => AddContact()}
            >
              Save New Contact
            </button>
          </Link>
        </form>
      </div>
    </div>
  );
};
