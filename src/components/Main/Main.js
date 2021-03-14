import style from './Main.module.css'
import Article from '../Article/Article'

const Main = () => {
    return (
        <div className={style.main}>
            <h3 className={style.activityTitle}>Activity Feed</h3>

            <button className={style.createButton}>CREATE</button>

            <Article />
        </div>
    )
}

export default Main;