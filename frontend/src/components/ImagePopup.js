function ImagePopup(props) {

    const { card, onClose } = props;

    return (
        <div className={`popup_type_open-image popup ${card && "popup_opened"}`}>
            <div className="popup__container popup__container_type_open-image">
                <button onClick={onClose} className="popup__close-button" type="button" />
                <figure className="popup__photo">
                    <img className="popup__image" src={card ? card.link : ""} alt={card ? card.name : ""} />
                    <figcaption className="popup__caption">{card ? card.name : ""}</figcaption>
                </figure>
            </div>
        </div >
    )
}

export default ImagePopup;