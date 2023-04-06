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
  }).then((res) => {
    return checkResponse(res)
  })
};

const signIn = async (email, password) => {
  const requestUrl = BaseUrl + '/signin';
  return await fetch(requestUrl, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password }),
  }).then((res) => {
    return checkResponse(res)
  })
};

const checkToken = (token) => {
  const requestUrl = BaseUrl + '/users/me';
  return fetch(requestUrl, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Origin': 'http://localhost:3001',
      "Authorization": `Bearer ${token}`
    },
  }).then((res) => {
    return checkResponse(res)
  })
}

export { signUp, signIn, checkToken };