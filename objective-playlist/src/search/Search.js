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
    var accessToken = 'BQC_RppbQVank8T0MTZ3j7d9Nv9QpT9XKChm81eO0YHxtSdpkBEBxyTHyLOTfIHZXoiBPe9J994loGEr5LynhHx0cois3u2CZ7J1QUI-13zfOdH7QIwAVRWbpsmyK4OVXepq7becwz523a25oLjJOx_4FqCPRAIolR1U&refresh_token=AQC5zT4l0ArRmk7vubdCvVvXmXQmrOPr-VOZzQiLJuCI6uiQqC1vy8Us_pq2xaoLrOoU_gEUrZoh_mgLa9Ll3fg9cuPKb-dg7p5R0NXkvyPbfxb9ixf_37MczQymETN5Hyyzkw'

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
            label="Seed the database with songs from Spotify"
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
