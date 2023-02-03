class Api {
  constructor(apiSettings) {
    this._baseUrl = apiSettings.baseUrl;
    this._headers = apiSettings.headers;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  }

  _request(url, options) {
    return fetch(url, options).then(res => this._checkResponse(res));
  }

  getUserInfo() {
    return this._request(`${this._baseUrl}/users/me`, {
      method: "GET",
      credentials: 'include',
    });
  }

  getInitialCards() {
    return this._request(`${this._baseUrl}/cards`, {
      method: "GET",
      credentials: 'include',
    });
  }

  editProfile(newUserData) {
    return this._request(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify(newUserData),
    });
  }

  editAvatar(avatarLink) {
    return this._request(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({
        avatar: avatarLink,
      }),
    });
  }

  addCard(newCardData) {
    return this._request(`${this._baseUrl}/cards`, {
      method: "POST",
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify(newCardData),
    });
  }

  deleteCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      credentials: 'include',
    });
  }

  _setCardLike(cardId) {
    return this._request(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: "PUT",
      credentials: 'include',
    });
  }

  _removeCardLike(cardId) {
    return this._request(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: "DELETE",
      credentials: 'include',
    });
  }

  changeLikeCardStatus(cardId, isLiked) {
    if (isLiked) {
      return this._setCardLike(cardId);
    } else {
      return this._removeCardLike(cardId);
    }
  }
}

const api = new Api({
  baseUrl: "http://backend.mesto.gerasimova.nomoredomainsclub.ru",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
