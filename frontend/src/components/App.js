
import '../index.css';
import React from 'react';
import { api } from '../utils/Api';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import Footer from './Footer';
import Header from './Header';
import Main from './Main';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import Login from './Login';
import Register from './Register';
import ProtectedRoute from './ProtectedRoute';
import InfoTooltip from './InfoTooltip';
import { signUp, signIn, checkToken } from '../utils/apiAuth';

import checkmarkImg from '../images/checkmark.svg'
import crossImg from '../images/cross.svg'

function App() {

  //Стейт для карточек
  const [cards, setCards] = React.useState([]);

  const [currentUser, setCurrentUser] = React.useState({})

  //Стейт для авторизации для показа контента
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  //Стейт для InfoTooltip, модальное окно
  const [infoTooltip, setInfoTooltip] = React.useState(false);

  const navigate = useNavigate();

  const [emailValue, setEmailValue] = React.useState(null);
  const [popupStatus, setPopupStatus] = React.useState({ image: '', message: '' });

  //Для выбранной карточки (попап открытой картинки)
  const [selectedCard, setSelectedCard] = React.useState(null);

  //Состояние попапов 
  const [isEditAvatarPopupOpen, setIsAvatarPopupOpen] = React.useState(false);
  const [isEditProfilePopupOpen, setIsProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);

  //Авторизация
  function handleLogin(email, password) {
    signIn(email, password)
      .then((res) => {
        localStorage.setItem('jwt', res.token);
        setIsLoggedIn(true);
        setEmailValue(email);
        navigate("/");
      })
      .catch(() => {
        setPopupStatus({ image: crossImg, message: 'Что-то пошло не так! Попробуйте еще раз.' });
        handleInfoTooltip();
      });
  };

  //Регистрация нового пользователя
  function handleRegister(email, password) {
    signUp(email, password)
      .then(() => {
        setPopupStatus({ image: checkmarkImg, message: 'Вы успешно зарегистрировались!' });
        navigate("/signin");
      })
      .catch(() => {
        setPopupStatus({ image: crossImg, message: 'Что-то пошло не так! Попробуйте еще раз.' });
      })
      .finally(handleInfoTooltip);
  };

  //Выход пользователя
  function handleLogOut() {
    setIsLoggedIn(false);
    localStorage.removeItem('jwt');
    setEmailValue(null);
    navigate("/signin");
  };

  //Инфо об успешной авт/рег и нет
  function handleInfoTooltip() {
    setInfoTooltip(true);
  };

  //Обновляем стейт, если токен уже есть, то LoggIn и EmailValue
  React.useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      checkToken(jwt)
        .then((res) => {
          if (res) {
            setIsLoggedIn(true);
            setEmailValue(res.data.email);
            navigate('/');
          }
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [navigate]);

  //Данные пользователя и карточки
  React.useEffect(() => {
    if (isLoggedIn) {
      Promise.all([
        api.getUserInfo(),
        api.getInitialCard()
      ])
        .then(([user, card]) => {
          setCurrentUser(user.data)
          setCards(card.data);
        })
        .catch((err) => {
          console.log(`Ошибка при получении данных: ${err}`);
        })
    }
  }, [isLoggedIn]);

  //Обработчик клика по изображению (попап)
  function handleCardClick(props) {
    setSelectedCard(props);
  }

  //Обработчик для отправки данных пользователя на сервер 
  function handleUpdateUser(user) {
    api.setUserInfo(user)
      .then((res) => {
        setCurrentUser(res.data);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  //Обработчик для обновления аватара 
  function handleUpdateAvatar(user) {
    api.addNewAvatar(user)
      .then(res => {
        setCurrentUser(res.data);
        closeAllPopups();
      })
      .catch(err => console.log(err))
  }

  //Обработчик кнопки редактирования аватарки
  function handleEditAvatarClick() {
    setIsAvatarPopupOpen(true);
  }

  //Обработчик кнопки редактирования данных польз
  function handleEditProfileClick() {
    setIsProfilePopupOpen(true);
  }

  //Обработчик кнопки добавления карточки
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  //Обработчик закрытия попапов
  function closeAllPopups() {
    setIsAddPlacePopupOpen(false);
    setIsAvatarPopupOpen(false);
    setIsProfilePopupOpen(false);
    setSelectedCard(null);
    setInfoTooltip(false);
  }

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.changeLikeCardStatus(card._id, isLiked).then((newCard) => {
      setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    })
      .catch((err) => {
        console.log(err);
      });
  }

  //Функция удаления карточки, по аналогии с функцией лайка
  function handleCardDelete(card) {
    api.removeCard(card._id)
      .then(() => {
        setCards(cards.filter(item => item._id !== card._id));
      })
      .catch(err => console.log(err));
  }

  //Функция добавления карточки
  function handleAddPlace(card) {
    api.addNewCard(card)
      .then(res => {
        setCards([...cards, res.data]);
        closeAllPopups();
      })
      .catch(err => console.log(err))
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">

        <Routes>
          <Route exact path='/'
            element={
              <>
                <Header
                  title='Выйти'
                  route=''
                  email={emailValue}
                  onClick={handleLogOut}
                />
                <ProtectedRoute
                  component={Main}
                  isLoggedIn={isLoggedIn}
                  isEditAvatarPopupOpen={handleEditAvatarClick}
                  isEditProfilePopupOpen={handleEditProfileClick}
                  isAddPlacePopupOpen={handleAddPlaceClick}
                  onCardClick={handleCardClick}
                  cards={cards}
                  onCardLike={handleCardLike}
                  onCardDelete={handleCardDelete}
                />
              </>
            }
          />
          <Route path='/signup'
            element={
              <>
                <Header
                  title='Войти'
                  route='/signin'
                />
                <Register
                  onRegister={handleRegister}
                />
              </>
            }
          />

          <Route path='/signin'
            element={
              <>
                <Header
                  title='Регистрация'
                  route='/signup'
                />
                <Login
                  onLogin={handleLogin}
                />
              </>
            }
          />

          <Route exact path="*"
            element={
              isLoggedIn ? <Navigate to="/" /> : <Navigate to="/signin" />
            }
          />
        </Routes>

        <Footer />

        <InfoTooltip
          popupStatus={popupStatus}
          isOpen={infoTooltip}
          onClose={closeAllPopups}
        />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />
        <PopupWithForm
          onClose={closeAllPopups}
          name="confirm-delete"
          title="Вы уверены?"
          buttonName="Да"
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlace}
        />
        <ImagePopup
          card={selectedCard}
          onClose={closeAllPopups}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
