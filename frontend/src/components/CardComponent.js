import React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Button } from '@mui/material';
import { withRouter } from 'react-router-dom';


const CardComponent = (props) => {
  
  const { title, description, author, publishedAt,  urlToImage, url, source } =
    props.post;
  
  const convertIsoDate = (date) => {
    const d = new Date(date);
    return d.toLocaleDateString();
  };

  return (
    <Card sx={{ maxWidth: '100%', width: 800, marginBottom: 10 }}>
      <CardHeader
       
        action={
          <IconButton aria-label='settings'>
            <MoreVertIcon />
          </IconButton>
        }
        title={author || source.name}
        subheader={convertIsoDate(publishedAt)}
      />
      <CardMedia
        component='img'
        height='400'
        image={urlToImage}
        alt='Paella dish'
      />
      <CardContent>
        <Typography variant='description2' color='text.secondary'>
          {description || title}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label='add to favorites'>
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label='share'>
          <ShareIcon />
        </IconButton>
        <Button
          aria-label='share'
          href={url}
          target='_blank'
          size='small'
        >
           Read more...
        </Button>
        
      </CardActions>
     
    </Card>
  );
};

export default withRouter(CardComponent);
