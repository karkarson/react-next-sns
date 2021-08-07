import React, {useCallback} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(0.5),
    },
  },
}));

const ChipArray = () => {
  const classes = useStyles();

  const handleClick = useCallback((chipLabel) => () => {
    console.info(chipLabel);
  },[]);

  const chipInfo = [
    {label: 'React hooks', src:'https://img.icons8.com/office/16/000000/react.png' },
    {label: 'Redux', src:'https://img.icons8.com/material-outlined/16/000000/redux.png' },
    {label: 'redux-saga', src:'https://img.icons8.com/color/16/000000/redux.png' },
    {label: 'styled Components', src:'https://img.icons8.com/color/48/000000/web-components.png'},
    {label: 'Ant Design', src:'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg'},
    {label: 'Material-ui', src:'https://img.icons8.com/color/48/000000/material-ui.png'},
    {label: 'SWR', src:'https://img.icons8.com/ios/50/000000/circled-s.png'},
    {label: 'Next.js', src:'https://media.vlpt.us/images/yhg0337/post/381c4ed3-9c4b-4ec3-9528-147429736a81/1_2tmzU7bve-VlTkOMWsk_Hw.jpeg'},
    {label: 'Node(Express)', src:'https://img.icons8.com/windows/32/000000/node-js.png'},
    {label: 'Sequelize(MySQL)', src:'https://img.icons8.com/material-rounded/24/000000/mysql.png'},
    {label: 'AWS(EC2 + S3 + Lambda + Route53)', src:'https://img.icons8.com/windows/32/000000/amazon-web-services.png'},
    {label: 'https nginx+letsencrypt(certbot-auto)', src:'https://img.icons8.com/color/48/000000/nginx.png'},
  ];

  return (
    <div className={classes.root}>
      {chipInfo.map(info => {
        return (
          <Chip
            key={info.label}
            avatar={<Avatar alt={info.label} src={info.src} />}
            label={info.label}
            onClick={handleClick(info.label)}
            variant="outlined"
          />
        )
      })}
    </div>
  );
}

export default ChipArray;
    