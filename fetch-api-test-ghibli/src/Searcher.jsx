import React from 'react';
import './App.css';
import {
  Link
} from 'react-router-dom';

class Search extends React.Component {
  constructor(data) {
    super();
    this.state = {
        list: [],
        cont: "",
        listen: data.returnText, //passo tots els paràmetres i data te tots els parametres. 
    }
    this.submitSearch = this.submitSearch.bind(this);
    this.saver = this.saver.bind(this);
  }

submitSearch = (event) =>{//no recarregar pàgina completa
  this.state.listen(this.state.cont);
}

//anar guardant el que escrius en una variable
saver = (event) =>{
  this.setState({cont: event.target.value});
 
  //quan envii formulari podré accedir al text que he escrit.
  //react vol que ho actualitzi amb setState per renderitzar again la pagina.
}


  render() {//es crida per escriure l'html del component. Comprovar que l'array no estigui buit. 
    // aqui va html. si fico això: {} puc escriure javascript
    return  <div> 
        <form onSubmit={this.submitSearch}>
          <label htmlFor="searcher">Buscador de juegos:</label>
          <input onChange={this.saver} type="text" id="searcher"/> 
          {/*An HTML element has been changed */}
          <Link key={this.state.cont} to={`/search/${this.state.cont}`}><button 
          type="submit">Buscar</button></Link>
        </form>
    </div>
  }
}


export default Search;
