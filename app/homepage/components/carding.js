import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

export default function MediaControlCard( data) {
  const theme = useTheme();

  return (
    <Card sx={{ display: 'flex' }} className={data.className}>
      <CardMedia
        component="img"
        image="/static/images/cards/live-from-space.jpg"
        alt="Live from space "
        className='w-1/4'
      />
      <Box className= "flex flex-col w-3/4" >
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Typography component="div" variant="h6" noWrap>
            {data.title}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" component="div" noWrap>
            {data.description}
          </Typography>
        </CardContent>
      </Box>
    </Card>
  );
}
