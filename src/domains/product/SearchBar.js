import React from 'react';
import { useForm } from "react-hook-form";
import { fade, makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Hidden from '@material-ui/core/Hidden';
import Grid from '@material-ui/core/Grid';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import InputAdornment from '@material-ui/core/InputAdornment';
import Link from '@material-ui/core/Link';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Box from '@material-ui/core/Box';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Paper from '@material-ui/core/Paper';
import MenuList from '@material-ui/core/MenuList';
import Popover from '@material-ui/core/Popover';
import Divider from '@material-ui/core/Divider';

import ToggleButton from '@material-ui/lab/ToggleButton';

import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';

import FormTextField from 'components/Atoms/FormTextField/FormTextField.js'

import styles from "./SearchBar.style.js";

const useStyles = makeStyles(styles);

export default function SearchBar({brandComponent, maxWidth}) {
  const classes = useStyles();

  // const [open, setOpen] = React.useState(false);

  // const [itemPanelOpen, setItemPanelOpen] = React.useState(false);


  const [openPanels, setOpenPanels] = React.useState({
    item: false,
    envFit: false,
    delivery: false,
    detail: false,
  });

  const anchorRefs = {
    item: React.useRef(null),
    envFit: React.useRef(null),
    delivery: React.useRef(null),
    detail: React.useRef(null),
  };

  const { handleSubmit, errors, control } = useForm({
    reValidateMode: 'onBlur'
  });

  const baseControllerProps = {
    control: control,
    defaultValue: '',
  }
  
  const preventDefault = (event) => event.preventDefault();

  // const handleToggle = () => {
  //   setOpen((prevOpen) => !prevOpen);
  // };

  const handlePanelClose = (key) => (event) => {
    if (anchorRefs.item.current && anchorRefs.item.current.contains(event.target)) {
      return;
    }

    setOpenPanels({
      ...openPanels,
      [key]:!openPanels[key],
    })

    // setOpen(false);
    // setItemPanelOpen(!itemPanelOpen)
  };

  // const prevOpen = React.useRef(open);
  // React.useEffect(() => {
  //   if (prevOpen.current === true && open === false) {
  //     anchorRefs.item.current.focus();
  //   }

  //   prevOpen.current = open;
  // }, [open]);

  const makePopoverProps = (key) => ({
    className: classes.popover,
    open: openPanels[key],
    anchorEl: anchorRefs[key].current,
    role: undefined,
    anchorOrigin: {
      vertical: 'bottom',
      horizontal: 'center',
    },
    transformOrigin: {
      vertical: 'top',
      horizontal: 'right',
    },
    PaperProps:{
      className: classes.panel,
    }
  })

  const makeEndIcon = (open)=> (
    <span className={classes.endIcon}>
      {open?<ExpandLessIcon />:<ExpandMoreIcon />}
    </span>
  );


  return (
      <AppBar className={classes.appBar} component='div' position="static" color='default' variant='outlined' elevation={0}>
        <Toolbar className={classes.toolBar} disableGutters >
          <Paper className={classes.toolBarPaper} component="div" square
            variant='outlined' 
            elevation={0}
          >
            <InputBase
              className={classes.input}
              placeholder="주소 검색"
              // inputProps={{ 'aria-label': 'search google maps' }}
            />
            <IconButton type="submit" className={classes.iconButton} aria-label="search">
              <SearchIcon />
            </IconButton>
            <Divider className={classes.divider} orientation="vertical" />

            <ToggleButton 
              value='itemPanel'
              variant="outlined" 
              color="default" 
              className={classes.toggleButton}
              selected={openPanels['item']}
              onChange={()=>{
                setOpenPanels({
                  ...openPanels,
                  item:!openPanels['item'],
                })
                // handleToggle()
              }}

              ref={anchorRefs.item}
              // endIcon={<Icon>send</Icon>}
            >
              품목{makeEndIcon(openPanels['item'])}
            </ToggleButton>
            <ToggleButton 
              value='envFitPanel'
              variant="outlined" 
              color="default" 
              className={classes.toggleButton}
              selected={openPanels['envFit']}
              onChange={()=>{
                setOpenPanels({
                  ...openPanels,
                  envFit:!openPanels['envFit'],
                })
                // handleToggle()
              }}

              ref={anchorRefs.envFit}
              // endIcon={<Icon>send</Icon>}
            >
              환경적합도{openPanels['envFit']?<ExpandLessIcon />:<ExpandMoreIcon />}
            </ToggleButton>
            <ToggleButton 
              value='deliveryPanel'
              variant="outlined" 
              color="default" 
              className={classes.toggleButton}
              selected={openPanels['delivery']}
              onChange={()=>{
                setOpenPanels({
                  ...openPanels,
                  delivery:!openPanels['delivery'],
                })
                // handleToggle()
              }}

              ref={anchorRefs.delivery}
              // endIcon={<Icon>send</Icon>}
            >
              배송{openPanels['delivery']?<ExpandLessIcon />:<ExpandMoreIcon />}
            </ToggleButton>
            <ToggleButton 
              value='detailPanel'
              variant="outlined" 
              color="default" 
              className={classes.toggleButton}
              selected={openPanels['detail']}
              onChange={()=>{
                setOpenPanels({
                  ...openPanels,
                  detail:!openPanels['detail'],
                })
                // handleToggle()
              }}

              ref={anchorRefs.detail}
              // endIcon={<Icon>send</Icon>}
            >
              품목{openPanels['detail']?<ExpandLessIcon />:<ExpandMoreIcon />}
            </ToggleButton>
          </Paper>
        </Toolbar>

        <Popover 
          {...makePopoverProps('item')}
        >
          <ClickAwayListener onClickAway={handlePanelClose('item')}>
            <Box>
            아이템
            </Box>
          </ClickAwayListener>
        </Popover>
        <Popover 
          {...makePopoverProps('envFit')}
        >
          <ClickAwayListener onClickAway={handlePanelClose('envFit')}>
            <Box>
            환경적합도
            </Box>
          </ClickAwayListener>
        </Popover>
        <Popover 
          {...makePopoverProps('delivery')}
        >
          <ClickAwayListener onClickAway={handlePanelClose('delivery')}>
            <Box>
            배송
            </Box>
          </ClickAwayListener>
        </Popover>
        <Popover 
          {...makePopoverProps('detail')}
        >
          <ClickAwayListener onClickAway={handlePanelClose('detail')}>
            <Box>
            세부필터
            </Box>
          </ClickAwayListener>
        </Popover>
      </AppBar>
  );
}
