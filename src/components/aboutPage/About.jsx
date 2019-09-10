import React from 'react';

import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'

import { observer, inject} from 'mobx-react';

import Header from '../header/Header'
import Footer from '../footer/Footer'
import logo from './logo.png'


const useStyles = makeStyles(theme => ({

  card: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    [theme.breakpoints.up('md')]: {
      width: '50vw',
      height: '70vh'
    }
  },
  grid: {
    minHeight: '100vh'
  },
  img: {
    Height: '20%',
    width: '20%',
    maxHeight: '300px',
    maxWidth: '300px'

  },
  typogra:
  {
    textAlign: 'center'
  }
}))

const About = inject('PokemonStore')(observer((props) => {
  const classes = useStyles()

   return (
    <Box className={classes.main}>
      <Header disable={true}/>
      <Box component="main">
        <Grid container justify="center" alignItems="center" className={classes.grid}>
          <Box className={classes.box} mt={1} mb={1} ml={1} mr={1}>
            <Card className={classes.card}>
              <img src={logo} className={classes.img} alt="Pokedex" />
              <CardContent>
                <Typography variant="body2" color="textSecondary" component="p" className={classes.typogra}>
                    Этот покедекс создан мной (Соболевским Дмитрием Анатолиевичем)
                </Typography>
              </CardContent>
              <CardContent>
                <Typography paragraph className={classes.typogra}>Для нинтендо:</Typography>
                <Typography paragraph className={classes.typogra}>
                    Пожалуйста не бейте я всего лишь выполнял задание
                </Typography>
              </CardContent>
            </Card>
          </Box>
        </Grid>
      </Box>
      <Footer />
    </Box>
   )
}));

export default About;