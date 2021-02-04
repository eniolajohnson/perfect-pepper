import React from 'react';

export default function Header(props) {
  return (
    <header className="mb-5">
      <nav className="navbar navbar-dark bg-dark shadow-sm">
        <div className="container">
          <span className="col px-0">
              <a href="#" className="navbar-brand header">
              perfect pepper
              </a>
          </span>
          <span className='header-span'>
            <i className="header fas fa-bars"></i>
          </span>
        </div>
      </nav>
    </header>
  );
}
