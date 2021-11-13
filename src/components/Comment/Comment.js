// CSS
import style from './Comment.module.css';

const Comment = ({ commentInfo }) => {
    let { user, comment, date } = commentInfo;

    return (
        <div className={style.comment}>
            <h4>{user}</h4>
            <p>{comment}</p>
            <span>{date}</span>
        </div>
    )
}

export default Comment;