import React from 'react';
import { string, node, bool } from 'prop-types';
import {
  Box,
  Divider,
  Grid,
  ListItem,
  ListItemText,
  makeStyles,
} from '@material-ui/core';
import SubdirectoryArrowRightIcon from '@material-ui/icons/SubdirectoryArrowRight';
import ListAvatarContainer from './list-avatar-container';

const useStyles = makeStyles((theme) => ({
  listItemClass: {
    '& span': {
      maxWidth: '190px',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      [theme.breakpoints.up('sm')]: {
        maxWidth: '250px',
      },
    },
  },
}));

const ListItemComponent = ({
  src,
  primaryText,
  secondaryText,
  showSubDirectIcon,
  children,
  showDivider,
  disableGutters,
}) => {
  const classes = useStyles({ truncateWord: showSubDirectIcon });

  return (
    <>
      <ListItem data-testid='list-id' disableGutters={disableGutters}>
        <Grid container justify='space-between'>
          {showSubDirectIcon && (
            <Box p={1}>
              <SubdirectoryArrowRightIcon />
            </Box>
          )}
          <Box display={{ xs: 'none', sm: 'block' }} m='auto'>
            <ListAvatarContainer alt='profileImg' src={src} />
          </Box>
          <ListItemText
            className={classes.listItemClass}
            primary={primaryText}
            secondary={secondaryText}
          />
          {children}
        </Grid>
      </ListItem>
      {showDivider && <Divider component='li' />}
    </>
  );
};

ListItemComponent.propTypes = {
  src: string,
  primaryText: string.isRequired,
  secondaryText: string.isRequired,
  children: node,
  showSubDirectIcon: bool,
  showDivider: bool,
  disableGutters: bool,
};

ListItemComponent.defaultProps = {
  children: '',
  showSubDirectIcon: false,
  showDivider: false,
  disableGutters: false,
  src: '',
};

export default ListItemComponent;
