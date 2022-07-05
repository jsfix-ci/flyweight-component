import React from 'react';
import Menu from './components/Menu/menu';
import MenuItem from './components/Menu/MenuItem/menuItem';
import SubMenu from './components/Menu/SubMenu/subMenu';
import Switch from './components/Switch/switch';
function App() {
  return (
    <>
      <Menu>
        <SubMenu title="heh">
          <MenuItem>HEHE </MenuItem>
          <MenuItem>HEHE </MenuItem>
          <MenuItem>HEHE </MenuItem>
        </SubMenu>
      </Menu>
    </>
  );
}

export default App;
