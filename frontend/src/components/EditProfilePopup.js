import React from 'react';
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditProfilePopup(props) {

    const { isOpen, onClose, onUpdateUser } = props
    //Подписываемся на контекст
    const currentUser = React.useContext(CurrentUserContext);

    const [name, setName] = React.useState('');
    const [description, setDescription] = React.useState('');

  // После загрузки текущего пользователя из API
// его данные будут использованы в управляемых компонентах.
    React.useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser, isOpen])

    //Функция для изменения имени
    function handleUserNameChange(event) {
        setName(event.target.value)
    }

    //Функция для изменения описания
    function handleUserDescriptionChange(event) {
        setDescription(event.target.value)
    }

    //Обработчик сабмита формы
    function handleSubmit(event) {
        event.preventDefault();
        //Передача значений управляемых компонентов во внешний обработчик
        onUpdateUser({
            name: name,
            about: description
        });
    }

    return (

        <PopupWithForm
            name="edit-form"
            title="Редактировать профиль"
            isOpen={isOpen}
            onClose={onClose}
            buttonName='Сохранить'
            onSubmit={handleSubmit}>
            <input type="text" name="name" className="popup__input popup__input_data_name" id="data_name" minLength={2} maxLength={40} placeholder="Имя" required onChange={handleUserNameChange} value={name || ""} />
            <span className="popup__form-input-error" id="data_name-error" />
            <input type="text" name="about" className="popup__input popup__input_data_job" id="data_job" minLength={2} maxLength={200} placeholder="О себе" required onChange={handleUserDescriptionChange} value={description || ""} />
            <span className="popup__form-input-error" id="data_job-error" />
        </PopupWithForm>
    )
}

export default EditProfilePopup;