export const initialStore = () => {
  return {
    BASE_URL: 'https://playground.4geeks.com/contact/agendas',
    SLUG: 'dwanedunn',
    contacts: [],
  };
};

export default function storeReducer(store, action = {}) {
  switch (action.type) {
    case 'SET_CONTACTS':
      return {
        ...store,
        contacts: action.payload,
      };

    default:
      throw Error('Unknown action.');
  }
}
