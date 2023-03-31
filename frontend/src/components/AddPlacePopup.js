import React from 'react';
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {

    const { isOpen, onClose, onAddPlace } = props 
    
    //Стейты для имени и ссылки на картинку
    const [cardTitle, setCardTitle] = React.useState('');
    const [cardLink, setCardLink] = React.useState('');

    //Обработчик установки названия места
    function handleCardTitle(event) {
        setCardTitle(event.target.value)
    }

    //Обработчик для ссылки для карт
    function handleCardLink(event) {
        setCardLink(event.target.value)
    }

    //Обработчик сабмита формы добавления карточки
    function handleSubmit(event) {
        event.preventDefault();

        onAddPlace({
            name: cardTitle,
            link: cardLink
        })
    }

    React.useEffect(() => {
        setCardLink('')
        setCardTitle('')
    }, [isOpen])

    return (
        <PopupWithForm
            name="add-card"
            title="Новое место"
            isOpen={isOpen}
            onClose={onClose}
            buttonName="Создать"
            onSubmit={handleSubmit}>
            <input type="text" name="name" className="popup__input popup__input_data_photo" id="data_photo" placeholder="Название" minLength={2} maxLength={30} required onChange={handleCardTitle}
        value={cardTitle ? cardTitle : ''}/>
            <span className="popup__form-input-error" id="data_photo-error" />
            <input type="url" name="link" className="popup__input popup__input_data_url" id="data_url" placeholder="Ссылка на картинку" required onChange={handleCardLink}
        value={cardLink ? cardLink : ''}/>
            <span className="popup__form-input-error" id="data_url-error" />
        </PopupWithForm>
    )
}

export default AddPlacePopup;