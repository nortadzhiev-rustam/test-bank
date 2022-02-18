import React from 'react';
import axios from 'axios';
import CardComponent from './CardComponent';
import { Box } from '@mui/material';
import {useSelector} from 'react-redux';

const Default = ({history}) => {
  const [posts, setPosts] = React.useState([]);
const isLoggedIn = useSelector(state => state.user.isLoggedIn);
  React.useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(
        'https://newsapi.org/v2/top-headlines?country=us&apiKey=83e354ab3ab64bc197bc20a8fe574793'
      );
      setPosts(res.data.articles);
    };
    fetchData();
    return () => {
      setPosts([]);
    };
  }, []);

  React.useEffect(() => {
     const isLogged = async (status) => {
        if (status) {
           await history.push('/index');
        }
      }

      isLogged(isLoggedIn);

    }, [history, isLoggedIn]);


 return (
    <Box component='div' sx={{display:{ md : 'flex', xs : 'block'}, flexWrap: 'wrap', justifyContent:{md:  'space-around', xs: 'center'}, marginTop: 10}}>
        
        {posts.map((post, idx) => <CardComponent key={idx} post={post} />)}
        
    </Box>
);
};

export default Default;
