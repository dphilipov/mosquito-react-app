import style from './Main.module.css'
import Article from '../Article/Article'

const Main = ({ articles }) => {
    return (

        <div className={style.main}>
            <h3 className={style.activityTitle}>Activity Feed</h3>

            <button className={style.createButton}>CREATE</button>

            {articles.map(article => (
                <Article
                    key={article.id}
                    props={article}
                />
            ))}
        </div>
    )
}

export default Main;