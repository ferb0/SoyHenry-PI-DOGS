import { Typography, Link } from '@mui/material';

export default function Footer() {
    return (
        <Typography
            align='center'
            component='h3'
            variant='subtitle1'
            sx={{ paddingBottom: '0.5rem' }}>
            <Link
                href='https://www.ferb.ar/'
                target='_blank'
                rel='noreferrer'
                sx={{ textDecoration: 'none' }}>
                Created by FerB
            </Link>.
        </Typography>
    )
};