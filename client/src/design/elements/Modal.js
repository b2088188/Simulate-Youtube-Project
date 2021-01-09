import React, { useState } from 'react';
import styled from 'styled-components';
import { makeStyles } from '@material-ui/core/styles';
import { Close } from '@material-ui/icons';
import {
  List,
  Link as SLink,
  ImageContainer,
  Image,
  Title,
  ListGroup,
  Icon,
  Button,
  Span,
  Paragraph,
} from '../../design/components';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function TransitionsModal({ button, title, text, className }) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className={className}>
      <Button
        modifiers='transparent'
        className='portalbtn'
        onClick={handleOpen}
      >
        <Icon as={Close} />
      </Button>
      <Modal
        aria-labelledby='transition-modal-title'
        aria-describedby='transition-modal-description'
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <Title as='h2'>{title}</Title>
            <Paragraph>{text}</Paragraph>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}

export default styled(TransitionsModal)`
  .portalbtn {
    position: absolute;
    top: 0.5rem;
    right: 0rem;
  }
`;
