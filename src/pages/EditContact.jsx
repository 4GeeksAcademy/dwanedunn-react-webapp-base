import React, { useEffect } from 'react';
import useGlobalReducer from '../hooks/useGlobalReducer';
import { Navigate } from 'react-router-dom';
export const EditContact = () => {
  const { store, dispatch } = useGlobalReducer();
  const params = useParams();
  const navigate = useNavigate();
  function searchContactDetail(id) {
    // search store for the contact details (use the id from the url)
    const requiredContact = store.contacts.find((contact) => {
      if (contact.id == id) return true;
      return false;
    });
    if (!requiredContact) navigate('/contacts'); // if no contact found, navigate to contacts page
  }

  useEffect(() => {
    if (!params.contactId) return; // if no contactId, return
    searchContactDetail(params.contactId);
  }, [params]);
  return <div>EditContact</div>;
};
