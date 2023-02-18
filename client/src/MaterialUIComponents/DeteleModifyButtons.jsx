import { useDispatch } from 'react-redux';
import { postdeleteBreed, getTempers, getAllBreeds } from '../redux/actions.js';

import { Container, Button } from '@mui/material';

const DeteleModifyButtons = ({ id }) => {
    const dispatch = useDispatch();

    const handleDelete = (e) => {
        dispatch(postdeleteBreed(e.target.value));
        dispatch(getTempers());
        dispatch(getAllBreeds(''));
    };

    return (
        <Container
            sx={{ display: 'flex', paddingTop: '2rem' }}>
            <Button
                variant="outlined"
                size='small'
                color='secondary'
                value={id}
                sx={{ margin: 'auto' }}
                onClick={(e) => handleDelete(e)}>
                Delete
            </Button>
            <Button
                variant="outlined"
                size='small'
                color='secondary'
                disabled
                sx={{ margin: 'auto' }}>
                Modify
            </Button>
        </Container>
    );
}

export default DeteleModifyButtons;