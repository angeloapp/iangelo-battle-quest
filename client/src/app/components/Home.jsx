import React from "react";
import "./../stylesheets/app.scss";
import "./../stylesheets/pages/home.scss";

import { connect } from 'react-redux';
import * as playerAction from './../actions/playerAction';

function mapDispatchToProps(dispatch) {
  return {
    setPlayerName: name => dispatch(playerAction.setPlayerName(name))
  };
}

const mapStateToProps = (state) => {
  return {
    player: state.player
  }
}

class Home extends React.Component {

  constructor(props){
    super(props);
    this.state = { name: '' };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(){
    let name;

    if(isNaN(this.state.name) && this.state.name.trim().length > 0){
      name = this.state.name.trim();
    } else {
      name = "iAngelo" + (this.state.name || Math.floor(Math.random() * 999));
    }

    this.props.setPlayerName(name);
    this.props.history.push('/play');
  }

  handleChange(event){
    this.setState({ name: event.target.value });
  }

  UNSAFE_componentWillMount(){
    if(this.props.player.name){
      window.location.reload(false);
    }
  }

 render() {
  return (
    <div id="home">
      <div className="overlay"></div>
      <div className="header">
        <h1>iAngelo Battle Quest</h1>
        <h2>entra a la arena, sobrevive y domina el ranking</h2>
      </div>
      <div className="play_form_container">
        <div className="play_form row">
          <div className="name">
            <input
              type="text"
              maxLength="20"
              name="name"
              placeholder="Nombre de guerrero"
              value={this.state.name}
              onChange={this.handleChange}
            />
          </div>
          <div className="play">
            <button onClick={this.handleClick} className="btn">Entrar</button>
          </div>
        </div>
      </div>
      <div className="container row justify-content-between about">
        <div className="col-md-4 col-xs-6">
          <h2>Sobre el juego</h2>
          <p><span>iAngelo Battle Quest</span> es una arena multijugador 2D donde cada jugador entra a un campo abierto, recolecta ventaja y pelea por sobrevivir.</p>
          <p>La meta es simple: moverte con precisión, eliminar rivales, cuidar tu salud y quedar arriba en el tablero.</p>
        </div>
        <div className="col-md-4 col-xs-6 how-to">
          <h2>Cómo jugar</h2>
          <ul>
            <li>Usa las flechas del teclado para moverte; en móvil usa el joystick.</li>
            <li>Haz clic para disparar; en móvil usa el botón de ataque.</li>
            <li>La mira del mouse define la dirección del personaje.</li>
            <li>Invita a tus amigos y conquista la arena.</li>
          </ul>
        </div>
      </div>
    </div>
  );
 }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
