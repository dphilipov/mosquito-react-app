import style from './Notification.module.css';
import warningIcon from './warning-icon.png';

const Notification = ({type, message}) => {

    return(
        <div className={`${style.notification} ${type === 'good' ? style.good : style.bad}`}>
            {message}
        </div>
    )
}


export default Notification