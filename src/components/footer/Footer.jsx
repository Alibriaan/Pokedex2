import React from 'react'

import { makeStyles } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'

const useStyles = makeStyles(theme => ({
  footer: {
    backgroundColor: '#f44336',
    color: 'white'
  }
}));

const Footer = () => {
  const classes = useStyles()

  return (
    <Box component="footer" className={classes.footer}>
      <h1>Pokedex by Dimas</h1>
      <h3>все права защищены святой водой </h3>
      <h2>Конец</h2>
    </Box>
  )
}

export default Footer;