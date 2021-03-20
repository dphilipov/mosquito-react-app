import { Link } from 'react-router-dom';
import Details from '../Details/Details';

import pin from './location-map-pin.svg'
import like from './badge-winner-won-star-award.svg'
import style from './Article.module.css'

const Article = ({ props }) => {

    return (
        <article className={style.pointOfInterest}>
            <div className={style.poiPreview}>
                <Link to={`/article/${props.id}`}>
                    <img src={props.imgUrl} alt="Thumbnail" className={style.thumbnail} />
                </ Link>
            </div>
            <div>
                <h2>{props.title}</h2>
                <p>{props.description}</p>
                <span><strong>Date Added:</strong> {props.dateCreated}</span>
                <a href="/like"><img src={like} alt="Like" className={style.like}
                    title="Like" /></a>
                <a href="/like"><img src={pin} alt="Like button" className={style.pin}
                    title="Add to map" /></a>
            </div>
        </article>
    )
}

export default Article;