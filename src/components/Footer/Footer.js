import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { Container, Box, Grid, List, ListItem, ListItemText, Divider, Button } from "@material-ui/core";

import styles from "./Footer.style.js";

const useStyles = makeStyles(styles);

const Footer = (props)=> {
  const classes = useStyles();
  const {history, maxWidth, ...rest } = props;


  const listProps = {
    className: classes.list,
    dense: true,
    disablePadding: true,
  }
  const listItemProps = {
    className: classes.listItem,
    // button: true,
    // disableGutters: true,
    // dense: true,
    // divider: true,
  }

  const listItemTextProps = {
    className: classes.listItemText,
    disableTypography: true,
  }
  const dividerProps = {
    className: classes.divider,
    flexItem: true,
    orientation: 'vertical',
  }

  return (
    <Box className={classes.footer}>
      <Container maxWidth={maxWidth} disableGutters>
        <List {...listProps}>
          <ListItem {...listItemProps}>
            회사소개
          </ListItem>
          <Divider {...dividerProps} />
          <ListItem {...listItemProps}>
            이용약관
          </ListItem>
          <Divider {...dividerProps} />
          <ListItem {...listItemProps}>
            위치기반서비스 이용약관
          </ListItem>
          <Divider {...dividerProps} />
          <ListItem {...listItemProps}>
            개인정보처리방법
          </ListItem>
          <Divider {...dividerProps} />
          <ListItem {...listItemProps}>
            자동저장서비스
          </ListItem>
        </List>
        <Divider className={classes.divider} />
        <Box className={classes.companyInfoBox}>
          (주)한섬<br />
          대표 : 이창용<br />
          사업자번호 : 285-87-00558<br />
          주소 : 서울특별시 노원구 공릉로 232<br />
          <br />
          고객센터 : 02-949-8947 (평일 : 09:00 ~ 18:00 주말 및 공휴일 휴무)<br />
          팩스 : 050-4372-1045 허위매물 신고 : migokgan@daum.net<br />

          <Button variant='contained' size="small">
            자주 묻는 질문
          </Button>

          <Button variant='contained' size="small">
            1:1 문의 
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;