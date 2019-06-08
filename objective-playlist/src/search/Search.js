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
    var accessToken = 'BQAUCOWsji0__2Po9MIPOBnfbB-h3kRQz7ngQcCmKiJp0IwS2d7BO64ZReZR-Nn0EI_1XbI8Nv7VmEbyDUz0W6esrXmk88IouuT9yDsQLIfyg5c85wbcwPBCplCyGFZu3tA_Rga-p7uOwAEPHj8jSw7TnWhL6KaYzbf0&refresh_token=AQC26Vm2TR24PXVVvUuIqxlb6sdMR3qsdk9WFBRjs7JERt22-A9oWKtuT2xkWVPixnb4VzcoA-wA-W0XVyy2rVHBR_rsIPKppNNFVW1u-yblK8hs2xTge98ccRgVOxiufoapag'

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
        return([t.artists[0].name, t.name, t.id])
      })
      let tracksAnalyzed = []
      tracks.forEach((t, i) => {
        fetch('https://api.spotify.com/v1/audio-analysis/' + t[2], myOptions)
        .then(response => response.json())
        .then(json => {
          tracksAnalyzed.push([t[0], t[1], json.track])
        })
      })
      console.log('duhjson: ', tracksAnalyzed)
      console.log('twacks: ', tracks)
      setTimeout(() => {
        this.setState({ result: tracksAnalyzed }, () => {
          console.log(this.state)
          this.post(tracksAnalyzed)
        })
      }, 3000)
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
