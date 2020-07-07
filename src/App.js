import React, { useState, Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './components/layout/navbar/Navbar.component';
import Users from './components/users/Users.component';
import User from './components/users/User.component';
import Search from './components/users/Search.component';
import { Alert } from './components/layout/Alert/Alert.component';
import { About } from './components/layout/pages/About.component';
import axios from 'axios';
import './App.css';

const App = () => {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({});
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);
  // const [data,setdata]=useState(null);

  // useEffect(async () => {
  //   setLoading(true); // to be able to change the state we use setState- True because it loading

  //   const res = await axios.get(
  //     `https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
  //   );

  //   setState(res.data);
  //   setLoading(false);
  //   // eslint-disable-next-line
  // }, []);

  // Search Github Users
  // there aren't methods part of the class so we need to declare them
  const searchUsers = async (text) => {
    setLoading(true);

    const res = await axios.get(
      `https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );

    //this.setState({ users: res.data.items, loading: false });
    setUsers(res.data.items);
    setLoading(false);
  };

  // Get single Github User
  const getUser = async (username) => {
    setLoading(true);

    const res = await axios.get(
      `https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );

    // this.setState({ user: res.data, loading: false });
    setUser(res.data);
    setLoading(false);
  };

  // Get user Repo
  const getUserRepos = async (username) => {
    // this.setState({ loading: true });
    setLoading(true);

    const res = await axios.get(
      `https://api.github.com/users/${username}/repos?per_page=5&sortclient=created:acs&_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );

    // this.setState({ repos: res.data, loading: false });
    setRepos(res.data);
    setLoading(false);
  };

  // clear users from state
  // clearUsers = () => this.setState({ users: [], loading: false });
  const clearUsers = () => {
    setUsers([]);
    setLoading(false);
  };

  const showAlert = (msg, type) => {
    setAlert({ msg, type });
    setTimeout(() => setAlert(null), 5000);
  };
  // Set Alert // put the alert in the state
  // setAlert = (msg, type) => {
  //   this.setState({ alert: { msg, type } });
  //   setTimeout(() => this.setState({ alert: null }), 5000);
  // };

  // take away the render and destructuring (const) because we don't have a class anymore we don't have to pull it from this dot state.
  // render() {
  //   const {users, user, repos,loading}=this.state;

  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="container">
          {/* <Alert alert={this.state.alert}  */}
          <Alert alert={alert} />
          <Switch>
            <Route
              exact
              path="/"
              render={(props) => (
                <Fragment>
                  <Search
                    // searchUsers={this.searchUsers}
                    // clearUsers={this.clearUsers}
                    // showClear={users.length > 0 ? true : false}
                    // setAlert={this.setAlert}
                    searchUsers={searchUsers}
                    clearUsers={clearUsers}
                    showClear={users.length > 0 ? true : false}
                    setAlert={showAlert}
                  />
                  {/* Getting the props form search.component */}
                  <Users loading={loading} users={users} />
                  {/* passing the props to Users.component.jsx */}
                </Fragment>
              )}
            />
            <Route exact path="/about" component={About} />
            <Route
              exact
              path="/user/:login"
              render={(props) => (
                <User
                  {...props}
                  // getUser={this.getUser}
                  // getUserRepos={this.getUserRepos}
                  getUser={getUser}
                  getUserRepos={getUserRepos}
                  repos={repos}
                  user={user}
                  loading={loading}
                />
              )}
            />
          </Switch>
        </div>
      </div>
    </Router>
  );
  // }
};

export default App;
