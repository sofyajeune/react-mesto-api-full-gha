import React from "react";
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card(props) {

  const { card, onCardClick, onCardLike, onCardDelete } = props

const currentUser = React.useContext(CurrentUserContext);

// Определяем, являемся ли мы владельцем текущей карточки
const isOwn = card.owner._id === currentUser._id;

//Переменная для класса кнопки удаления (если карточка моя - показываем корзину)
const cardDeleteButtonClassName = `cards__button-remove ${
    isOwn ? "" : "cards__button-remove_hidden"
  }`;


  //Определяем, есть ли у карточки поставленный нами лайк
  const isLiked = card.likes.some(i => i._id === currentUser._id);

  //Переменная для класса кнопки лайка
  const cardLikeButtonClassName = 
    `cards__like-button ${isLiked && 'cards__like-button_active'}`;

  //const cardLikeButtonClassName = (
  //  `cards__like-button ${isLiked ? 'cards__like-button_active' : ''}`
  //);


  //Обработчик клика по карточке
  function handleCardClick() {
    onCardClick(card)
  }

  //Обработчик клика по лайку
  function handleCardLike() {
    onCardLike(card)
  }

  //Обработчик удаления карточки
  function handleDeleteCard() {
    onCardDelete(card)
  }


    return (
        <div className="cards__elements">
            <article className="cards__article">
                <img className="cards__photo" src={card.link} alt={card.name} onClick={handleCardClick} />
                <div className="cards__flex">
                    <h2 className="cards__text">{card.name}</h2>
                    <div>
                        <button className={cardLikeButtonClassName} onClick={handleCardLike}></button>
                        <p className="cards__amount-likes">{card.likes.length}</p>
                    </div>
                </div>
            </article>
            <button className={cardDeleteButtonClassName} onClick={handleDeleteCard}></button>
        </div>
    );
}



export default Card;