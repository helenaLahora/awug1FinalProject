import React from 'react';
import './App.css';
import Card from './Cards';
import Search from './Searcher';

class AnimeResults extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      keyword: props.match.params.keyword
    }
    this.dadas = this.dadas.bind(this);
  }

  componentDidMount() {//es com un start de unity, no es pot canviar el nom. 
    console.log('hola')
    this.setState({ keyword: this.props.match.params.keyword }, this.dadas);
  }

  componentDidUpdate(prevProps) {
    console.log(prevProps.match.params.keyword + ' ' + this.props.match.params.keyword);
    if (prevProps.match.params.keyword !== this.props.match.params.keyword) {
      this.setState({ keyword: this.props.match.params.keyword }, this.dadas);

    }

  }

  dadas() {
    fetch('https://ghibliapi.vercel.app/films&search=' + this.state.keyword + '&search_exact=true')
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          list: data.results, //ens interessa l'array que esta a results.
        }, console.log(data));

      })
      .catch((error) => {
        console.error(error);
      });
  }

  render() {//es crida per escriure l'html del component. Comprovar que l'array no estigui buit. 
    console.log(this.state.keyword);
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
                return (<Card name={element.title} img={element.image} orgTitle={element.original_title} dire={element.director} date={element.release_date} key={element.id} id={element.id} />)
              })}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

//si crido la funció amb parèntesis li dic que executo la funció ara mateix però si ho faig sense parèntesis passo la funció però sense executar-la.


export default AnimeResults;
