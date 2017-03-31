import React, {Component} from 'react';

class Timer extends Component {
	constructor(props){
		super(props);
	}

	render() {
		return (
			<div>
				<div className="timer">
					<h2 className='center'> {this.props.count} </h2>
				</div>
			</div>
		);
	}
}

export default Timer;