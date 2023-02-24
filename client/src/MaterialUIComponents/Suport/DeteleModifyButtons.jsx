import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { postdeleteBreed, getTempers, getAllBreeds } from '../../redux/actions.js';

import { Button, Stack, Modal, Typography } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: { sm: '10rem', md: '20rem' },
    bgcolor: 'white',
    border: '1px solid #000',
    borderRadius: { sm: '4%', md: '2%' },
    boxShadow: 24,
    p: 4,
    // justifyContent: 'center'
};

const DeteleModifyButtons = ({ id, api }) => {
    // id es el id del breed a modificar
    // api indica si el oprigen es de la api
    const dispatch = useDispatch();
    const history = useHistory();

    // Para modal
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleDelete = (e) => {
        dispatch(postdeleteBreed(id));
        dispatch(getTempers());
        dispatch(getAllBreeds(''));
    };

    const handleModify = () => {
        history.push(`/modifyBreed/${id}`);
    };

    return (
        <>
            <Stack spacing={2} direction='row'
                sx={{ paddingTop: '2rem', margin: 'auto', justifyContent: 'center' }}>
                <Button
                    variant='outlined'
                    disabled={api}
                    onClick={handleOpen}
                    endIcon={<CancelIcon />}>
                    Delete
                </Button>
                <Button
                    variant='outlined'
                    onClick={handleModify}
                    endIcon={<ChangeCircleIcon />}>
                    Modify
                </Button>
            </Stack>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby='modal-modal-title'
                aria-describedby='modal-modal-description'>
                <Stack
                    spacing={2}
                    align='center'
                    sx={style}>
                    <Typography>
                        Are you sure?
                    </Typography>
                    <Button
                        variant='outlined'
                        size='small'
                        onClick={e => handleDelete(e)}
                        endIcon={<CheckCircleIcon />}>
                        Yes
                    </Button>
                    <Button
                        variant='outlined'
                        size='small'
                        onClick={handleClose}
                        endIcon={<CancelIcon />}>
                        No
                    </Button>
                </Stack>
            </Modal>
        </>

    );
}

export default DeteleModifyButtons;