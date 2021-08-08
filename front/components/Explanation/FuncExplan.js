import React, {useState, useCallback} from 'react';
import useSWR from 'swr';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import SendIcon from '@material-ui/icons/Send';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ForumIcon from '@material-ui/icons/Forum';
import PersonPinCircleOutlinedIcon from '@material-ui/icons/PersonPinCircleOutlined';
import TextsmsOutlinedIcon from '@material-ui/icons/TextsmsOutlined';
import ImageOutlinedIcon from '@material-ui/icons/ImageOutlined';
import AppsOutlinedIcon from '@material-ui/icons/AppsOutlined';
import FormatQuoteOutlinedIcon from '@material-ui/icons/FormatQuoteOutlined';

import { backUrl } from "../../config/config";


const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

const fetcher = (url) => axios.get(url, {withCredentials: true}).then((result) => result.data);

const FuncExplan = () => {
  
  const {data:postData, error:postErr} = useSWR(`${backUrl}/post/getAll`, fetcher);
  const classes = useStyles();
  const [userOpen, setUserOpen] = useState(false);
  const [postOpen, setPostOpen] = useState(false);


  const userClick = useCallback(() => {
    setUserOpen(!userOpen);
    // setUserOpen((prev) => !prev);
  },[userOpen]);

  const postClick = useCallback(() => {
    setPostOpen(!postOpen);
  },[postOpen]);

  if(!postData){
    return null;
  }

  const github = <a href="https://github.com/karkarson" target="_blank" rel="noreferrer noopener">Github</a>

  return (
    <List
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
          naversns.com
        </ListSubheader>
      }
      className={classes.root}
    >

      <ListItem button>
        <ListItemIcon>
          <SendIcon />
        </ListItemIcon>
        <ListItemText primary={github} />
      </ListItem>

      <ListItem button onClick={userClick}>
        <ListItemIcon>
          <AccountCircleIcon />
        </ListItemIcon>
        <ListItemText primary={`User (${postData.fullUser.length})`} />
        {userOpen ? <ExpandLess /> : <ExpandMore />}
      </ListItem>

      <Collapse in={userOpen} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {postData.fullUser.map((user)=> {
            return(
              <ListItem key={user.email} button className={classes.nested}>
                <ListItemIcon>
                  <PersonPinCircleOutlinedIcon />
                </ListItemIcon>
                <ListItemText primary={user.email} />
              </ListItem>
            )
          })}
        </List>
      </Collapse>

      <ListItem button onClick={postClick}>
        <ListItemIcon>
          <ForumIcon />
        </ListItemIcon>
        <ListItemText primary="Post" />
        {postOpen ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      
      <Collapse in={postOpen} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem button className={classes.nested}>
            <ListItemIcon>
              <TextsmsOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary={`게시물 (${postData.fullPost.length})`} />
          </ListItem>

          <ListItem button className={classes.nested}>
            <ListItemIcon>
              <ImageOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary={`이미지 (${postData.fullImage.length})`} />
          </ListItem>

          <ListItem button className={classes.nested}>
            <ListItemIcon>
              <AppsOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary={`해시태그 (${postData.fullHashtag.length})`} />
          </ListItem>

          <ListItem button className={classes.nested}>
            <ListItemIcon>
              <FormatQuoteOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary={`댓글 (${postData.fullComment.length})`} />
          </ListItem>

        </List>
      </Collapse>
      
    </List>
  );


}

export default FuncExplan;