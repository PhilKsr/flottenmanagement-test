import { Menu } from "antd";
import { NavLink } from "react-router-dom";

export default function Navbar() {
  /*   const handleClick = (e) => {
    console.log("click ", e);
    this.setState({ current: e.key });
  };
  const { current } = this.state; */
  return (
    <Menu mode='horizontal'>
      <Menu.Item key='home' className='mb-8'>
        <NavLink to='/' className='m-4'>
          Home
        </NavLink>
      </Menu.Item>
      <Menu.Item key='vehicles' className='mb-8'>
        <NavLink to='/vehicles' className='m-4'>
          Fahrzeuge
        </NavLink>
      </Menu.Item>
      <Menu.Item key='vehicletypes' className='mb-8'>
        <NavLink to='/vehicletypes' className='m-4'>
          Fahrzeugtypen
        </NavLink>
      </Menu.Item>
    </Menu>
  );
}
