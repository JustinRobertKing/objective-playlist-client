import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import axios from 'axios'

class Search extends React.Component {
  state = {
    search: ''
  }

  handleChange = (e) => {
    this.setState({ search: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault()
    axios.get
  }

  render() {
    return (
      <div>
        <form className="container" noValidate autoComplete="off">
          <TextField
            id="filled-search"
            label="Search by song"
            style={{ margin: 8 }}
            fullWidth
            margin="normal"
            type="search"
            margin="normal"
            variant="filled"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    edge="end"
                  >
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </form>
      </div>
    );
  }
}

export default Search;
