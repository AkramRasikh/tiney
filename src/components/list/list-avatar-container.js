import React from 'react';
import { Avatar, ListItemAvatar } from '@material-ui/core';
import { string } from 'prop-types';

const ListAvatarContainer = ({ alt, src }) => (
  <ListItemAvatar>
    <Avatar alt={alt} src={src} />
  </ListItemAvatar>
);

ListAvatarContainer.propTypes = {
  alt: string,
  src: string,
};

ListAvatarContainer.defaultProps = {
  alt: '',
  src: '',
};

export default ListAvatarContainer;
