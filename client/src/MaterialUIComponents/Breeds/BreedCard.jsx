import { Link } from 'react-router-dom';

import { Typography, Grid, Card, CardMedia, CardContent, List, ListItem, ListItemText, Stack, Container } from '@mui/material';
// import DeteleModifyButtons from '../DeteleModifyButtons.jsx';
// import { DB } from '../../global/ConstSource.js';

import imageDefault from '../../global/images/paws.png';

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
                    <Card sx={{ padding: '1rem' }}>
                        <Link to={`/detail/${el.id}`} style={{ textDecoration: "none" }}>
                            <CardMedia
                                component="img"
                                image={el.img ? el.img : imageDefault}
                                alt="imageDog"
                                sx={{ border: '1px solid #f3f6f4' }} />
                        </Link>

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

                            {/* {el.source === DB ?
                                <DeteleModifyButtons id={el.id} />
                                :
                                null} */}

                            <Container sx={{ display: 'flex', paddingTop: '1rem' }}>
                                <Typography variant="caption" sx={{ display: 'flex', marginLeft: 'auto' }}>
                                    {el.source}
                                </Typography>
                            </Container>
                        </CardContent>
                    </Card>
                </Grid>)}
        </Grid>
    )
};
