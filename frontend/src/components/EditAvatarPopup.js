import React from 'react';
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup(props) {

    const { isOpen, onClose, onUpdateAvatar } = props

    //Реф для доступа к инпуту
    const avatarRef = React.useRef('');
    
    //Очистка поля ввода ссылки после закрытия попапа
    React.useEffect(() => {
        avatarRef.current.value = '';
    }, [isOpen])

    //Обработчик сабмита формы (обновление аватара)
    function handleSubmit(event) {
        event.preventDefault();

        onUpdateAvatar({
            avatar: avatarRef.current.value
        });
    }

    return (
        <PopupWithForm
            name="edit-avatar"
            title="Обновить аватар"
            isOpen={isOpen}
            onClose={onClose}
            buttonName="Сохранить"
            onSubmit={handleSubmit}
        >
            <input id="input-avatar" type="url" name="avatar" className="popup__input popup__input_avatar" required  ref={avatarRef}/>
            <span id="input-avatar-error" className="popup__form-input-error"> </span>

        </PopupWithForm>
    )
}

export default EditAvatarPopup;