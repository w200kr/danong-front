import React from 'react';
import { useForm } from "react-hook-form";
import { makeStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import Box from '@material-ui/core/Box';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Paper from '@material-ui/core/Paper';
import Popover from '@material-ui/core/Popover';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';

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

  const tabsActions = React.useRef()
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
          onEntered={(props)=>{
            tabsActions.current.updateIndicator()
          }}
        >
          <ClickAwayListener onClickAway={handlePanelClose('item')}>
            <Box className={classes.box}>
              <VerticalTabs 
                tabsActions={tabsActions}
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
                content: (
                  <FormCheckbox
                    name='itemType'
                    controllerProps={{...baseControllerProps}}
                    // labelText='소속 팀 선택'
                    // helperText='현재는 시립대 소속만 가입 가능합니다.'
                    error= {errors?.itemType&&true}
                    options={[
                      {label:"사과", value:"1"},
                      {label:"배", value:"2"},
                      {label:"딸기", value:"3"},
                    ]}
                  />
                ),
              },{
                label: '곡류',
                content: (
                  <FormCheckbox
                    name='itemType'
                    controllerProps={{...baseControllerProps}}
                    // labelText='소속 팀 선택'
                    // helperText='현재는 시립대 소속만 가입 가능합니다.'
                    error= {errors?.itemType&&true}
                    options={[
                      {label:"쌀", value:"1"},
                      {label:"보리", value:"2"},
                      {label:"밀", value:"3"},
                    ]}
                  />
                ),
              },{
                label: '견과류',
                content: (
                  <FormCheckbox
                    name='itemType'
                    controllerProps={{...baseControllerProps}}
                    // labelText='소속 팀 선택'
                    // helperText='현재는 시립대 소속만 가입 가능합니다.'
                    error= {errors?.itemType&&true}
                    options={[
                      {label:"땅콩", value:"1"},
                      {label:"캐슈넛", value:"2"},
                    ]}
                  />
                ),
              },{
                label: '버섯류',
                content: (
                  <FormCheckbox
                    name='itemType'
                    controllerProps={{...baseControllerProps}}
                    // labelText='소속 팀 선택'
                    // helperText='현재는 시립대 소속만 가입 가능합니다.'
                    error= {errors?.itemType&&true}
                    options={[
                      {label:"송이버섯", value:"1"},
                      {label:"느타리버섯", value:"2"},
                    ]}
                  />
                ),
              },{
                label: '기타/가공품',
                content: (
                  <FormCheckbox
                    name='itemType'
                    controllerProps={{...baseControllerProps}}
                    // labelText='소속 팀 선택'
                    // helperText='현재는 시립대 소속만 가입 가능합니다.'
                    error= {errors?.itemType&&true}
                    options={[
                      {label:"홍삼", value:"1"},
                    ]}
                  />
                ),
              }]} />
            </Box>
          </ClickAwayListener>
        </Popover>
        <Popover 
          {...makePopoverProps('envFit')}
        >
          <ClickAwayListener onClickAway={handlePanelClose('envFit')}>
            <Box className={classes.box}>
              <Grid container>
                <Grid className={classes.innerBox} item xs={3} component={Box} borderRight={1}>
                  <FormCheckbox
                    name='grade'
                    controllerProps={{...baseControllerProps}}
                    fieldProps={{
                      row: false,
                    }}
                    labelText='급지'
                    helperText='* 선택 상품에 따라 고르신 지역에서 가장 가까운 거리순으로 추천합니다.'
                    error= {errors?.grade&&true}
                    options={[
                      {label:"1급지", value:"1"},
                      {label:"2급지", value:"2"},
                      {label:"무관", value:"3"},
                    ]}
                  />
                </Grid>
                <Grid className={classes.innerBox} item xs={3} component={Box} borderRight={1}>
                  <FormCheckbox
                    name='env'
                    controllerProps={{...baseControllerProps}}
                    fieldProps={{
                      row: false,
                    }}
                    labelText='친환경 제품'
                    helperText='* 유기농, 자연산 등을 뜻하는 것이 아닌 재배, 생육, 생산, 포장, 유통 단계에서의 낮은 탄소배출을 의미합니다.'
                    error= {errors?.env&&true}
                    options={[
                      {label:"저탄소", value:"1"},
                      {label:"선택안함", value:"2"},
                    ]}
                  />
                </Grid>
                <Grid item xs={6} container>
                  <Grid item xs={12} component={Box} borderBottom={1} style={{padding:30}}>
                    <Typography id="soil-fit-slider" gutterBottom>
                      토지적합성
                    </Typography>
                    <Slider
                      defaultValue={[40,10]}
                      aria-labelledby="soil-fit-slider"
                      step={-10}
                      marks={[
                        {
                          value: 40,
                          label: '1급',
                        },
                        {
                          value: 30,
                          label: '2급',
                        },
                        {
                          value: 20,
                          label: '3급',
                        },
                        {
                          value: 10,
                          label: '비관련',
                        },
                      ]}
                      min={10}
                      max={40}
                    />
                  </Grid>
                  <Grid item xs={12} style={{padding:30}}>
                    <Typography id="weather-fit-slider" gutterBottom>
                      기후적합성
                    </Typography>
                    <Slider
                      defaultValue={[40,10]}
                      aria-labelledby="weather-fit-slider"
                      step={-10}
                      marks={[
                        {
                          value: 40,
                          label: '1급',
                        },
                        {
                          value: 30,
                          label: '2급',
                        },
                        {
                          value: 20,
                          label: '3급',
                        },
                        {
                          value: 10,
                          label: '비관련',
                        },
                      ]}
                      min={10}
                      max={40}
                    />
                  </Grid>
                </Grid>
              </Grid>
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
