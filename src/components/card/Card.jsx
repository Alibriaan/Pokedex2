import React from 'react'
import { Link } from 'react-router-dom'

import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'

import { observer, inject} from 'mobx-react';

import Img from 'react-image'
import er404 from './Pokeball.png';
import spinn from './loader.gif';

const colors = {
  bug: 'B1C12E',
  dark: '4F3A2D',
  dragon: '755EDF',
  electric: 'FCBC17',
  fairy: 'F4B1F4',
  fighting: '823551D',
  fire: 'E73B0C',
  flying: 'A3B3F7',
  ghost: '6060B2',
  grass: '74C236',
  ground: 'D3B357',
  ice: 'A3E7FD',
  normal: 'C8C4BC',
  poison: '934594',
  psychic: 'ED4882',
  rock: 'B9A156',
  steel: 'B5B5C3',
  water: '3295F6'
}

const useStyles = makeStyles({

  number: {
    display: 'flex',
    justifyContent: 'center',
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  },
  types: {
    marginTop: '10px',
    display: 'flex',
    justifyContent: 'space-around'
  },
  name: {
    flexGrow: 1,
    display: 'flex',
    justifyContent: 'center',
    textAlign: 'center'
  },
  avatar: {
    display: 'flex',
    justifyContent: 'center'

  },
  avatarSize: {
    width: 120,
    height: 120
  },
  typesName:
{
  display: 'block',
  padding: '3px',
  width: '50px',
  textAlign: 'center ',
  boxShadow: ' 0px 0px 10px 0.5px rgba(0,0,0,0.2)'
},

  card: {
    display: 'block',
    margin: ' 8px 6px 10px 8px',
    width: '160px',
    height: '280px'
  },
  actionArea:
  {
    width: '100%',
    height: '100%',
  }
})



const PokeCard = inject('PokemonStore')(observer((props) => {

  const classes = useStyles()


  return (
    <Card className={classes.card}>
      <Link to ={props.lin} style={{ textDecoration: 'none', color: 'black' }} >
        <CardActionArea className={classes.actionArea}>
          <CardContent >
            <Typography className={classes.number} color="textSecondary" gutterBottom>
              {props.number}
            </Typography>
            <Typography variant="h6"  className={classes.name}>
              {props.name}
            </Typography >
            <Box className={classes.avatar} >
              <Img className={classes.avatarSize} alt="error" src={props.ava} loader={<img className={classes.avatarSize} src={spinn}/>} unloader={<img className={classes.avatarSize} src={er404}/>} />
            </Box>
            <Typography className={classes.types} color="textSecondary">
              {props.types.map(item => (<div style={{ backgroundColor: '#' + (item.type.name === 'fighting' ? 'FFFFFF' : colors[item.type.name]), color: ((item.type.name === 'fighting') ? 'DimGray' : 'White') }} className={classes.typesName}><h5>{item.type.name}</h5></div>
              ))}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Link>
    </Card>
  )
}));

export default PokeCard

// 39 стр