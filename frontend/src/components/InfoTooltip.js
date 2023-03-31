export default function InfoTooltip(props) {

  const {popupStatus, isOpen, onClose} = props;
  
    return (
      <section className={`popup popup_type_infotooltip ${isOpen && 'popup_opened'}`}>
        <figure className="popup__container">
        <button onClick={onClose} className="popup__close-button" type="button" />
          <img src={popupStatus.image} alt={`Информационное сообщение: ${popupStatus.message}`} className="popup__icon" />
          <figcaption className="popup__icon-caption">{popupStatus.message}</figcaption>
        </figure>
      </section>
    );
  };