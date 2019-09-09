import React from 'react'

import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'

const useStyles = makeStyles({
  rootError:
{
  display: 'flex',
  height: '100vh',
  justifyContent: 'center'
},
  cardError:
{
  flexGrow: 1,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
},
  Error: {
    display: 'flex',
    justifyContent: 'center'
  }
});

const Error = (props) => {
  const classes = useStyles()
  return (
    <Box mt={2} mb={2} className={classes.rootError}>
      <Card className={classes.cardError} >
        <CardContent>
          <Typography className={classes.Error} variant="h3">
              ERROR
          </Typography>
          <Typography className={classes.Error} variant="h5">
            {props.error_type}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  )
}

export default Error;