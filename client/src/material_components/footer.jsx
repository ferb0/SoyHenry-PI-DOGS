import { Typography, Link } from '@mui/material';

export default function Footer() {
    return (
        <Typography
            align='center'
            component='h3'
            variant='subtitle1'
            sx={{ paddingBottom: '0.5rem' }}>
            Created by <Link
                            href='https://portfolio-ferb.onrender.com/'
                            target='_blank'
                            rel='noreferrer'>
                            FerB
                        </Link>.
        </Typography>
    )
};