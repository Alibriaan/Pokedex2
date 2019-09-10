import React  from 'react'
import Card from '../card/Card'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import Fade from '@material-ui/core/Fade'
import Pagination from 'react-js-pagination'
import { observer, inject} from 'mobx-react';

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: '10px',
    backgroundColor: 'Gainsboro',
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center'
  },
  butt:
{
  width: '100%',
  maxHeight: '80%',
  flexGrow: 1,
  display: 'flex',
  justifyContent: 'center'
}
}));

const PokeList = inject('PokemonStore')(observer((props) => {
  const classes = useStyles();

  return (
    <Fade in={props.PokemonStore.fade}>
      <Box component="main">
        <Grid container className={classes.root}>
          <Grid>
            <Grid container justify="center" >   
            {
                props.PokemonStore.pokemons.map( (item) => <Card key={item.id} number={item.id} name={item.name} ava={item.sprites.front_default} types={item.types} lin={'/pokemon/' + item.id} />  )
            }          
            </Grid>
          </Grid>
        </Grid>
        <Box className={classes.butt} mt={2} mb={4}>
        <Pagination hideDisabled pageRangeDisplayed={5} activePage={props.PokemonStore.currentPage}
        itemsCountPerPage={props.PokemonStore.pokemonsPerPage} totalItemsCount={ props.PokemonStore.pokemonsSearch.length === 0 && props.PokemonStore.searchText.length === 0 ? props.PokemonStore.allPokemonsCount : props.PokemonStore.pokemonsSearch.length }
        onChange={props.PokemonStore.changePage}/>
                  </Box>
      </Box>
      </Fade>
  );
}))

export default PokeList;