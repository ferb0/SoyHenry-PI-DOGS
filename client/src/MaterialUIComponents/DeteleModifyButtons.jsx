import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { postdeleteBreed, getTempers, getAllBreeds } from '../redux/actions.js';

import { Container, Button, Stack } from '@mui/material';

const DeteleModifyButtons = ({ id }) => {
    const dispatch = useDispatch();
    const history = useHistory();

    const handleDelete = (e) => {
        dispatch(postdeleteBreed(e.target.value));
        dispatch(getTempers());
        dispatch(getAllBreeds(''));
        history.push(`/`);
    };

    const handleModify = () => {
        history.push(`/modifyBreed/${id}`);
    };

    return (
        <Stack spacing={2} direction='row'
        sx={{ paddingTop: '2rem' }}>
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
                sx={{ margin: 'auto' }}
                onClick={handleModify}>
                Modify
            </Button>
        </Stack>
    );
}

export default DeteleModifyButtons;