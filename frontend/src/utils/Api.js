class Api {
  constructor(options) {
    this.link = options.link;
    this.headers = options.headers;
  };

  _handleResponse = (res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject('Ошибка')
  };

  async getUserInfo() {
    return await fetch(`${this.link}/users/me`, {
      method: "GET",
      headers: this.headers
    })
      .then(this._handleResponse)
  };


  async getInitialCard() {
    return await fetch(`${this.link}/cards`, {
      method: "GET",
      headers: this.headers
    })
      .then(this._handleResponse)
  };

  async setUserInfo(data) {
    return await fetch(`${this.link}/users/me`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about
      })
    })
      .then(this._handleResponse)
  };

  addNewCard(data) {
    return fetch(`${this.link}/cards`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link
      })
    })
      .then(this._handleResponse)
  };

  addNewAvatar(data) {
    return fetch(`${this.link}/users/me/avatar`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify({
        avatar: data.avatar
      })
    })
      .then(this._handleResponse)
  };

  removeCard(id) {
    return fetch(`${this.link}/cards/${id}`, {
      method: 'DELETE',
      headers: this.headers,
    })
      .then(this._handleResponse)
  };

  changeLikeCardStatus(id, like) {
    const whichMethod = like ? "DELETE" : "PUT";
    return fetch(`${this.link}/cards/${id}/likes`, {
      method: whichMethod,
      headers: this.headers,
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Error: ${res.status}`)
      })
      .catch(err => console.log(err))
  }
}

const options = {
  link: 'https://api.sofyajeune.mesto.nomoredomains.work',
  headers: {
    authorization: `Bearer ${localStorage.getItem('jwt')}`,
    Origin: 'https://sofyajeune.mesto.nomoredomains.work',
    'Content-Type': 'application/json'
  }
}

export const api = new Api(options)