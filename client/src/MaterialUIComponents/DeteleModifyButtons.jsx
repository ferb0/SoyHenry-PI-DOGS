import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { postdeleteBreed, getTempers, getAllBreeds } from '../redux/actions.js';

import { Container, Button } from '@mui/material';

const DeteleModifyButtons = ({ id }) => {
    const dispatch = useDispatch();
    const history = useHistory();

    const handleDelete = (e) => {
        dispatch(postdeleteBreed(e.target.value));
        dispatch(getTempers());
        dispatch(getAllBreeds(''));
    };

    const handleModify = () => {
        history.push(`/modifyBreed/${id}`);
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
                sx={{ margin: 'auto' }}
                onClick={handleModify}>
                Modify
            </Button>
        </Container>
    );
}

export default DeteleModifyButtons;