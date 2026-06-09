import React from "react";
import Phaser from "phaser";
import { Redirect } from "react-router-dom";
import { connect } from 'react-redux';


import LoadingScene from "../game/scenes/Loading";
import PlayScene from "../game/scenes/Play";
import HUDScene from "../game/scenes/HUD";
import GameOverScene from "../game/scenes/GameOver";

import "./../stylesheets/pages/game.scss";


const mapStateToProps = (state /*, ownProps*/) => {
  return {
    player: state.player
  }
}

class Game extends React.Component {

  constructor(props){
