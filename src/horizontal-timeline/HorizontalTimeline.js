import React,  {Component} from 'react';
import EventsBar from './EventsBar';


class HorizontalTimeline extends Component {

 	render() {
 		if(!this.props.containerWidth) {
 			return false;
 		}

 		const seperation = ( times, minEventPadding, maxEventPadding, startPadding ) => {
 			const distances = new Array(times.length);
 			distances[0] = startPadding
 			for (let idx=1; idx<distances.length; idx++) {
 				// calculating distance from origin
 				distances[idx] = distances[idx-1] + (times[idx - 1] * maxEventPadding);
 			}
 			return distances;
 		}

 		const props = this.props;
 		const times = this.props.values;

 		const distances = seperation(
 			times,
 			this.props.minEventPadding,
 			this.props.maxEventPadding,
 			this.props.linePadding,
 		);

 		const events = distances.map((distance, index) => ({
 			distance,
 			time: this.props.values[index]
 		}));


 		const totalWidth = Math.max(
 			events[events.length - 1].distance + this.props.linePadding,
 			this.props.containerWidth
 		);
 		
 		let barPaddingRight = 0;
 		let barPaddingLeft = 0;

 		return (
 			<EventsBar
 				width={this.props.containerWidth}
 				height={this.props.containerHeight}
 				events={events}
 				index={this.props.index}
 				spaceBarClick={this.props.spaceBarClick}
 				totalWidth={totalWidth}
 				barPaddingLeft={barPaddingLeft}
 				barPaddingRight={barPaddingRight}
 				fillingMotion={props.fillingMotion}
 				slidingMotion={props.slidingMotion}
 				styles={props.styles}
 				isTouchEnabled={props.isTouchEnabled}
 				keyBoardEnabled={this.props.keyBoardEnabled}
 			/>
 		)

 	}
}

HorizontalTimeline.defaultProps = {
	styles: {
		outline: '#dfdfdf',
		background: '#dfdfdf',
		foreground: '#00c5cc'
	},

	fillingMotion: {
    stiffness: 150,
    damping: 25
  },
  slidingMotion: {
    stiffness: 150,
    damping: 25
  },
  isTouchEnabled: true,
};

export default HorizontalTimeline