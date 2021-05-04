import React from 'react';
import CloseIcon from '@material-ui/icons/Close';
import { Dialog, Toolbar, IconButton, Slide } from '@material-ui/core';
import { bool, func, node } from 'prop-types';

const Transition = React.forwardRef((props, ref) => (
  <Slide direction='up' ref={ref} {...props} />
));

const FullScreenDialog = ({ open, setOpen, children }) => {
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <Toolbar>
          <IconButton
            edge='start'
            color='inherit'
            onClick={handleClose}
            aria-label='close'
          >
            <CloseIcon />
          </IconButton>
        </Toolbar>
        {children}
      </Dialog>
    </div>
  );
};

FullScreenDialog.propTypes = {
  open: bool.isRequired,
  setOpen: func.isRequired,
  children: node.isRequired,
};

export default FullScreenDialog;
