import { AppBar, IconButton, Stack, Toolbar, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

import TemperSearch from "./Searcher/TemperSearch.jsx";
import NameSearch from './Searcher/NameSearch.jsx';
import Options from './Searcher/Options.jsx';
import Sort from './Searcher/Sort.jsx';
import FilterSource from './Searcher/FilterSource.jsx';

export default function NavBar() {
    return (
        <AppBar position="sticky">
            <Toolbar>
                <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    sx={{ mr: 2 }}>
                    <MenuIcon />
                </IconButton>

                <Typography variant="h6">
                    InfoDog
                </Typography>

                <Stack
                    direction="row"
                    justifyContent="flex-end"
                    alignItems="center"
                    spacing={2}>
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