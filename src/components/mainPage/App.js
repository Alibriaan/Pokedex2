import React from 'react';
import Header from '../header/Header';
import Footer from '../footer/Footer';
import PokeList from '../card_list/List';
import Loader from '../loader/Loader';

import { observer, inject} from 'mobx-react';

const App = inject('PokemonStore')(observer(props => {
        
      props.PokemonStore.pokemon = undefined;
      props.PokemonStore.pokemonSpecies = undefined;
      props.PokemonStore.status = undefined;
  
    return(
      <div>
        {
          props.PokemonStore.fadeStart  ? (
          <div>
        <Header />
        <PokeList />
        <Footer />
        </div> ) : 
          ( <Loader />)

        }
        </div>
    );
}));


export default App;