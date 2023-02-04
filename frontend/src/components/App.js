import React from "react";
import { Route, Switch, useLocation, useHistory } from "react-router-dom";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import CurrentUserContext from "../contexts/CurrentUserContext";
import api from "../utils/Api";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ProtectedRoute from "./ProtectedRoute";
import Login from "./Login";
import Register from "./Register";
import InfoTooltip from "./InfoTooltip";
import { getToken, login, register } from "../utils/Auth";

function App() {
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] =
    React.useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
  const [isDeleteCardPopupOpen, setDeleteCardPopupOpen] = React.useState(false);
  const [isInfoTooltipOpen, setInfoTooltipOpen] = React.useState(false);
  const [isRegistrationOK, setRegistrationOK] = React.useState(false);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({
    name: "",
    link: "",
  });

  const [headerText, setHeaderText] = React.useState("");
  const [headerLink, setHeaderLink] = React.useState("");

  const location = useLocation();
  const history = useHistory();

  const [currentUser, setCurrentUser] = React.useState({
    name: "",
    about: "",
    avatar: "",
    _id: "",
  });

  const [userEmail, setUserEmail] = React.useState("");

  function checkToken(jwt) {
    getToken(jwt)
      .then(res => setUserEmail(res.email))
      .then(() => setLoggedIn(true))
      .then(() => {
        history.push("/");
      })
      .catch(err => console.log(err));
  }

  const [cards, setCards] = React.useState([]);

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then(newCard => {
        setCards(state => state.map(c => (c._id === card._id ? newCard : c)));
      })
      .catch(err => console.log(err));
  }

  function handleCardDelete(cardId) {
    api
      .deleteCard(cardId)
      .then(() => api.getInitialCards())
      .then(res => {
        setCards(res);
      })
      .catch(err => console.log(err));
  }

  React.useEffect(() => {
    api
      .getInitialCards()
      .then(res => {
        setCards(res);
      })
      .catch(err => console.log(err));
  }, []);

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true);
  }

  function closeAllPopups() {
    setAddPlacePopupOpen(false);
    setEditProfilePopupOpen(false);
    setEditAvatarPopupOpen(false);
    setDeleteCardPopupOpen(false);
    setInfoTooltipOpen(false);
    setSelectedCard({ name: "", link: "" });
    setRegistrationOK(false);
  }

  function handleUpdateUser(newUserData) {
    api
      .editProfile(newUserData)
      .then(res => {
        setCurrentUser(res);
      })
      .then(() => closeAllPopups())
      .catch(err => console.log(err));
  }

  function handleUpdateAvatar(avatarLink) {
    api
      .editAvatar(avatarLink)
      .then(res => {
        setCurrentUser(res);
      })
      .then(() => closeAllPopups())
      .catch(err => console.log(err));
  }

  function handleAddPlaceSubmit(newCardData) {
    api
      .addCard(newCardData)
      .then(newCard => {
        setCards([newCard, ...cards]);
      })
      .then(() => closeAllPopups())
      .catch(err => console.log(err));
  }

  function handleRegisterSubmit(password, email) {
    register(password, email)
      .then(() => {
        setRegistrationOK(true);
      })
      .then(() => {
        setInfoTooltipOpen(true);
      })
      .catch(() => {
        setInfoTooltipOpen(true);
      });
  }

  function handleLoginSubmit(password, email) {
    login(password, email)
      .then(res => {
        if (res.token) {
          localStorage.setItem("jwt", res.token);
          return res.token;
        }
      })
      .then(res => {
        checkToken(res);
      })
      .then(() => {
        api
          .getUserInfo()
          .then(res => {
            setCurrentUser(res);
          })
          .catch(err => console.log(err));
      })
      .then(() => {
        api
          .getInitialCards()
          .then(res => {
            setCards(res);
          })
          .catch(err => console.log(err));
      })
      .catch(err => {
        console.log(err);
      });
  }

  function signOut() {
    localStorage.removeItem("jwt");
    setLoggedIn(false);
    setUserEmail("");
    setCurrentUser({
      name: "",
      about: "",
      avatar: "",
      _id: "",
    })
  }

  function handleHeaderLinkClick() {
    if (loggedIn) {
      signOut();
    }
  }

  React.useEffect(() => {
    if (loggedIn) {
      setHeaderText("Выйти");
      setHeaderLink("/sign-in");
    } else if (location.pathname === "/sign-up") {
      setHeaderText("Войти");
      setHeaderLink("/sign-in");
    } else {
      setHeaderText("Регистрация");
      setHeaderLink("/sign-up");
    }
  }, [location, loggedIn]);

  React.useEffect(() => {
    api.getUserInfo().then(res => {
      setCurrentUser(res);
    });
  }, []);

  React.useEffect(() => {
    if (localStorage.getItem("jwt")) {
      const jwt = localStorage.getItem("jwt");
      checkToken(jwt);
    }
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <div className="page__container">
          <Header
            email={userEmail}
            text={headerText}
            link={headerLink}
            onLinkClick={handleHeaderLinkClick}
          />
          <Switch>
            <Route path="/sign-in">
              <Login onAuthorizate={handleLoginSubmit} />
            </Route>
            <Route path="/sign-up">
              <Register onAuthorizate={handleRegisterSubmit} />
            </Route>
            <ProtectedRoute
              component={Main}
              path="/"
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onEditAvatar={handleEditAvatarClick}
              onCardClick={handleCardClick}
              cards={cards}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}
              loggedIn={loggedIn}
            />
          </Switch>
          <Footer />
          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
          />
          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlaceSubmit}
          />
          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
          />
          <PopupWithForm
            name="delete-card"
            title="Вы уверены?"
            isOpen={isDeleteCardPopupOpen}
            onClose={closeAllPopups}
          />
          <ImagePopup card={selectedCard} onClose={closeAllPopups} />
          <InfoTooltip
            isOpen={isInfoTooltipOpen}
            onClose={closeAllPopups}
            isOK={isRegistrationOK}
          />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
