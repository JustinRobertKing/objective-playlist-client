import React from 'react';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import SERVER_URL from '../constants/server';

class Search extends React.Component {
  state = {
    artist: '',
    title: '',
  }

  handleArtistChange = (e) => {
    this.setState({ artist: e.target.value });
  };

  handleTitleChange = (e) => {
    this.setState({ title: e.target.value });
  };

  handleSubmit = (e) => {
  	e.preventDefault()
    axios.post(`${SERVER_URL}/tracks/find`, this.state)
    .then(response => {
      console.log('le response: ', response)
      this.props.update(response.data)
    })
    .catch(error => {
      console.log('error', error)
    })
  }

  render() {
    return (
      <div>
        <form className="container" noValidate autoComplete="off" onSubmit={this.handleSubmit}>
          <TextField
            id="filled-search"
            label="Artist"
            fullWidth
            margin="normal"
            type="search"
            variant="filled"
            onChange={this.handleArtistChange}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Icon className="fa fa-music"></Icon>
                </InputAdornment>
              ),
            }}
          />
          <TextField
            id="filled-search"
            label="Title"
            fullWidth
            margin="normal"
            type="search"
            variant="filled"
            onChange={this.handleTitleChange}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Icon className="fa fa-music"></Icon>
                </InputAdornment>
              ),
            }}
          />
          <Button style={{width: '95%'}} color="primary" variant="contained" size="medium" type="submit" >
	          Search
	        </Button>
        </form>
      </div>
    );
  }
}

export default Search;
