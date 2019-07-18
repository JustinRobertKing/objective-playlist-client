import React, { Component } from 'react'
import axios from 'axios'
import Result from './Result'
import SERVER_URL from '../constants/server'

class ResultBox extends Component {
	state = {
		songs: []
	}
	componentDidMount() {
		console.log('results', this.props.results)
		// axios.post(`${SERVER_URL}/tracks/find`, this.props.results)
	}

	render() {
		if (this.props.results) {
			console.log('analytics', this.props.results.analytics.key.$numberDecimal)
		}

		let matches = []
		if (this.props.results) {
			matches = [...this.props.allTracks].map((t, i) => {
				if (t.analytics.key.$numberDecimal === this.props.results.analytics.key.$numberDecimal && 
					t.analytics.time_signature.$numberDecimal === this.props.results.analytics.time_signature.$numberDecimal &&
					t.analytics.mode.$numberDecimal === this.props.results.analytics.mode.$numberDecimal &&
					(t.analytics.tempo.$numberDecimal <= this.props.results.analytics.tempo.$numberDecimal + 5 ||
						t.analytics.tempo.$numberDecimal <= this.props.results.analytics.tempo.$numberDecimal - 5)) {
					console.log('got here')
					let src = 'https://open.spotify.com/embed/track/' + t.trackId
					return(
						<div>
{/*							<Result trackInfo={t} />
*/}							<iframe src={src} width="350" height="80" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>
						</div>
					)
				} else {
					return
				}
			})
		}

		let matches2 = []
		matches.forEach((m, i) => {
			if (m) {
				matches2.push(m)
			}
		})

		console.log('matches', matches)
		return (
			<div>
				{matches2[0] ? matches2 : <Result /> }
			</div>
		)
	}

}

export default ResultBox