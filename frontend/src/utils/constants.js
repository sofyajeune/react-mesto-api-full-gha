export const profileUserName = document.querySelector(".profile__name");
export const profileUserJob = document.querySelector(".profile__position");
export const popupEditForm = document.querySelector(".popup_type_edit-form");
export const nameInput = popupEditForm.querySelector(".popup__input_data_name");
export const jobInput = popupEditForm.querySelector(".popup__input_data_job");
export const profileEditButton = document.querySelector(".profile__edit-button");
export const popupAvatar = document.querySelector(".popup_type_edit-avatar");
export const buttonPopupAvatar = document.querySelector(".profile__avatar-edit-button");
export const profileAvatar = document.querySelector(".profile__avatar");
export const popupAvatarSaveButton = popupAvatar.querySelector(".popup__save");
export const currentId = '91d3b37e72a26c95da2ccfd1';
export const popupDeleteCard = document.querySelector(".popup_type_delete-card");
export const popupDeleteCardSubmit = popupDeleteCard.querySelector(".popup__save");
export const templateSelector = '#cardsTemplate';

export const plusButton = document.querySelector(".profile__plus-button");
export const formElementPhoto = document.querySelector(".popup_type_add-card");
export const photoInput = document.querySelector(".popup__input_data_photo");
export const urlInput = document.querySelector(".popup__input_data_url");

export const cards = document.querySelector(".cards");

export const popupOpenPhotoImage = document.querySelector(".popup__image");
export const popupOpenPhotoCaption = document.querySelector(".popup__caption");
export const popupOpenPhoto = document.querySelector(".popup_type_open-image");

export const popups = document.querySelectorAll(".popup");
export const popupGeneralButtonSubmit = popupEditForm.querySelector(".popup__save");
export const popupAddButton = formElementPhoto.querySelector(".popup__save");

export const settingsValidation = {
    formSelector: ".popup__form",
    inputSelector: ".popup__input",
    submitButtonSelector: ".popup__save",
    inactiveButtonClass: "popup__save_disabled",
    inputErrorClass: "popup__input_error",
};

export const options = {
    link: 'https://mesto.nomoreparties.co/v1/cohort-55/',
    headers: {
        authorization: '129cec41-0265-437c-8285-b8860fe417f8',
        'Content-Type': 'application/json'
    }
  }