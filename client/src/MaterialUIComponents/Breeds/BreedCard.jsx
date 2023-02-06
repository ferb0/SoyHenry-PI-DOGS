import { Typography, Grid, Card, CardMedia, CardContent, List, ListItem, ListItemText, Stack } from '@mui/material';
import { Container } from '@mui/system';

export default function BreedCard({ breeds }) {
    return (
        <Grid container spacing={4}>
            {breeds?.map(el =>
                <Grid item key={el.name} xs={12} sm={6} md={3} lg={3}>
                    <Card
                        sx={{ padding: '1rem' }}>
                        <CardMedia
                            component="img"
                            image={el.img}
                            alt="imageDog"
                            sx={{ border: '1px solid #f3f6f4' }} />
                        <CardContent>
                            <Typography align='center' variant='h6' sx={{ paddingBottom: '0.20rem' }}>
                                {el.name}
                            </Typography>
                            <hr />
                            <Stack direction='row' spacing={2}>
                                <Typography>
                                    Weight
                                </Typography>

                                <Typography variant='subtitle2'>
                                    {el.weight[0]} - {el.weight[1]}
                                </Typography>
                            </Stack>

                            <Stack>
                                <Typography>
                                    Temperaments
                                </Typography>
                                <List dense={true}>
                                    {el.temper?.map(el => {
                                        return (
                                            <ListItem key={el}>
                                                <ListItemText primary={el} />
                                            </ListItem>
                                        )
                                    })}
                                </List>
                            </Stack>

                            <Container sx={{ display: 'flex' }}>
                                <Typography variant='caption' sx={{ display: 'flex', marginLeft: 'auto' }}>
                                    {el.source}
                                </Typography>
                            </Container>
                        </CardContent>
                    </Card>
                </Grid>)}
        </Grid>
    )
};