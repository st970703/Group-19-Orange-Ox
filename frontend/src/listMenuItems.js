import React from 'react';
import { ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import PeopleIcon from '@material-ui/icons/People';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import BrushIcon from '@material-ui/icons/Brush';
import HomeIcon from '@material-ui/icons/Home';
import InfoIcon from '@material-ui/icons/Info';

function ListItemLink(props) {
    return <ListItem button component="a" {...props} />;
}

const listMenuItems = (
    <div>
        <ListItemLink href="/">
            <ListItemIcon>
                <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="Home" />
        </ListItemLink>
        <ListItemLink href="/about">
            <ListItemIcon>
                <InfoIcon />
            </ListItemIcon>
            <ListItemText primary="About" />
        </ListItemLink>
        <ListItemLink href="/profile">
            <ListItemIcon>
                <AccountBoxIcon />
            </ListItemIcon>
            <ListItemText primary="Profile" />
        </ListItemLink>
        <ListItemLink href="/canvas">
            <ListItemIcon>
                <BrushIcon />
            </ListItemIcon>
            <ListItemText primary="Canvas" />
        </ListItemLink>
        <ListItemLink href="/friends">
            <ListItemIcon>
                <PeopleIcon />
            </ListItemIcon>
            <ListItemText primary="Friends" />
        </ListItemLink>
    </div>
);

export default listMenuItems;