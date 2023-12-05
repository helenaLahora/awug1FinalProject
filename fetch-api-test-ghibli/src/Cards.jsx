import React from 'react';
import './App.css';
import {
  Link
} from 'react-router-dom';

class Card extends React.Component {
  constructor(data) { //data. amb el nom que he ficat abans, seran les propietats que li he passat
    super();
    this.state = { //guardar data en una variable per poder accedir des del render
        info: data
    }
  }


  render() {//es crida per escriure l'html del component. Comprovar que l'array no estigui buit. 
    // aqui va html. si fico això: {} puc escriure javascript
    return ( <div className='infoCards'> 
        <Link key={this.state.info.id} to={`/game/${this.state.info.id}`}><h1>{this.state.info.name}</h1></Link>
       <img src={this.state.info.img} alt={this.state.info.img} className='img1'></img>
       <h3>{this.state.info.orgTitle}</h3>
       <h4>{this.state.info.dire}</h4>
       <h5>{this.state.info.date}</h5>
    </div>)
  }
}

export default Card; //export class, not the name
