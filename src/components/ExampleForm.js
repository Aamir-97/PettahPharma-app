import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TimelapseOutlined from '@material-ui/icons/TimelapseOutlined';
import { IconButton } from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
    fontSize: 11
  },
});

export default function OutlinedCard() {
  const classes = useStyles();

  return (
    <Card className={classes.root} variant="outlined" backgroundColor="#D2F7F7">
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>Request for Time Off</Typography>
        <Typography className={classes.pos}>7days July 21-28,2021</Typography>
        <Typography variant="body2" component="p"><IconButton><TimelapseOutlined fontSize="large"/></IconButton>John Smith<br />ID-MR2987</Typography>
        <Typography variant="body2" component="p" align="right" >Leaves Left<br />9/10</Typography>
      </CardContent>
    </Card>
  );
}
// import React from 'react';
// import { makeStyles } from '@material-ui/core/styles';
// import List from '@material-ui/core/List';
// import ListItem from '@material-ui/core/ListItem';
// import ListItemAvatar from '@material-ui/core/ListItemAvatar';
// import ListItemIcon from '@material-ui/core/ListItemIcon';
// import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
// import ListItemText from '@material-ui/core/ListItemText';
// import Avatar from '@material-ui/core/Avatar';
// import IconButton from '@material-ui/core/IconButton';
// import FormGroup from '@material-ui/core/FormGroup';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import Checkbox from '@material-ui/core/Checkbox';
// import Grid from '@material-ui/core/Grid';
// import Typography from '@material-ui/core/Typography';
// import TimelapseOutlinedIcon from '@material-ui/icons/TimelapseOutlined';
// import DeleteIcon from '@material-ui/icons/Delete';

// const useStyles = makeStyles((theme) => ({
//   root: {
//     flexGrow: 1,
//     maxWidth: 752,
//   },
//   demo: {
//     backgroundColor: theme.palette.background.paper,
//   },
//   title: {
//     margin: theme.spacing(4, 0, 2),
//   },
// }));

// function generate(element) {
//   return [0, 1, 2].map((value) =>
//     React.cloneElement(element, {
//       key: value,
//     }),
//   );
// }

// export default function InteractiveList() {
//   const classes = useStyles();
//   const [dense, setDense] = React.useState(false);
//   const [secondary, setSecondary] = React.useState(false);

//   return (
//     <div className={classes.root}>
//       <FormGroup row> </FormGroup>
//       <Grid container spacing={2}>
//         <Grid item xs={12} md={6}>
//           <Typography variant="h6" className={classes.title}>
//             Icon with text
//           </Typography>
//           <div className={classes.demo}>
//             <List dense={dense}>
//               {generate(
//                 <ListItem>
//                   <ListItemIcon>
//                     <TimelapseOutlinedIcon />
//                   </ListItemIcon>
//                   <ListItemText
//                     primary="Single-line item" />
//                 </ListItem>,
//               )}
//             </List>
//           </div>
//         </Grid>
//       </Grid>
//       <Grid container spacing={2}>
//         <Grid item xs={12} md={6}>
//           <Typography variant="h6" className={classes.title}>
//             Avatar with text and icon
//           </Typography>
//           <div className={classes.demo}>
//             <List dense={dense}>
//               {generate(
//                 <ListItem>
//                   <ListItemAvatar>
//                     <Avatar>
//                       <TimelapseOutlinedIcon />
//                     </Avatar>
//                   </ListItemAvatar>
//                   <ListItemText
//                     primary="Single-line item"/>
//                   <ListItemSecondaryAction>
//                   <ListItemText
//                     primary="Leaves left"/>
//                   </ListItemSecondaryAction>
//                 </ListItem>,
//               )}
//             </List>
//           </div>
//         </Grid>
//       </Grid>
//     </div>
//   );
// }
