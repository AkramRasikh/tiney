import React from 'react';
import VisibilityIcon from '@material-ui/icons/Visibility';
import ChildCareIcon from '@material-ui/icons/ChildCare';
import { bool, func, string } from 'prop-types';
import { Box, IconButton } from '@material-ui/core';

const iconKey = {
  child: {
    iconComponent: <ChildCareIcon data-testid='child-icon-id' />,
    color: 'primary',
  },
  profile: {
    iconComponent: <VisibilityIcon data-testid='profile-id' />,
    color: 'secondary',
  },
};

const ListViewActionButton = ({ disabled, onClick, icon }) => {
  const { iconComponent, color } = iconKey[icon];
  return (
    <Box>
      <IconButton onClick={onClick} disabled={disabled} color={color}>
        {iconComponent}
      </IconButton>
    </Box>
  );
};

ListViewActionButton.propTypes = {
  disabled: bool,
  onClick: func.isRequired,
  icon: string.isRequired,
};

ListViewActionButton.defaultProps = {
  disabled: false,
};

export default ListViewActionButton;
