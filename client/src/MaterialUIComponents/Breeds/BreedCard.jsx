import { Typography, Grid, Card, CardMedia, CardContent, List, ListItem, ListItemText } from '@mui/material';

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
                            <Typography align='center' variant='h6'>
                                {el.name}
                            </Typography>
                        
                        <Typography>
                            Temperaments
                        </Typography>
                            <List dense={true}>
                                {el.temper?.map(el => {
                                    return (
                                        <ListItem>
                                            <ListItemText primary={el} />
                                        </ListItem>
                                    )
                                })}
                            </List>
                        </CardContent>
                    </Card>
                </Grid>)}
        </Grid>
    )
};