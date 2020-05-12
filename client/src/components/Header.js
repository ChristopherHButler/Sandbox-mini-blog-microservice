import React from 'react';
import PropTypes from 'prop-types';


const Header = ({ title }) => {
  return (
    <nav class="navbar navbar-dark bg-dark">
      <span class="navbar-brand mb-0 h1">{title}</span>
    </nav>
  );
};

Header.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Header;