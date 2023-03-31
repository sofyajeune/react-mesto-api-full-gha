import React from 'react';
function PopupWithForm(props) {

  const { isOpen, onClose, name, title, buttonName, onSubmit, children } = props;

  return (
    <div className={`popup popup_type_${name} ${isOpen && "popup_opened"}`}>
      <div className="popup__container">
        <button id="closebutton-edit-form" className="popup__close-button" onClick={onClose} type="button" aria-label="закрыть окно" />
        <form className="popup__form" name={name} onSubmit={onSubmit}>
          <h2 className="popup__title">{title}</h2>
          {children}
          <button className="popup__save" type="submit" aria-label="создать">{buttonName}</button>
        </form>
      </div>
    </div>
  )
}

export default PopupWithForm;