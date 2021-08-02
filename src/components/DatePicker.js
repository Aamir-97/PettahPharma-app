// import 'date-fns';
// import React from 'react';
// import Grid from '@material-ui/core/Grid';
// import DateFnsUtils from '@date-io/date-fns';
// import {
//   MuiPickersUtilsProvider,
//   KeyboardDatePicker,
// } from '@material-ui/pickers';

// export default function MaterialUIPickers() {
  
//   const [selectedDate, setSelectedDate] = React.useState(new Date('2021-08-18T21:11:54'));

//   const handleDateChange = (date) => {
//     setSelectedDate(date);
//   };

//   return (
//     <MuiPickersUtilsProvider utils={DateFnsUtils}>
//       <Grid container justifyContent="space-around">
//         <KeyboardDatePicker
//           disableToolbar
//           variant="inline"
//           format="MM/dd/yyyy"
//           margin="normal"
//           id="date-picker-inline"
//           label="Date picker inline"
//           value={selectedDate}
//           onChange={handleDateChange}
//           KeyboardButtonProps={{
//             'aria-label': 'change date',
//           }}
//         />
//       </Grid>
//     </MuiPickersUtilsProvider>
//   );
// }
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
}));

export default function DatePickers() {
  const classes = useStyles();

  return (
    <form className={classes.container} noValidate>
      <TextField
        id="date"
        type="date"
        className={classes.textField}
        InputLabelProps={{
          shrink: true,
        }}
      />
    </form>
  );
}
