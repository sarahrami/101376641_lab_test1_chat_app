import React from 'react';

const Navbar = () => {
  return (
    <div>
      <nav style={styles.navbar}>
        <ul style={styles.navList}>
          <li style={styles.navItem}>Chat App</li>
          <li style={styles.navItem}>Home</li>
          <li style={styles.navItemRight}>Logout</li>
        </ul>
      </nav>
    </div>
  );
}

const styles = {
  navbar: {
    backgroundColor: '#333',
    color: '#fff',
    padding: '10px',
  },
  navList: {
    listStyleType: 'none',
    display: 'flex',
    justifyContent: 'space-between',
    padding: '0',
    margin: '0',
  },
  navItem: {
    marginRight: '20px',
  },
  navItemRight: {
    marginLeft: 'auto',
  },
};

export default Navbar;
