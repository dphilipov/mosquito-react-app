// React, Hooks
import { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';

// Context
import AuthContext from '../../context/authContext';

// Components
import Article from '../Article/Article'

// CSS
import style from './Main.module.css'

// FontAwesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusSquare } from '@fortawesome/free-solid-svg-icons'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'
import { faMapSigns } from '@fortawesome/free-solid-svg-icons';
import { faCompass } from '@fortawesome/free-solid-svg-icons'

const Main = () => {
    const user = useContext(AuthContext)

    const [startAfter, setStartAfter] = useState({});
    const [updateParent, setUpdateParent] = useState(false);
    const {
        data: articles,
        latestDoc,
        isEnd,
        isLoading,
        error
    } = useFetch(5, startAfter);

    useEffect(() => {
        user.checkIfLogged();    
    }, [])

    const fetchMoreArticles = () => {
        setStartAfter(latestDoc);
    }

    const updateParentHandler = () => {
        setUpdateParent(prevState => !prevState);
    }

    return (

        <div className={style.main}>
            <h3 className={style.activityTitle}>- DISCOVER PLACES -</h3>

            {user.isLogged && <Link to="/create" ><button className={style.createButton}><FontAwesomeIcon icon={faPlusSquare} /> ADD A NEW PLACE</button></Link>}

            {articles?.map(article => (
                <Article
                    key={article.id}
                    activitiesInfo={article}
                    updateParent={updateParentHandler}
                />
            ))}

            {isLoading
                ? <FontAwesomeIcon icon={faCompass} className={style.spinner} spin />
                :
                isEnd
                    ? <div className={style.endContainer}>
                        <FontAwesomeIcon icon={faMapSigns} className={style.endIcon} />
                        <span className={style.endText}>YOU REACHED THE END</span>
                    </div>
                    : <div className={style.showMoreContainer}>
                        < button
                            onClick={fetchMoreArticles}
                            className={style.showMore}
                        >
                            SHOW MORE
                        </button>
                        <FontAwesomeIcon icon={faChevronDown} />
                    </div>
            }

        </div >
    )
}

export default Main;