import React from "react";
import { useDispatch } from "react-redux";
import { getTempers, cleanAllData, getAllBreeds } from '../../../redux/actions.js'

import { Button, Stack, Tooltip } from "@mui/material";
// Para ToolTip
import ClickAwayListener from '@mui/material/ClickAwayListener';

export default function Options() {
    const dispatch = useDispatch();

    function cleanAll() {
        dispatch(cleanAllData());
        dispatch(getTempers());
        dispatch(getAllBreeds(''));
    };

    const [open, setOpen] = React.useState(false);

    const handleTooltipClose = () => {
        setOpen(false);
    };

    const handleTooltipOpen = () => {
        setOpen(true);
    };

    return (
        <Stack>
            <Button
                variant="text"
                onClick={cleanAll}
                size='small'
                sx={{
                    color: { sm: 'black', xs: 'black', md: 'white' },
                    borderColor: { sm: 'black', xs: 'black', md: 'white' }
                }}>
                Clear All
            </Button>

            <ClickAwayListener onClickAway={handleTooltipClose}>
                <Tooltip
                    title="Functionality under development"
                    PopperProps={{
                        disablePortal: true,
                    }}
                    onClose={handleTooltipClose}
                    open={open}>
                    <Button
                        variant="text"
                        size='small'
                        onClick={handleTooltipOpen}
                        sx={{
                            color: { sm: 'black', xs: 'black', md: 'white' },
                            borderColor: { sm: 'black', xs: 'black', md: 'white' }
                        }}>
                        New Breed
                    </Button>
                </Tooltip>
            </ClickAwayListener>
        </Stack>
    )
};