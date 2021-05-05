import { Typography } from '@material-ui/core';
import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { ReactComponent as OrangeOxLogo } from '../img/orange-ox.svg';
import IconButton from '@material-ui/core/IconButton';
import GitHubIcon from '@material-ui/icons/GitHub';
import PeopleIcon from '@material-ui/icons/People';
import { FaGithubAlt, FaBalanceScale } from 'react-icons/fa';
import InfoIcon from '@material-ui/icons/Info';


function About() {
  return (
    <div>
      <Typography variant="h3" gutterBottom>
        About <InfoIcon fontSize={'large'} />
      </Typography>
      <Typography variant="h4">
        Authors <PeopleIcon style={{ fill: "black" }} fontSize="large" />
      </Typography>

      <List component="nav" aria-label="author_list">
        <Typography variant="h5">
          <ListItem>Group 19 Orange Ox&nbsp;
          <OrangeOxLogo style={{ height: '45px' }} /></ListItem>
        </Typography>
        <Typography variant="body1">
          <ListItem>Mike Lee</ListItem>
          <ListItem>Callum Bradding</ListItem>
          <ListItem>Justin Kim</ListItem>
        </Typography>
      </List>

      <Typography variant="h4" gutterBottom>
        License <FaBalanceScale size={30} />
      </Typography>

      <Typography variant="body1" paragraph={true}>
        <a href={"https://www.gnu.org/licenses/gpl-3.0.en.html"}
          target="_blank"
          rel="noopener noreferrer">
          GNU General Public License v3.0</a>
      </Typography>

      <Typography variant="h4">
        GitHub Repository <FaGithubAlt size={35} />
      </Typography>

      <IconButton aria-label="github_link"
        fontSize="large"
        href="https://github.com/st970703/Group-19-Orange-Ox"
        target="_blank"
        rel="noopener noreferrer">
        <GitHubIcon style={{ fill: "black" }} />
      </IconButton>
    </div>
  );
}

export default About;