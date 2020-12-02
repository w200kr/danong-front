import React from 'react';
import { useFormContext } from "react-hook-form";
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
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import ToggleButton from '@material-ui/lab/ToggleButton';

import SearchIcon from '@material-ui/icons/Search';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import RefreshIcon from '@material-ui/icons/Refresh';

import FormCheckbox from 'components/Atoms/FormCheckbox/FormCheckbox.js'
import VerticalTabs from 'components/Tabs/VerticalTabs.js'

import {Fetch} from 'utils/Fetch.js'

import styles from "./SearchBar.style.js";

const useStyles = makeStyles(styles);

export default function SearchBar(props) {
  const {handleSearch, categories, fetchProducts, params, setParams, handleChangeParemeter, handleReset} = props
  const {handleSubmit, errors, control, register, getValues, watch} = useFormContext()
  const classes = useStyles();

  const tabsActions = React.useRef()
  const anchorRefs = {
    item: React.useRef(null),
    envFit: React.useRef(null),
    delivery: React.useRef(null),
    detail: React.useRef(null),
  };

  const [openPanels, setOpenPanels] = React.useState({
    item: false,
    envFit: false,
    delivery: false,
    detail: false,
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

  const options = categories.map((category)=>{
    return ({
      label: category.label,
      content: 
        category.sub_categories.map((subCategory, index)=>
          <FormControlLabel 
            key={index} 
            control={<Checkbox />}
            label={subCategory.name}
            checked={params.categories[subCategory.id] || false}
            onClick={e=>{
              e.preventDefault()
              handleChangeParemeter('categories', subCategory.id, !params.categories[subCategory.id])
            }}
          />
      ),
    })
  })

  const watchAddress = watch('address')

  return (
      <AppBar className={classes.appBar} component='div' position="static" color='default' variant='outlined' elevation={0}>
        <Toolbar className={classes.toolBar} disableGutters >
          <Paper className={classes.toolBarPaper} component="div" square
            variant='outlined' 
            elevation={0}
          >
            <InputBase
              className={classes.input}
              name='address'
              inputRef={register}
              placeholder="주소 검색"
              // inputProps={{ 'aria-label': 'search google maps' }}
            />
            <IconButton type="submit" className={classes.iconButton} aria-label="search" onClick={handleSearch(watchAddress)}>
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
            <IconButton type="reset" className={classes.iconButton} aria-label="search" onClick={handleReset}>
              <RefreshIcon />
            </IconButton>
          </Paper>
        </Toolbar>

        <Popover 
          {...makePopoverProps('item')}
          onEntered={(props)=>{
            tabsActions.current.updateIndicator()
          }}
        >
          <ClickAwayListener touchEvent={false} onClickAway={handlePanelClose('item')}>
            <Box className={classes.box}>
              <VerticalTabs 
                tabsActions={tabsActions}
                options={options} 
              />
            </Box>
          </ClickAwayListener>
        </Popover>
        <Popover 
          {...makePopoverProps('envFit')}
        >
          <ClickAwayListener touchEvent={false} onClickAway={handlePanelClose('envFit')}>
            <Box className={classes.box}>
              <Grid container>
                <Grid className={classes.innerBox} item xs={12} md={4} component={Box} borderRight={1}>
                  <FormControlLabel 
                    control={<Checkbox />}
                    label='자연산 농산물'
                    checked={params.envFit['natural']}
                    onClick={e=>{
                      e.preventDefault()
                      handleChangeParemeter('envFit', 'natural', !params.envFit['natural'])
                    }}
                  />
                  <FormControlLabel 
                    control={<Checkbox />}
                    label='유기농 인증 농산물'
                    checked={params.envFit['organic']}
                    onClick={e=>{
                      e.preventDefault()
                      handleChangeParemeter('envFit', 'organic', !params.envFit['organic'])
                    }}
                  />
                  <FormControlLabel 
                    control={<Checkbox />}
                    label='무농약 인증 농산물'
                    checked={params.envFit['pesticide_free']}
                    onClick={e=>{
                      e.preventDefault()
                      handleChangeParemeter('envFit', 'pesticide_free', !params.envFit['pesticide_free'])
                    }}
                  />
                  <FormControlLabel 
                    control={<Checkbox />}
                    label='저농약 인증 농산물'
                    checked={params.envFit['low_pesticide']}
                    onClick={e=>{
                      e.preventDefault()
                      handleChangeParemeter('envFit', 'low_pesticide', !params.envFit['low_pesticide'])
                    }}
                  />
                  <FormControlLabel 
                    control={<Checkbox />}
                    label='저탄소 배출 농산물'
                    checked={params.envFit['low_cabon']}
                    onClick={e=>{
                      e.preventDefault()
                      handleChangeParemeter('envFit', 'low_cabon', !params.envFit['low_cabon'])
                    }}
                  />
                </Grid>
                <Grid className={classes.innerBox} item xs={12} md={8} component={Box} borderRight={1}>
                  <p className={classes.helperText}>『유기농산물』 : 유기합성농약과 화학비료를 사용하지 않고 재배한 농산물</p>
                  <p className={classes.helperText}>『무농약농산물』 : 유기합성농약은 사용하지 않고 화학비료는 권장시비량의 1/3이하를 사용하여 재배한 농산물</p>
                  <p className={classes.helperText}>『저농약농산물』 : 유기합성농약의 살포횟수는 1/2이하, 최종살포일은 2배수를 적용하고 화학비료는 권장시비량의 1/2이하로 사용하여 재배한 농산물</p>
                  <p className={classes.helperText}>『저탄소농산물』 : 유기농, 자연산 등을 뜻하는 것이 아닌 재배, 생육, 생산, 포장, 유통 단계에서의 낮은 탄소배출을 의미합니다.'</p>
                </Grid>
                {/*
                  <Grid item xs={12} md={6} container>
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
                        // checked={params.categories[subCategory.id] || false}
                        onChangeCommitted={(e,value)=>{
                          console.log(value)
                        }}
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
                  </Grid>*/}
              </Grid>
            </Box>
          </ClickAwayListener>
        </Popover>
        <Popover 
          {...makePopoverProps('delivery')}

          PaperProps={{
            className: classes.smallPanel,
          }}
        >
          <ClickAwayListener touchEvent={false} onClickAway={handlePanelClose('delivery')}>
            <Box className={classes.box} display='flex' style={{
              padding:12,
            }}>
              <FormControlLabel 
                control={<Checkbox />}
                label='무료 배송'
                checked={params.delivery['free_shipping']}
                onClick={e=>{
                  e.preventDefault()
                  handleChangeParemeter('delivery', 'free_shipping', !params.delivery['free_shipping'])
                }}
              />
              <FormControlLabel 
                control={<Checkbox />}
                label='즉시 발송'
                checked={params.delivery['same_day_shipping']}
                onClick={e=>{
                  e.preventDefault()
                  handleChangeParemeter('delivery', 'same_day_shipping', !params.delivery['same_day_shipping'])
                }}
              />
            </Box>
          </ClickAwayListener>
        </Popover>
      </AppBar>
  );
}
