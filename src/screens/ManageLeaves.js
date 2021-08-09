import React from 'react'
import { Text } from 'react-native'
import Background from '../components/Background'
import Button from '../components/Button'
// import ExampleForm from '../components/ExampleForm'
// import IconButtons from '../components/IconButtons'
import Styles from '../core/Styles'
// import { makeStyles } from '@material-ui/core/styles';
// import IconButton from '@material-ui/core/IconButton';
// import DataUsageOutlined from '@material-ui/icons/DataUsageOutlined';
// import AddCircleOutlineOutlined from '@material-ui/icons/AddCircleOutlineOutlined';

// const useStyles = makeStyles((theme) => ({
//   root: {
//     '& > *': {
//       margin: theme.spacing(1),
//     },
//   },
//   input: {
//     display: 'none',
//   },
// }));

export default function ManageLeaves({ navigation }) {
  // const classes = useStyles();
  return (
    <Background>
      <Text style={Styles.header}> Requested Leaves </Text>
      {/* <div className={classes.root}>
      <input className={classes.input} id="icon-button1" type="submit" />
      <label htmlFor="icon-button1">
        <IconButton  aria-label="" component="span" onPress={() => navigation.navigate('ManageLeaves')}>
          <DataUsageOutlined />
        </IconButton>
      </label>
      <input className={classes.input} id="icon-button2" type="submit" />
      <label htmlFor="icon-button2">
        <IconButton  aria-label="" component="span" onPress={() => navigation.navigate('ApprovedLeaves')}>
          <DataUsageOutlined />
        </IconButton>
      </label>
      <input className={classes.input} id="icon-button3" type="submit" />
      <label htmlFor="icon-button3">
        <IconButton  aria-label="" component="span" onPress={() => navigation.navigate('ApplyLeaves')}>
          <AddCircleOutlineOutlined />
        </IconButton>
      </label>
      </div> */}
       {/* <IconButtons/> */}
      {/* <label> */}
        <Button mode="outlined" onPress={() => navigation.navigate('ApplyLeaves')}>Apply</Button>
        <Button mode="outlined" onPress={() => navigation.navigate('ApprovedLeaves')}>Approved</Button> 
        <Button mode="outlined" onPress={() => navigation.navigate('ManageLeaves')}>Requested</Button> 
      {/* </label> */}
      {/* <ExampleForm/>
      <ExampleForm/>
      <ExampleForm/>  */}

    </Background>
  )
}