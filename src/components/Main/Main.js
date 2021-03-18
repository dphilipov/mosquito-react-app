import style from './Main.module.css'

import { Link } from 'react-router-dom';
import { Component } from 'react';
import postServices from '../../services/postServices'
import Article from '../Article/Article'

class Main extends Component {

    constructor(props) {
        super(props)

        this.state = {
        	articles: []
        }
    }

    componentDidMount() {
        postServices.getAll()
            .then(collection => {
                this.setState({ articles: collection });
            })
            .catch(err => console.log(err))

    }

    render() {

        return (

            <div className={style.main}>
                <h3 className={style.activityTitle}>Activity Feed</h3>

                <Link to="/create" ><button className={style.createButton}>CREATE</button></Link>

                {this.state.articles.map(article => (
                    <Article
                        key={article.id}
                        props={article}
                    />
                ))}
            </div>
        )
    }

}

export default Main;