import React, { Component } from 'react'

class Result extends Component {
	render() {
		console.log('Result Props: ', this.props)
		if (this.props.trackInfo) {
			return (
				<div className="result">
					<img src={this.props.trackInfo ? this.props.trackInfo.imageURL : 'https://www.placecage.com/c/50/50'} />
					<p className="trackBox">
						<span>Artist: {this.props.trackInfo ? this.props.trackInfo.artist : ''}</span><br />
						<span>Title: {this.props.trackInfo ? this.props.trackInfo.title : ''}</span><br />
						<span className="matchedBy">Shares: <em>key, mode, time signature, within 5bpm</em></span>
					</p>
				</div>
			)
		} else {
			return(
				<div className="result">
					<em> search for a track</em>
				</div>
			)
		}
	}
}

export default Result