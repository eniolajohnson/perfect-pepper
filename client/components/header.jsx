import React from 'react';
import AppContext from '../lib/app-context';

export default class Header extends React.Component {
  render() {
    const { user, handleSignOut } = this.context;
    return (
      <nav className="p-2 navbar navbar-dark bg-dark shadow-sm">
        <div className="container">
          <a href="#" className="navbar-brand header" >
            perfect pepper
          </a>
        <div>
            {user !== null &&
              <button className="btn btn-dark" onClick={handleSignOut}>
              Sign out
                <i className="ms-2 fas fa-power-off" />
              </button>
            }
            {user === null &&
              <>
                <a href="#sign-in" className="welcome btn btn-primary">
                  Sign In
                </a>
                <a href="#sign-up" className="welcome btn btn-dark">
                  Sign Up
                </a>
              </>
            }
          </div>
        </div>
      </nav>
    );
  }
}

Header.contextType = AppContext;
<i class="fas fa-power-off"></i>
