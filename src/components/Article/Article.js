import pin from './location-map-pin.svg'
import like from './badge-winner-won-star-award.svg'
import style from './Article.module.css'

const Article = (props) => {
    return (
        <article className={style.pointOfInterest}>
        <div className={style.poiPreview}>
            <img src="" className={style.thumbnail}/>
        </div>
        <div>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa, atque. Illo provident doloremque
                quas quis officiis, pariatur accusantium at impedit.</p>
            <span><strong>Date Added:</strong> 4 Jan 2021</span>
            <a href="/like"><img src={like} alt="Like" className={style.like}
                    title="Like"/></a>
            <a href="/like"><img src={pin} alt="Like button" className={style.pin}
                    title="Add to map"/></a>
        </div>
    </article>
    )
}

export default Article;