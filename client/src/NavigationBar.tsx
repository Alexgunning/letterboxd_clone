import React from 'react';
import { Menu } from 'semantic-ui-react'
import { useHistory } from 'react-router-dom'


const MenuBar = () => {
    let history = useHistory();
    const HandleItemClick = (e: any, obj: any) => {
        if (obj.name == 'home')
            history.push('/');
        else if (obj.name == 'signin')
            history.push('/auth');
    }

    return (
        <Menu >
            <Menu.Item
                name='home'
                onClick={HandleItemClick}
            >
                Home
        </Menu.Item>

            <Menu.Item
                name='signin'
                onClick={HandleItemClick}
            >
                Sign In
        </Menu.Item>
        </Menu>
    )
}
export default MenuBar;