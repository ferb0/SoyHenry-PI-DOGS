import { Link } from 'react-router-dom';

import { Typography, Grid, Card, CardMedia, CardContent, List, ListItem, ListItemText, Stack, Container } from '@mui/material';

export default function BreedCard({ breeds }) {
    return (
        <Grid
            container
            spacing={2}>
            {breeds?.map(el =>
                <Grid
                    item
                    key={el.name}
                    xs={12} sm={6} md={4} lg={3}>
                    <Link to={`/detail/${el.id}`} style={{ textDecoration: "none" }}>
                        <Card
                            sx={{ padding: '1rem' }}>

                            <CardMedia
                                component="img"
                                image={el.img}
                                alt="imageDog"
                                sx={{ border: '1px solid #f3f6f4' }} />

                            <CardContent>
                                <Typography align='center' component='h6' variant='h6' sx={{ paddingBottom: '0.20rem' }}>
                                    {el.name}
                                </Typography>
                                <hr />
                                <Stack
                                    direction='row'
                                    spacing={2}
                                    alignItems="center" >

                                    <Typography variant='h6'>
                                        Weight:
                                    </Typography>

                                    <Typography component='p' variant='body1'>
                                        {el.weight[0]}Kg - {el.weight[1]}Kg
                                    </Typography>
                                </Stack>

                                <Stack>
                                    <Typography variant='h6'>
                                        Temperaments:
                                    </Typography>
                                    <List dense={true} sx={{ padding: '0' }}>
                                        {el.temper?.map(el => {
                                            return (
                                                <ListItem key={el} sx={{ padding: '0', paddingLeft: '1rem' }}>
                                                    <ListItemText primary={el} />
                                                </ListItem>
                                            )
                                        })}
                                    </List>
                                </Stack>

                                <Container sx={{ display: 'flex' }}>
                                    <Typography variant="caption" sx={{ display: 'flex', marginLeft: 'auto' }}>
                                        {el.source}
                                    </Typography>
                                </Container>
                            </CardContent>
                        </Card>
                    </Link>
                </Grid>)}
        </Grid>
    )
};