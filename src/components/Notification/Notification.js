import style from './Notification.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons'
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'

const Notification = ({ type, message }) => {

    return (
        <div className={`${style.notification} ${type === 'good' ? style.good : style.bad}`}>
            {type === 'good' ?
                <FontAwesomeIcon icon={faCheckCircle} className={style.notificationIcon} />
                :
                <FontAwesomeIcon icon={faTimesCircle} className={style.notificationIcon}/>
            }
            <span className={style.notificationMessage}>{message}</span>
        </div>
    )
}


export default Notification