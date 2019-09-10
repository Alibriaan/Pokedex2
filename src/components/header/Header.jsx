import React, { useState } from 'react';
import { Link } from 'react-router-dom';



import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import { fade, makeStyles, createMuiTheme } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import Button from '@material-ui/core/Button';
import { ThemeProvider } from '@material-ui/styles';
import { red } from '@material-ui/core/colors';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ContactIcon from '@material-ui/icons/Contacts';
import SmartIcon from '@material-ui/icons/Smartphone';
import CodeIcon from '@material-ui/icons/Code';
import HomeIcon from '@material-ui/icons/Home';
import InfoIcon from '@material-ui/icons/Info';
import Box from '@material-ui/core/Box';

import { observer, inject} from 'mobx-react';

const theme = createMuiTheme({
  palette: {
    primary: red
  }
});

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  tool: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  menuButton: {
    marginRight: theme.spacing(1)
  },
  title: {
    flexGrow: 1
  },
  button: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'block'
    }
  },
  search: {
    display: 'flex',
    alignItems: 'center',
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    width: 'auto',
    [theme.breakpoints.up('md')]: {
      marginLeft: theme.spacing(1),
      width: 'auto'
    }
  },
  searchIcon: {
    margin: theme.spacing(0, 0.5, 0, 0),
    width: 'auto',
    height: '100%',
  },
  inputRoot: {
    color: 'inherit'
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 2),
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 120,
      '&:focus': {
        width: 200
      }
    }
  },
  tagsroot: {
    display: 'flex',
    justifyContent: 'center'
  },
  list: {
    width: 250
  },
  fullList: {
    width: 'auto'
  },
  sideMenuText: {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: red
  },
  mobileButton:
{
  display: 'block',
  [theme.breakpoints.up('md')]: {
    display: 'none'
  }
}
}));


const Header = inject('PokemonStore')(observer((props) => {
  
  const classes = useStyles();
  const [state, setState] = useState({
    left: false
  });

  const EnterPress = (event) =>{
    if (event.key === 'Enter') {
      props.PokemonStore.Filter();
  }
  }

  const toggleDrawer = (side, open) => event => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setState({ ...state, [side]: open });
  };

  const sideList = side => (
    <div
      role="presentation"
      onClick={toggleDrawer(side, false)}
      onKeyDown={toggleDrawer(side, false)}>

      <List className={classes.list}>
        <ListItem className={classes.sideMenuText} >
          <ListItemText primary="Pokedex"/>
        </ListItem>
      </List>
      <Divider />
      <List>
        <Link to = "/"style={{ textDecoration: 'none', color: '#000' }} >
          <ListItem button>
            <ListItemIcon><HomeIcon /></ListItemIcon>
            <ListItemText primary="Home"/>
          </ListItem>
        </Link>
        <Link to = "/about"style={{ textDecoration: 'none', color: '#000' }} >
          <ListItem button>
            <ListItemIcon><InfoIcon /></ListItemIcon>
            <ListItemText primary="About"/>
          </ListItem>
        </Link>
        <a href="https://github.com/Alibriaan/Pokedex" style={{ textDecoration: 'none', color: '#000' }}>
          <ListItem button>
            <ListItemIcon><CodeIcon /></ListItemIcon>
            <ListItemText primary="Github"/>
          </ListItem>
        </a>
        <a href="https://telegram.me/Alibrian" style={{ textDecoration: 'none', color: '#000' }}>
          <ListItem button>
            <ListItemIcon><ContactIcon /></ListItemIcon>
            <ListItemText primary="Contacts"/>
          </ListItem>
        </a>
      </List>
      <List className={classes.mobileButton} style={{ display: props.disable === true ? 'none' : '' }}>
        <Divider />
        <ListItem button  onClick={ () => {props.PokemonStore.PokemonsOnPage(10)}}>
          <ListItemIcon><SmartIcon /></ListItemIcon>
          <ListItemText primary="10 Pokemons"/>
        </ListItem>
        <ListItem button  onClick={ () => {props.PokemonStore.PokemonsOnPage(20)}}>
          <ListItemIcon><SmartIcon /></ListItemIcon>
          <ListItemText primary="20 Pokemons"/>
        </ListItem>
        <ListItem button onClick={ () => {props.PokemonStore.PokemonsOnPage(50)}}>
          <ListItemIcon><SmartIcon /></ListItemIcon>
          <ListItemText primary="50 Pokemons"/>
        </ListItem>
      </List>

    </div>
  );

  return (
    <ThemeProvider theme={theme}>
      <Box component="header">
        <div className={classes.root}>
          <AppBar position="static">
            <Toolbar className={classes.tool}>
              <IconButton
                edge="start"
                className={classes.menuButton}
                color="inherit"
                aria-label="open drawer"
                onClick={toggleDrawer('left', true)}
              >
                <MenuIcon />
              </IconButton>
              <Drawer open={state.left} onClose={toggleDrawer('left', false)}>
                {sideList('left')}
              </Drawer>
              <Typography className={classes.title} variant="h6" noWrap>
                <Link to = "/"style={{ textDecoration: 'none', color: 'white' }} >
                  Pokedex
                </Link>
              </Typography>
              <div className={classes.button} style={{ display: props.disable === true ? 'none' : '' }}>
                <Button color="inherit" onClick={ () => {props.PokemonStore.PokemonsOnPage(10)}}>10 Pokemons</Button>
                <Button color="inherit" onClick={ () => {props.PokemonStore.PokemonsOnPage(20)}}>20 Pokemons</Button>
                <Button color="inherit" onClick={ () => {props.PokemonStore.PokemonsOnPage(50)}}>50 Pokemons</Button>
              </div>

              <div className={classes.search} style={{ display: props.disable === true ? 'none' : '' }}>
                <InputBase disabled={props.disable} id="search" onKeyPress={EnterPress}
                  placeholder="Search…"
                  classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput
                  }}
                  value={props.PokemonStore.searchText}
                  inputProps={{ 'aria-label': 'search' }}
                  onChange={(e) => { props.PokemonStore.searchText = e.target.value}}/>

<IconButton  className={classes.searchIcon} size="small" aria-label="search"  style={{color: 'white'}} onClick={props.PokemonStore.Filter}>
                     <SearchIcon />
                   </IconButton>

              </div>
            </Toolbar>
          </AppBar>
        </div>

        <ExpansionPanel className={classes.exproot} style={{ display: props.disable === true ? 'none' : '' }} >
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header">
            <Typography className={classes.heading}>Types tags</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>

          <ThemeProvider theme={theme}>

          <FormGroup row className={classes.tagsroot} >
          {
            props.PokemonStore.types &&
            props.PokemonStore.types.map( (item) => <FormControlLabel
            control={
              <Checkbox checked={props.PokemonStore.checkMap[item.name] }value={item.name} id={item.name} onClick={props.PokemonStore.checkBoxSearch}color="primary" />
            }
            label={item.name}
          />)
          }

          
          </FormGroup>
          </ThemeProvider>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </Box>
    </ThemeProvider>

  );
}))

export default Header;