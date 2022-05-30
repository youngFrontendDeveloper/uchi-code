import styles from "./Cats.module.css";
import { useEffect, useState } from "react";
import axios from "axios";
import CatsItem from "./CatsItem";

const FAVORITE_CATS_KEY = "FAVORITE_CATS_KEY";

function Cats() {
  const [ cats, setCats ] = useState( [] );  // массив с картинками
  const [ Filter, setFilter ] = useState( "All" );  //  Фильтр для всех или любимых котиков
  const [ catsLiked, setCatsLiked ] = useState( () => {
    const catsLiked = localStorage.getItem( FAVORITE_CATS_KEY );
    return catsLiked == null ? [] : JSON.parse( catsLiked );
  } );  // Массив лайкнутых котиков

  const [ currentPage, setCurrentPage ] = useState( 1 ); //  текущая страница
  const [ fetching, setFetching ] = useState( true ); // булево значение для новой подгрузки страниц
  const [ totalCount, setTotalCount ] = useState( 0 ); // общее количество страниц с фотографиями на сервере
  // const [ isLiked, setLiked ] = useState( false );
  let array = [];
  console.log( catsLiked );
  // Получаем данные с сервера
  const catsList = async() => {
    return axios
      // .get( `https://api.thecatapi.com/v1/images/search?format=json&limit=15&mime_types=true&page=${ currentPage }&size=small&order=ASC`, {
      .get( `https://api.thecatapi.com/v1/images/search?format=json&limit=15&mime_types=true&order=ASC&size=small&page=${ currentPage }`, {
        Headers: "X-Api-Key: 09c67295-b193-4975-bde3-96928196dffd",
        Body: undefined
      } )
      .then( response => {
        setCats( [ ...cats, ...response.data ] );
        setCurrentPage( prevState => prevState + 1 );
        setTotalCount( response.headers[ "x-total-count" ] );

      } )
      .catch( err => err.message )
      .finally( () => setFetching( false ) );
  };

  // Создаем массив из понравившихся кошек
  const likeCat = (cat, i) => {
    if( catsLiked.includes( cat ) ) {
      const newCatsLiked = [ ...catsLiked ];
      newCatsLiked.splice( i, 1 );
      setCatsLiked( [ ...newCatsLiked ] );
      // console.log( catsLiked );
    } else {
      setCatsLiked( [ ...catsLiked, cat ] );
    }
  };

  const handleChangeAll = () => {
    setFilter( "All" );
  };

  const handleChangeFavorite = () => {
    setFilter( "Favorite" );
  };

  // const getLikedCat =()=>{
  //   setLiked(!isLiked)
  // }

  //  Добавляем в массив с понравившимися котиками нового
  // const likeCat = (id) => {
  //   setCatsLiked( [ ...catsLiked, id ].filter( (id, i, arr) => {
  //     return arr.indexOf( id ) == i;
  //   } ) );
  // };

  // Удаляем котика из понравившихся
  // const unlikeCat = (idForDelete) => {
  //   setCatsLiked( catsLiked.filter( (id) => {
  //     return id !== idForDelete;
  //   } ) );
  // };

  if( Filter === "All" ) {
    array = cats;
  } else if( Filter === "Favorite" ) {
    array = catsLiked;
  }

  useEffect( () => {
    catsList();
  }, [ fetching ] );

  useEffect( () => {
    localStorage.setItem( FAVORITE_CATS_KEY, JSON.stringify( catsLiked ) );
  }, [ catsLiked ] );

  //  Слушаем событие scroll:
  useEffect( () => {
    document.addEventListener( "scroll", scrollHandler );
    return function() {
      document.removeEventListener( "scroll", scrollHandler );
    };
  }, [] );

  // Функция для определения, дошел ли пользователь до конца страницы или нет:
  const scrollHandler = (e) => {
    if( e.target.documentElement.scrollHeight - ( e.target.documentElement.scrollTop + window.innerHeight ) < 100 && cats.length <= totalCount ) {
      setFetching( true );
    }
  };

  return (
    <div className={ styles.cats__wrap }>
      <div className={ styles.cats__buttonsWrap }>
        <div className={ styles.cats__buttons }>
          <button
            className={ Filter == "All" ? [ styles.cats__button, styles.cats__buttonActive ].join( " " ) : styles.cats__button }
            onClick={ handleChangeAll }>Все котики
          </button>
          <button
            className={ Filter == "Favorite" ? [ styles.cats__button, styles.cats__buttonActive ].join( " " ) : styles.cats__button }
            onClick={ handleChangeFavorite }>Любимые котики
          </button>
        </div>
      </div>
      <div className={ styles.cats }>
        {
          array.map( (cat, i) => (
            <CatsItem key={ cat.id }
                      cat={ cat }
                      i={ i }
                      likeCat={ likeCat }
                      Filter={ Filter }
            />
          ) )

        }
      </div>
      <p className={ styles.cats__text }>{ Filter == "All" ? ( "... загружаем еще котиков ..." ) : "" }</p>
    </div>
  );
}

export default Cats;