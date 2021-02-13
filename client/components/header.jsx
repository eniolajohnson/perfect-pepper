import React from 'react';
import AppContext from '../lib/app-context';

export default class Header extends React.Component {
  render() {
    const { user, handleSignOut } = this.context;
    return (
      <nav className="navbar navbar-dark bg-dark shadow-sm">
        <div className="container">
          <a href="#" className="navbar-brand header" >
            perfect pepper
          </a>
        <div>
            {user !== null &&
              <button className="btn btn-dark" onClick={handleSignOut}>
                Sign out
                <i className="ms-2 fas fa-sign-out-alt" />
              </button>
            }
            {user === null &&
              <>
                <a href="#sign-in" className="btn btn-primary">
                  Sign In
                </a>
                <a href="#sign-up" className="btn btn-dark">
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
