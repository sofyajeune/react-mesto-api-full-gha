import logoHeader from '../images/header__logo.svg';
import {Link} from 'react-router-dom';

function Header(props) {

    const {title, route, email, onClick} = props
    return (
        <header className="header">
            <img className="header__logo" src={logoHeader} alt="логотип проекта Место" />
            <div className='header__auth'>
        <p className='header__text'>{email}</p>
        <Link to={route} className='header__link' onClick={onClick}>{title}</Link>
      </div>
        </header>
    )
}

export default Header;
