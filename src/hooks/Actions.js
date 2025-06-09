export const fetchContacts = async(store, dispatch) => {
    const url = `${store.BASE_URL}/${store.SLUG}`;
    const contact_url = `${store.BASE_URL}/${store.SLUG}/contacts`;
    const response = await fetch(url);
    const body = await response.json();

    if (!response.ok) {
      console.log('Error fetching contacts:', body); // log error, then post the slug
      // throw new Error(`status:${response.status},message:${body}`);
      // add the slug
     const resp  = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        
      });
      const data = await resp.json()
      return data
    
    
    }
    dispatch({
      type: 'SET_CONTACTS',
      payload: body.contacts,
    });
    return body
  }