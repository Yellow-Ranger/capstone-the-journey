import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
  Link,
} from "react-router-dom";
import React, { useRef, useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import { Button } from "semantic-ui-react";
import { getProfileByUsername } from "./services/profileApi";
import "mapbox-gl/dist/mapbox-gl.css";
import "./styling/App.css";
import AuthContext from "./AuthContext";
import NavBar from "./NavBar";
import Login from "./components/Login";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NotFound from "./NotFound";
import TripOverview from "./components/TripOverviewComponents/TripOverview";
import Register from "./components/Register";
import ProfileForm from "./components/profileComponents/profileForm";
import ProfileView from "./components/profileComponents/profileView";
import Map from "./components/Map";
import TripPlanner from "./components/LocationList";
import ViewHome from "./components/ViewHome";
import AllTrips from "./components/allTripsComponents/allTrips";

function App() {
  const [user, setUser] = useState({ username: "" });
  const [profile, setProfile] = useState({
    profileId: 0,
    profilePhoto: "",
    profileDescription: "",
    name: "",
    userId: 0,
    tripList: [],
  });

  const login = (token) => {
    const decodedToken = jwt_decode(token);

    const nextUser = { ...user };
    nextUser.username = decodedToken.sub;
    nextUser.roles = decodedToken.authorities.split(",");
    nextUser.token = token;
    nextUser.isAdmin = function () {
      return this.roles?.includes("ROLE_ADMIN");
    };

    setUser(nextUser);
    getProfileByUsername(nextUser.username)
      .then(setProfile)
      .catch((error) => {
        toast.error(`${error}`);
      });
  };

  const logout = () => {
    setUser({ username: "" });
    setProfile({
      profileId: 0,
      profilePhoto: "",
      profileDescription: "",
      name: "",
      userId: 0,
      tripList: [],
    });
  };

  const editableTrips = () => {
    const tripIds = [];
    if (profile.tripList === null) {
      return tripIds;
    }
    profile.tripList.map((trip) => tripIds.push(trip.tripId));
    return tripIds;
  };

  const auth = {
    user,
    profile,
    editableTrips,
    login,
    logout,
  };

  return (
    <>
      <div id="home-main">
        <AuthContext.Provider value={auth}>
          <div>
            <Router>
              <NavBar />
              <Switch>
                <Route exact path="/login">
                  <Login />
                </Route>
                <Route exact path="/register">
                  <Register />
                </Route>
                <Route exact path="/profile">
                  <ProfileView />
                </Route>
                <Route exact path="/create/profile">
                  <ProfileForm />
                </Route>
                <Route exact path="/adventure/planning">
                  <Map />
                </Route>
                <Route exact path="/allTrips">
                  <AllTrips />
                </Route>
                <Route exact path="/trip/overview/:tripId">
                  <TripOverview />
                </Route>
                <Route exact path="/">
                  <ViewHome />
                </Route>
                <Route>
                  <NotFound />
                </Route>
              </Switch>
            </Router>
            <ToastContainer />
          </div>
        </AuthContext.Provider>
      </div>
    </>
  );
}

export default App;
