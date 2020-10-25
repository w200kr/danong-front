import React from 'react';
import { useForm } from "react-hook-form";
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import Box from '@material-ui/core/Box';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Paper from '@material-ui/core/Paper';
import Popover from '@material-ui/core/Popover';
import Divider from '@material-ui/core/Divider';

import ToggleButton from '@material-ui/lab/ToggleButton';

import SearchIcon from '@material-ui/icons/Search';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';

import FormCheckbox from 'components/Atoms/FormCheckbox/FormCheckbox.js'
import VerticalTabs from 'components/Tabs/VerticalTabs.js'

import styles from "./SearchBar.style.js";

const useStyles = makeStyles(styles);

export default function SearchBar({handleClick}) {
  const classes = useStyles();

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
  
  // const preventDefault = (event) => event.preventDefault();
  const handlePanelClose = (key) => (event) => {
    if (anchorRefs.item.current && anchorRefs.item.current.contains(event.target)) {
      return;
    }

    setOpenPanels({
      ...openPanels,
      [key]:!openPanels[key],
    })
  };

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

  const makeToggleButtonProps = (key) => ({
      value: `open${key.charAt(0).toUpperCase() + key.slice(1)}Panel`,
      variant: "outlined" ,
      color: "default" ,
      className: classes.toggleButton,
      selected: openPanels[key],
      onChange: ()=>{
        setOpenPanels({
          ...openPanels,
          [key]:!openPanels[key],
        })
        // handleToggle()
      },
      ref:anchorRefs[key],
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
            <IconButton type="submit" className={classes.iconButton} aria-label="search" onClick={handleClick}>
              <SearchIcon />
            </IconButton>
            <Divider className={classes.divider} orientation="vertical" />

            <ToggleButton 
              {...makeToggleButtonProps('item')}
            >
              품목{makeEndIcon(openPanels['item'])}
            </ToggleButton>
            <ToggleButton 
              {...makeToggleButtonProps('envFit')}
            >
              환경적합도{makeEndIcon(openPanels['envFit'])}
            </ToggleButton>
            <ToggleButton 
              {...makeToggleButtonProps('delivery')}
            >
              배송{makeEndIcon(openPanels['delivery'])}
            </ToggleButton>
            <ToggleButton 
              {...makeToggleButtonProps('detail')}
            >
              세부필터{makeEndIcon(openPanels['detail'])}
            </ToggleButton>
          </Paper>
        </Toolbar>

        <Popover 
          {...makePopoverProps('item')}
        >
          <ClickAwayListener onClickAway={handlePanelClose('item')}>
            <Box className={classes.box}>
              <VerticalTabs 
                options={[{
                  label: '야채류',
                  content: (
                    <FormCheckbox
                      name='itemType'
                      controllerProps={{...baseControllerProps}}
                      // labelText='소속 팀 선택'
                      // helperText='현재는 시립대 소속만 가입 가능합니다.'
                      error= {errors?.itemType&&true}
                      options={[
                        {label:"가지", value:"1"},
                        {label:"갓", value:"2"},
                        {label:"미나리", value:"3"},
                        {label:"배추", value:"4"},
                        {label:"부추", value:"5"},
                      ]}
                    />
                  ),
              },{
                label: '청과류',
                content: 'fjdladksjcodasas',
              },{
                label: '곡류',
                content: 'fjdladksjcodasas',
              },{
                label: '견과류',
                content: 'fjdladksjcodasas',
              },{
                label: '버섯류',
                content: 'fjdladksjcodasas',
              },{
                label: '기타/가공품',
                content: 'fjdladksjcodasas',
              }]} />
            </Box>
          </ClickAwayListener>
        </Popover>
        <Popover 
          {...makePopoverProps('envFit')}
        >
          <ClickAwayListener onClickAway={handlePanelClose('envFit')}>
            <Box className={classes.box}>
            환경적합도
            </Box>
          </ClickAwayListener>
        </Popover>
        <Popover 
          {...makePopoverProps('delivery')}
        >
          <ClickAwayListener onClickAway={handlePanelClose('delivery')}>
            <Box className={classes.box}>
            배송
            </Box>
          </ClickAwayListener>
        </Popover>
        <Popover 
          {...makePopoverProps('detail')}
        >
          <ClickAwayListener onClickAway={handlePanelClose('detail')}>
            <Box className={classes.box}>
            세부필터
            </Box>
          </ClickAwayListener>
        </Popover>
      </AppBar>
  );
}
