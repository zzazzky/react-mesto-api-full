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
    const jwt = localStorage.getItem("jwt");
    return this._request(`${this._baseUrl}/users/me`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
    });
  }

  getInitialCards() {
    const jwt = localStorage.getItem("jwt");
    return this._request(`${this._baseUrl}/cards`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
    });
  }

  editProfile(newUserData) {
    const jwt = localStorage.getItem("jwt");
    return this._request(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
      body: JSON.stringify(newUserData),
    });
  }

  editAvatar(avatarLink) {
    const jwt = localStorage.getItem("jwt");
    return this._request(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
      body: JSON.stringify({
        avatar: avatarLink,
      }),
    });
  }

  addCard(newCardData) {
    const jwt = localStorage.getItem("jwt");
    return this._request(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
      body: JSON.stringify(newCardData),
    });
  }

  deleteCard(cardId) {
    const jwt = localStorage.getItem("jwt");
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
    });
  }

  _setCardLike(cardId) {
    const jwt = localStorage.getItem("jwt");
    return this._request(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
    });
  }

  _removeCardLike(cardId) {
    const jwt = localStorage.getItem("jwt");
    return this._request(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      }
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
