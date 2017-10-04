import React from "react";
import logo from "./images/logo.png";
import ucsf from "./images/ucsf.svg";
import josh from "./images/josh.jpg";
import tim from "./images/tim.jpg";
import va from "./images/VA.png";
import assess from "./images/assess.png";
import create from "./images/create.png";
import user from "./images/user.png";
import happy from "./images/happy.png";
import "./Home.css";

const Home = () => (
  <div>
    <div className="banner-text">
      <h1 className="banner-bold">
        Computerized Assessment of Mental Status (CAMS)
      </h1>
      <p className="serif white">
        Redefining the baseline diagnosis and treatment process
      </p>
    </div>
    <div className="content">
      <div className="welcome">
        <img className="content-image" alt="CAMS" src={logo} />
        <img className="content-image" alt="UCSF" src={ucsf} />
        <p className="content-logo body-bold serif">
          CAMS was developed by UCSF as a way to dynamically create personalized
          baseline mental health exams.
        </p>
      </div>

      <div className="bucket">
        <div>
          <img
            alt="Time Campellone, PhD"
            className="profiles button-hover"
            src={tim}
          />
          <p className="profile-title">Tim Campellone, PhD</p>
        </div>
        <div>
          <img
            alt="SF VA Health Care System"
            className="profiles button-hover"
            src={va}
          />
          <p className="profile-title">San Francisco VA Health Care System</p>
        </div>
        <div>
          <img
            alt="Josh Woolley, MD, PhD"
            className="profiles button-hover"
            src={josh}
          />
          <p className="profile-title">Josh Woolley, MD, PhD</p>
        </div>
      </div>
      <div>
        <p className="serif quote">
          “Nearly all the grandest discoveries of science have been but the
          rewards of accurate measurement…”
        </p>
        <p className="right">- Baron William Thomson Kelvin</p>
      </div>
      <div className="bucket-fancy">
        <div>
          <img alt="Create" className="box button-hover" src={create} />
          <p className="profile-title-fancy">Create a Video Playlist</p>
        </div>
        <div>
          <img alt="Watch" className="box button-hover" src={user} />
          <p className="profile-title-fancy">
            Patients Reactions to Playlist and Prompts are Recorderd
          </p>
        </div>
        <div>
          <img alt="Assess" className="box button-hover" src={assess} />
          <p className="profile-title-fancy">
            Clinician Reviews and Assess Returned Video
          </p>
        </div>
        <div>
          <img alt="Happy" className="box button-hover" src={happy} />
          <p className="profile-title-fancy">
            Reduce Patient Visits and Clinician Time
          </p>
        </div>
      </div>
    </div>
  </div>
);

export default Home;
