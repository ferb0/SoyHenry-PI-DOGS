import TemperSearch from "./Searcher/TemperSearch.jsx";
import NameSearch from './Searcher/NameSearch.jsx';
import Options from './Searcher/Options.jsx';
import Sort from './Searcher/Sort.jsx';
import FilterSource from './Searcher/FilterSource.jsx';

import { AppBar, IconButton, Stack, Toolbar, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import imageLogo from '../../global/images/favicon.ico';

export default function NavBar() {
    return (
        <AppBar position="sticky">
            <Toolbar>
                <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    sx={{ display: { sm: 'flex', xs: 'flex', md: 'none' } }}>
                    <MenuIcon />
                </IconButton>

                <Stack
                direction='row'
                spacing={1}
                    sx={{ margin: { sm: 'auto', xs: 'auto', md: '0' } }}>
                    <img src={imageLogo} width='35rem' alt='logo' />
                    <Typography
                        variant="h6" >
                        InfoDog
                    </Typography>
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