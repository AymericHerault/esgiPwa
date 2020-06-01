export async function fetchTodos() {
    const config = window.config;
    return fetch(`${config.api}/todos`, {
      method: 'GET',
      headers: {
        'Conetent-type': 'application/json'
      }
    })
    .then(result => result.json())
    .catch(error => {
      console.error(error);
      return false;
    })
  } 