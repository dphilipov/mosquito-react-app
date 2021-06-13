import style from './Main.module.css'
import { Link } from 'react-router-dom';
import { Component } from 'react';
import { UserConsumer } from '../userContext';
import postServices from '../../services/postServices'
import Article from '../Article/Article'
import mountain from './mountain-peak-icon.png';
import spinner from './ajax-loader.gif';

class Main extends Component {

    constructor(props) {
        super(props)

        this.state = {
            articles: [],
            latestDoc: 0,
            isEnd: false,
            updateParent: false,
            isLoading: false
        }

        this.updateParent = this.updateParent.bind(this);
    }

    updateParent() {
        this.setState(prevState => ({
            updateParent: !prevState.updateParent
        }))
    }

    updateArticlesState() {
        postServices.getMore(5, this.state.latestDoc)
            .then(data => {
                if (data !== undefined) {
                    this.setState(prevState => ({
                        articles: [...prevState.articles, ...data.collection],
                        latestDoc: data.latestDoc
                    }));
                } else {
                    this.setState({ isEnd: true });
                }

            })
            .catch(err => console.log(err))
    }

    componentDidMount() {
        this.setState({ isLoading: true });

        postServices.getInitial(5)
            .then(data => {
                if (data !== undefined) {
                    this.setState(prevState => ({
                        articles: [...prevState.articles, ...data.collection],
                        latestDoc: data.latestDoc
                    }));
                } else {
                    this.setState({ isEnd: true });
                }

                this.setState({ isLoading: false });

            })
            .catch(err => console.log(err))
    }

    componentDidUpdate() {
        if (this.state.updateParent) {
            postServices.getInitial(this.state.articles.length)
                .then(data => {
                    if (data !== undefined) {
                        this.setState(prevState => ({
                            articles: [...data.collection],
                        }));
                    }

                })
                .catch(err => console.log(err))

            this.setState({ updateParent: false })
        }
    }

    render() {

        return (

            <div className={style.main}>
                <h3 className={style.activityTitle}>- DISCOVER PLACES -</h3>

                <UserConsumer>
                    {
                        (userCheck) => {
                            if (userCheck.isLogged) {
                                return <Link to="/create" ><button className={style.createButton}>ADD A NEW PLACE</button></Link>
                            }
                        }
                    }
                </UserConsumer>

                {this.state.isLoading === true
                    ? <img className={style.loader} src={spinner} alt="loader"></img>
                    : this.state.articles.length > 0
                        ? <>
                            {this.state.articles.map(article => (
                                <Article
                                    key={article.id}
                                    articleData={article}
                                    updateParent={this.updateParent}
                                />
                            ))}
                            {this.state.isEnd
                                ? <>
                                    <img src={mountain} className={style.endIcon} alt="" />
                                    <span className={style.end}>-NO MORE PLACES TO SHOW-</span>
                                </>
                                : <>
                                    < button
                                        onClick={() => {
                                            this.updateArticlesState();
                                        }}
                                        className={style.showMore}
                                    >
                                        SHOW MORE
                                    </button>
                                    <span className={style.showMoreArrow}>&#9660;</span>
                                </>
                            }
                        </>
                        : <p className={style.noPlaces}>No places yet</p>
                }

            </div>
        )
    }

}

export default Main;