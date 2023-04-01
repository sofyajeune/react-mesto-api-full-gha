const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(res.status);
}

const BaseUrl = 'https://api.sofyajeune.mesto.nomoredomains.work';

const signUp = (email, password) => {
  const requestUrl = BaseUrl + '/signup';
  return fetch(requestUrl, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password }),
  }).then(checkResponse);
}

const signIn = (email, password) => {
  const requestUrl = BaseUrl + '/signin';
  return fetch(requestUrl, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
    'Content-Type': 'application/json'
  },
    body: JSON.stringify({ email, password }),
  }).then(checkResponse);
}

const checkToken = (token) => {
  const requestUrl = BaseUrl + '/users/me';
  return fetch(requestUrl, {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
  }).then(checkResponse);
}

export { signUp, signIn, checkToken };