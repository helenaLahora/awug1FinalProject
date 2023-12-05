import React from 'react';
import './App.css';
import Card from './Cards';
import Search from './Searcher';



class AnimeList extends React.Component {
  constructor() {
    super();
    this.state = {
      list: [],
    }
    this.dadas = this.dadas.bind(this);
  }   


  componentDidMount() {//es com un start de unity, no es pot canviar el nom. 
    this.dadas("");
  }

  dadas() {

    fetch('https://ghibliapi.vercel.app/films')
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          list: data.results //ens interessa l'array que esta a results.
        });
      })
      .catch((error) => {
        console.error(error);
      });

  }

  render() {//es crida per escriure l'html del component. Comprovar que l'array no estigui buit. 
    // aqui va html. si fico això: {} puc escriure javascript
    return (
      <div>
        <div className='searcher'>
          <Search />
        </div>
        <div className='VgWrap'>
          <div className='cc'>
            <div className='cards'>
              {this.state.list.map(element => {
                return (<Card name={element.title} img={element.image} orgTitle={element.original_title} dire={element.director} date={element.release_date} key={element.id} id={element.id} />) //html la part d ename que seria el nom de la variable, element.name és javascript per tant hauria d'anar amb {}
              })}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

//si crido la funció amb parèntesis li dic que executo la funció ara mateix però si ho faig sense parèntesis passo la funció però sense executar-la.


export default AnimeList;
