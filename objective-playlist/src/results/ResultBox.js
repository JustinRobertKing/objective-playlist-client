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
					t.analytics.mode.$numberDecimal === this.props.results.analytics.mode.$numberDecimal) {
					console.log('got here')
					return(
						<Result trackInfo={t} />
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