// Navbar.js

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, Input, Icon } from 'semantic-ui-react';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchQuery } from '../../redux/actions';

const Navbar = () => {
  const searchQuery = useSelector((state) => state.search.searchQuery); // Get the search query from Redux
  const dispatch = useDispatch();
  const itemStyle = { padding: '20px' };
  const navigate = useNavigate();

  const handleSearch = () => {
    // Dispatch the setSearchQuery action with the user's input
    dispatch(setSearchQuery(searchQuery));

    // Redirect to the home page
    navigate('/home');
  };

  return (
    <Menu style={{ height: '20px' }}>
      <Menu.Item as={Link} to="/" header>
        KhanLibraries
      </Menu.Item>
      <Menu.Item as={Link} to="/home" style={itemStyle}>
        Home
      </Menu.Item>
      <Menu.Item as={Link} to="/about" style={itemStyle}>
        About
      </Menu.Item>
      <Menu.Item as={Link} to="/favorite-books" style={itemStyle}>
        Favorite Books
      </Menu.Item>
      <Menu.Item as={Link} to="/basket" style={itemStyle}>
        <Icon name="cart" />
      </Menu.Item>
      <Menu.Menu position="right">
      <Menu.Item>
          <Input
            icon="search"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => dispatch(setSearchQuery(e.target.value))} // Update the search query in Redux
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleSearch();
              }
            }}
          />
        </Menu.Item>
      </Menu.Menu>
    </Menu>
  );
};

export default Navbar;
