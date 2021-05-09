import React from 'react';
import { Typography } from '@material-ui/core';
import painting_img from '../img/unsplash-painting.jpg';
import { FaChild } from 'react-icons/fa';

// Home page used to introduce the application
const Home = () => {
  return (
    <div>
      <Typography variant="h3" gutterBottom>
        Virtual Playground <FaChild />
      </Typography>
      <Typography variant="body1" gutterBottom>
        Welcome to Virtual Playground! 😀
      </Typography>
      <Typography variant="body1" gutterBottom>
        To get started please login to your account or if you do not have an account,
        please ask your parents to help you make one.
      </Typography>
      <img src={painting_img} style={{ "height": 425 }} alt="painting_image" />
      <p>*Image from <a href={"https://unsplash.com/"}
        target="_blank"
        rel="noopener noreferrer">Unsplash.com</a></p>
    </div>
  );
}

export default Home;