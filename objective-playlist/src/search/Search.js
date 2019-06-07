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
    query: ''
  }

  handleChange = (e) => {
    this.setState({ query: e.target.value });
  };

  handleSubmit = (e) => {
    console.log('this.state', this.state);
    e.preventDefault()
    const BASE_URL = 'https://api.spotify.com/v1/search?';
    const FETCH_URL = BASE_URL + 'q=' + this.state.query + '&type=track';
    var accessToken = 'BQDT6PWvr06AMPXiUkYQSWJbQSBrvPIWqEGAA_IIzNGUSPI0GiYqEST7cP7y29pPAVIMf3LFwrLQzpqNhkyJV8hJqXONI3mScUCR8kbHRXnxBeC7fbYMpObsKW2xvzZ_HkylKapoOMgWhVa8P5L22o92i7_nzOhQ_smx&refresh_token=AQCQeahbPpN2m2EjR-Ex5-ck3v1O6RaAprs7RMDTlh1KH9m2mW21lRrhbGjAJ-P7jsLIcvDrgVyabvDGNPdOXHawk7xVF7lJk7qcfwPD00dF0MamDPVGjbAYRT5dmxyu8VwllA'

    var myOptions = {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + accessToken
      },
      mode: 'cors',
      cache: 'default'
    };

    fetch(FETCH_URL, myOptions)
      .then(response => response.json())
      .then(json => {
        console.log('duhjson: ', json)
        this.setState({ json });
      })
  }

  render() {
    return (
      <div>
        <form className="container" noValidate autoComplete="off" onSubmit={this.handleSubmit}>
          <TextField
            id="filled-search"
            label="Search by song"
            style={{ margin: 8 }}
            fullWidth
            margin="normal"
            type="search"
            margin="normal"
            variant="filled"
            onChange={this.handleChange}
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
