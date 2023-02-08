import * as React from 'react';

import TemperSearch from "./Searcher/TemperSearch.jsx";
import NameSearch from './Searcher/NameSearch.jsx';
import Options from './Searcher/Options.jsx';
import Sort from './Searcher/Sort.jsx';
import FilterSource from './Searcher/FilterSource.jsx';

import { AppBar, IconButton, Menu, MenuItem, Stack, Toolbar, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import imageLogo from '../../global/images/favicon.ico';
import { Link } from 'react-router-dom';

export default function NavBar() {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <AppBar position="sticky" sx={{backgroundColor: 'grey'}}>
            <Toolbar>
                <IconButton
                    aria-controls={open ? 'basic-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleClick}
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    sx={{ display: { sm: 'flex', xs: 'flex', md: 'none' } }}>
                    <MenuIcon />
                </IconButton>

                <Menu
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}>
                    <MenuItem><FilterSource /></MenuItem>
                    <MenuItem><Sort /></MenuItem>
                    <MenuItem><TemperSearch /></MenuItem>
                    <MenuItem><NameSearch /></MenuItem>
                    {/* Cuando esté terminado New Breed agregar el handleClose*/}
                    <MenuItem onClick={null}><Options /></MenuItem>
                </Menu>

                
                    <Stack
                        direction='row'
                        spacing={1}
                        sx={{ margin: { sm: 'auto', xs: 'auto', md: '0' } }}>
                        <img src={imageLogo} width='35rem' alt='logo' />
                        <Link to='/' style={{ textDecoration: "none", color: 'inherit' }}>
                        <Typography
                            variant="h6" >
                            InfoDog
                        </Typography>
                        </Link>
                    </Stack>

                <Stack
                    direction="row"
                    justifyContent="flex-end"
                    alignItems="center"
                    spacing={1}
                    sx={{ display: { sm: 'none', xs: 'none', md: 'flex' }, mr: 1, marginLeft: 'auto' }}>
                    <FilterSource />
                    <Sort />
                    <TemperSearch />
                    <NameSearch />
                    <Options />
                </Stack>
            </Toolbar>
        </AppBar>
    )
};