import React from 'react';
import Icon from '@material-ui/core/Icon';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import SERVER_URL from '../constants/server';

class Search extends React.Component {
  state = {
    query: '',
    result: ''
  }

  handleChange = (e) => {
    this.setState({ query: e.target.value });
  };

  handleSubmit = (e) => {
    console.log('this.state', this.state);
    e.preventDefault()
    const BASE_URL = 'https://api.spotify.com/v1/search?';
    const FETCH_URL = BASE_URL + 'q=' + this.state.query + '&type=track';
    var accessToken = 'BQAvEVzf6UkPnhjWO7c9V9lE77tsq4h7LWMmSzyyBEi7rF3wQpdCe5Cooqe8UgRPmqrgbVdyfbu-t4vDAdkpGy2klfW_KyB_E_f7vcK3bKVcw7oXNd6BeRx83KxKbuUUcbekzzN4WtK4GSEMz1A6Mt2q283GO-1RFVPz&refresh_token=AQAsvFo8wL25jkrLZobUzHtVThLlh4maEwq5ndTELeI-kld5PY-5yoHhO-Qzrz4EyD-SnDBq14hIvi6gyuTgmXYWPExJ9cHWzsHQwh4YHkWiayndDmwcrcCThwS35I2xlPzGpQ'

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
      console.log('FUCK ME', json)
      let tracks = json.tracks.items.map((t, i) => {
        return([t.id, t.album.images[2].url, t.artists[0].name, t.name, t.uri])
      })
      let tracksAnalyzed = []
      tracks.forEach((t, i) => {
        fetch('https://api.spotify.com/v1/audio-analysis/' + t[0], myOptions)
        .then(response => response.json())
        .then(json => {
          tracksAnalyzed.push([...t, json.track])
        })
      })
      console.log('duhjson: ', tracksAnalyzed)
      console.log('twacks: ', tracks)
      setTimeout(() => {
        this.setState({ result: tracksAnalyzed }, () => {
          console.log(this.state)
          this.post(tracksAnalyzed)
        })
      }, 10000)
    })
  }

  post = (tracksAnalyzed) => {
    console.log('in post function: ', tracksAnalyzed)
    axios.post(`${SERVER_URL}/tracks`, tracksAnalyzed, {})
    .then(response => {
      console.log('le response: ', response)
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
            label="Search by song"
            style={{ margin: 8 }}
            fullWidth
            margin="normal"
            type="search"
            variant="filled"
            onChange={this.handleChange}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Icon className="fa fa-music"></Icon>
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
