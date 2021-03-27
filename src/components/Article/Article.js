import { Link } from 'react-router-dom';

import pin from './location-map-pin.svg'
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
                <span>
                    {props.visited.length === 1
                        ? `Visited by ${props.visited.length} person`
                        : `Visited by ${props.visited.length} people`
                    }
                </span>
                <img src={pin} onClick={() => console.log(`click`)} alt="Like button" className={style.pin}
                    title="Add to map" />
            </div>
        </article>
    )
}

export default Article;