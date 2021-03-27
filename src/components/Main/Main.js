import style from './Main.module.css'

import { Link } from 'react-router-dom';
import { Component } from 'react';
import { UserConsumer } from '../userContext';
import postServices from '../../services/postServices'
import Article from '../Article/Article'


class Main extends Component {

    constructor(props) {
        super(props)

        this.state = {
            articles: [],
            latestDoc: 0,
            isEnd: false,
            updateParent: false
        }

        this.updateParent = this.updateParent.bind(this);
    }

    updateParent() {
        this.setState(prevState => ({
            updateParent: !prevState.updateParent
        }))
    }

    updateArticlesState() {
        postServices.getMore(2, this.state.latestDoc)
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

        postServices.getInitial(2)
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

    componentDidUpdate() {
        if (this.state.updateParent) {
            postServices.getInitial(this.state.articles.length)
            .then(data => {
                console.log(data);
                if (data !== undefined) {
                    this.setState(prevState => ({
                        articles: [...data.collection],
                    }));
                }

            })
            .catch(err => console.log(err))

            this.setState({updateParent: false})
        }
    }

    render() {

        return (

            <div className={style.main}>
                <h3 className={style.activityTitle}>Activity Feed</h3>

                <UserConsumer>
                    {
                        (userCheck) => {

                            {
                                if (userCheck.isLogged) {
                                    return <Link to="/create" ><button className={style.createButton}>CREATE</button></Link>
                                }

                            }

                        }
                    }
                </UserConsumer>

                {this.state.articles.map(article => (
                    <Article
                        key={article.id}
                        articleData={article}
                        updateParent={this.updateParent}
                    />
                ))}

                {this.state.isEnd ?
                    <p className={style.end}>-NO MORE PLACES TO SHOW-</p>
                    :
                    <button onClick={() => {
                        this.updateArticlesState();
                    }} className={style.showMore}>
                        SHOW MORE
                    </button>
                }

            </div>
        )
    }

}

export default Main;