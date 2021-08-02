import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 260,
  },
}));

export default function SimpleSelect() {
  const classes = useStyles();
  const [type, setType] = React.useState('');

  const handleChange = (event) => {
    setType(event.target.value);
  };

  return (
    <div>
      <FormControl className={classes.formControl}>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={type}
          onChange={handleChange}
        >
          <MenuItem value={1}>Sick Leave</MenuItem>
          <MenuItem value={2}>Day Off</MenuItem>
          <MenuItem value={3}>Paid Vacation</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}
