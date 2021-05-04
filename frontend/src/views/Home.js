import React from 'react';
import { Typography } from '@material-ui/core';
import painting_img from '../img/unsplash-painting.jpg';


const Home = () => {
  return (
    <div>
      <Typography variant="h3" gutterBottom>
        Virtual Playground
      </Typography>
      <Typography variant="body1" gutterBottom>
        Welcome kiddies!! 😀
      </Typography>
      <img src={painting_img} style={{ "height": "450px" }} alt="painting_image" />
      <p>Image from <a href={"https://unsplash.com/"}>Unsplash.com</a></p>
    </div>
  );
}

export default Home;