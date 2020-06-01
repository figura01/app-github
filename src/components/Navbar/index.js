import React from 'react';
import {
    Container,
    Icon,
    Menu,
} from 'semantic-ui-react'
import './navbar.scss';

const Navbar = () => (
    <div id="navbar">
        <Menu fixed='top' inverted className="menu">
            <Container>
                <Menu.Item as='a' header>
                    <Icon name='github' />
                    Github App
                </Menu.Item>
            </Container>
        </Menu>
    </div>
);

export default Navbar