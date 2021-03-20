import style from './Details.module.css';
import { useEffect, useState } from 'react';

import postServices from '../../services/postServices';

const Details = ({ match }) => {
    let [article, setArticle] = useState({});
    let petId = match.params.id;

    useEffect(() => {
        postServices.getOne(petId)
            .then(res => {
                setArticle(res)
            })
            .catch(err => console.log(err));
    }, [match]);

    return (
        <div className={style.pointOfInterestDetails}>
            <div className={style.pointOfInterestDetailsTop}>
                <img src={article.imgUrl} alt="Image Preview" />
                <div className={style.buttons}>
                    <button>DELETE</button>
                    <button>EDIT</button>
                </div>
            </div>
            <h2>{article.title}</h2>
            <p>{article.description}</p>
        </div>
    )

}


export default Details;