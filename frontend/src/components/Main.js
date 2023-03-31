import React from 'react';
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main(props) {

  const { isEditAvatarPopupOpen, isEditProfilePopupOpen, isAddPlacePopupOpen, onCardClick, cards, onCardLike,
    onCardDelete } = props;

  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main>
      <section className="profile">
        <img className="profile__avatar" src={`${currentUser.avatar}`} alt="Аватарка" />
        <button type="button" className="profile__avatar-edit-button" aria-label="кнопка для изменения аватара" onClick={isEditAvatarPopupOpen} />
        <div className="profile__info">
          <h1 className="profile__name" id="name">{currentUser.name}</h1>
          <button className="profile__edit-button" type="button" aria-label="добавление информации" onClick={isEditProfilePopupOpen} />
          <p className="profile__position" id="position-job">{currentUser.about}</p>
        </div>
        <button className="profile__plus-button" type="button" aria-label="редактирование профиля" onClick={isAddPlacePopupOpen} />
      </section>
      <section className="elements" aria-label="Фотографии пользователя">
        <div className="cards">
          {cards.map((card) => (
            <Card
              card={card}
              key={card._id}
              onCardClick={onCardClick}
              onCardLike={onCardLike}
              onCardDelete={onCardDelete} />
          ))}
        </div>
      </section>
    </main>
  )
}

export default Main;


