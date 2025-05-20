import React, { useEffect } from 'react';
import useGlobalReducer from '../hooks/useGlobalReducer';
import { Navigate } from 'react-router-dom';
import { func } from 'prop-types';
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
    if (!requiredContact) navigate('/contacts'); // // if no contact found, navigate to contacts page
    // if contact found, update the input with its values
    setName(requiredContact.name);
    setPhone(requiredContact.phone);
    setEmail(requiredContact.email);
    setAddress(requiredContact.address);
  }
  function saveContact() {}

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
