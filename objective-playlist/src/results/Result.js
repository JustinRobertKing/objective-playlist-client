import React, { Component } from 'react'

class Result extends Component {
	render() {
		console.log('Result Props: ', this.props)
		return (
			<div className="result">
				Matched Track
			</div>
		)
	}
}

export default Result