import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/mainPage/App';
import CurrentPokemon from './components/pokemonPage/PokemonPage'
import About from './components/aboutPage/About';
import Error from './components/error/Error';
import {Provider} from 'mobx-react';
import { HashRouter, Switch, Route } from 'react-router-dom'

import PokemonStore from './store/Store';

import './index.css';

const Root = (
<Provider PokemonStore={PokemonStore}>
<HashRouter>
    <Switch >
    <Route path = "/" exact component = {App}/>
      <Route path = "/about" component = {About}/>
      <Route path = "/pokemon" exact render={() => <Error error_type="POKEMON NOT SELECTED"/>}/>
      <Route path = "/:labuda" exact render={() => <Error error_type="INVAILD URL"/>}/>
      <Route path = "/pokemon/:id" exact component = {CurrentPokemon}/>
      <Route path = "/:labuda/:labuda2/" render={() => <Error error_type="INVAILD URL"/>}/>
      <Route path = "/:labuda/:labuda2/:labuda3" exact render={() => <Error error_type="INVAILD URL"/>}/>
    </Switch>
  </HashRouter>
</Provider>
);

ReactDOM.render(Root, document.getElementById('root'));
