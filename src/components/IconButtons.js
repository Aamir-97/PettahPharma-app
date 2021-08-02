import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import DataUsageOutlinedIcon from '@material-ui/icons/DataUsageOutlined';
import IconButton from '@material-ui/core/IconButton';
import { teal } from '@material-ui/core/colors';
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import { theme } from '../core/theme'
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    }
  },
}));

export default function UploadButtons() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
            <IconButton>
                <DataUsageOutlinedIcon fontSize="large" style={{ color: teal[500] }}/>
            </IconButton>
            <IconButton>
                <DataUsageOutlinedIcon style={{ fontSize: 40 }}/>
            </IconButton>
            <IconButton>
                <AddCircleOutlineOutlinedIcon style={{ fontSize: 40 }}/>
            </IconButton>
    </div>
  );
}
