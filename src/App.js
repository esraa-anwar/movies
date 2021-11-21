import React, { useEffect, useState } from 'react';

import './App.css';
import Movies from "./component/Movies"
const FEATURED_API = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1";

const SEARCH_API = "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query="

function App ()
{
  const [ movie, setMovie ] = useState( [] );
  const [ searchTerm, setSearchTerm ] = useState( '' );
  useEffect( () =>
  {
    getApi( FEATURED_API )
  }, [] )
  const getApi = ( API ) =>
  {
    fetch( API )
      .then( ( res ) => res.json() )
      .then( ( data ) =>
      {
        console.log( data.results )
        setMovie( data.results )
      } )
  }
  const handlerOnSubmit = ( e ) =>
  {
    e.preventDefault();
    if ( searchTerm )
    {
      getApi( SEARCH_API + searchTerm )

      setSearchTerm( "" )
    }
  };
  const handleOnChange = ( e ) =>
  {
    setSearchTerm( e.target.value );
  };
  return ( <>
    <header>
      <form onSubmit={ handlerOnSubmit }>
        <input className="search" value={ searchTerm } type="search" placeholder="search..." onChange={ handleOnChange } />
      </form>  </header>
    <div className="movie-container">

      { movie.length > 0 && movie.map( mov => <Movies { ...mov } key={ mov.id } /> ) }

    </div></>
  );
}

export default App;
