import style from './Main.module.css'

import { Link } from 'react-router-dom';
import Article from '../Article/Article'

const Main = ({ articles }) => {
    return (

        <div className={style.main}>
            <h3 className={style.activityTitle}>Activity Feed</h3>

            <Link to="/create" ><button className={style.createButton}>CREATE</button></Link>

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