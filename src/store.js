export const initialStore = () => {
  return {
    BASE_URL: 'https://playground.4geeks.com/contact/agendas',
    SLUG: 'dwane_dunn',
    contacts: [{}, {}],
  };
};

export default function storeReducer(store, action = {}) {
  switch (action.type) {
    case 'add_task':

    default:
      throw Error('Unknown action.');
  }
}
