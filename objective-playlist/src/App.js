import React from 'react';
import ye from './spotify.png'
import './App.css';
import queryString from 'query-string'
import Search from './search/Search'
import SearchDatabase from './search/SearchDatabase'
import Playlist from './results/Playlist'
import axios from 'axios'
import SERVER_URL from './constants/server'

class App extends React.Component {
	state = {
		allTracks: '',
		searchResults: '',
	}

	componentDidMount() {
		axios.get(`${SERVER_URL}/tracks`)
		.then(tracks => {
			this.setState({ allTracks: tracks.data }, () => {
				console.log(this.state)
			})
		})
	}

	updateSearchResults = (results) => {
		console.log(results[0])
		this.setState({ searchResults: results[0] }, () => {
			console.log(this.state)
		})
	}

	render() {
	  return (
	    <div className="App">
	      <header className="App-header">
	      	<h1>Objective Playlist</h1>        
	      </header>
{/*	      <Search accessToken="balls" />
*/}	      <SearchDatabase update={this.updateSearchResults} />
					<br />
					<Playlist results={this.state.searchResults} allTracks={this.state.allTracks} />    
			</div>
	  );
	}
}

export default App;
