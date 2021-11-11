// React, Hooks
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// Context
import { UserConsumer } from '../userContext';

// Services
import postServices from '../../services/postServices'

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
    const [articles, setArticles] = useState([]);
    const [latestDoc, setLatestDoc] = useState(0);
    const [isEnd, setIsEnd] = useState(false);
    const [updateParent, setUpdateParent] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const updateParentHandler = () => {
        setUpdateParent(prevState => !prevState);
    }

    const updateArticlesState = () => {
        postServices.getMore(5, latestDoc)
            .then(data => {
                if (data !== undefined) {
                    setArticles(prevState => [...prevState, ...data.collection]);
                    setLatestDoc(data.latestDoc);
                } else {
                    setIsEnd(true);
                }

            })
            .catch(err => console.log(err))
    }

    useEffect(() => {
        setIsLoading(true);

        postServices.getInitial(5)
            .then(data => {
                if (data !== undefined) {
                    console.log(data);
                    setArticles(prevState => [...prevState, ...data.collection]);
                    setLatestDoc(data.latestDoc);
                } else {
                    setIsEnd(true);
                }

                setIsLoading(false);

            })
            .catch(err => console.log(err))
    }, [])

    // componentDidUpdate() {
    //     if (this.state.updateParent) {
    //         postServices.getInitial(this.state.articles.length)
    //             .then(data => {
    //                 if (data !== undefined) {
    //                     this.setState(prevState => ({
    //                         articles: [...data.collection],
    //                     }));
    //                 }

    //             })
    //             .catch(err => console.log(err))

    //         this.setState({ updateParent: false })
    //     }
    // }

    return (

        <div className={style.main}>
            <h3 className={style.activityTitle}>- DISCOVER PLACES -</h3>

            <UserConsumer>
                {
                    (userCheck) => {
                        if (userCheck.isLogged) {
                            return <Link to="/create" ><button className={style.createButton}><FontAwesomeIcon icon={faPlusSquare} /> ADD A NEW PLACE</button></Link>
                        }
                    }
                }
            </UserConsumer>

            {isLoading
                ? <FontAwesomeIcon icon={faCompass} className={style.spinner} spin />
                : articles.length > 0
            ? <>
                {articles.map(article => (
                    <Article
                        key={article.id}
                        articleData={article}
                        updateParent={updateParentHandler}
                    />
                ))}
                {isEnd
                    ? <div className={style.endContainer}>
                        <FontAwesomeIcon icon={faMapSigns} className={style.endIcon} />
                        <span className={style.endText}>YOU REACHED THE END</span>
                    </div>
                    : <div className={style.showMoreContainer}>
                        < button
                            onClick={() => {
                                updateArticlesState();
                            }}
                            className={style.showMore}
                        >
                            SHOW MORE
                        </button>
                        <FontAwesomeIcon icon={faChevronDown} />
                    </div>
                }
            </>
            : <p className={style.noPlaces}>No places yet</p>
            }

        </div>
    )
}

export default Main;