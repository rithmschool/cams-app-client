import React, {Component} from 'react';
import logo from './logo.png'
import ucsf from './ucsf.svg'

class Home extends Component {

  render() {
    return (
      <div>
        <div className="banner-text">
          <h1 className="banner-bold">Computerized Assessment of Mental Status (CAMS)</h1>
          <p className="serif white">Redefining the baseline diagnosis and treatment process</p>
        </div>
        <div className="diagonaltop"></div>
        <div className="welcome content">
          <img className="content-image" alt="CAMS" src={logo}/>
          <img className="content-image" alt="UCSF" src={ucsf}/>
          <p className="content-logo body-bold serif">CAMS was developed by UCSF as a way to dynamically create personalized baseline mental health exams.</p>
        </div>
      </div>
    )
  }
}

export default Home;
