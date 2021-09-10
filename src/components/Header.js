import React, { Component } from 'react';

class Header extends Component {
    render() {
        return (
            <header>
                <h1><a href="/" onClick={function (e) {
                    e.preventDefault();
                    this.props.onClickHeaderTitle();
                }.bind(this)}>{this.props.title}</a></h1>
                {this.props.content}
            </header>
        );
    }
}

export default Header;