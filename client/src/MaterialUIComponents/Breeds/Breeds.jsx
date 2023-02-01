import { useSelector } from 'react-redux';

import { Typography, Container, Grid, Card, CardMedia, CardContent } from '@mui/material';

export default function Breeds() {
    const breeds = useSelector(state => state.breeds);

    return (
        <Container sx={{padding:'1rem'}}>
            <Typography variant='h6' align='center'>
                List of Breeds
            </Typography>
            <Grid container spacing={4}>
                {breeds?.map(el =>
                    <Grid key={el.name} item xs={12} sm={6} md={3} lg={3}>
                        <Card
                            sx={{ padding: '1rem' }}>
                            <CardMedia
                                component="img"
                                image={el.img}
                                alt="imageDog"
                                sx={{ border: '1px solid #f3f6f4' }} />
                            <CardContent>
                                <Typography align='center' variant='h6'>
                                    {el.name}
                                </Typography>
                                <Typography>
                                    {el.temper}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>)}
            </Grid>
        </Container>
    )
};