import React, { Component } from 'react';

class Header extends Component {
    render() {
        return (
            <header>
                <h1><a href="/" onClick={function (e) {
                    e.preventDefault();  // a태그의 기본속성인 페이지 이동 속성을 제거
                    this.props.onClickHeaderTitle();  // props중 클릭 이벤트에 사용할 메서드를 호출. 뒤에 .bind(this)로 현재 클래스(Header)를 바인드해줘야 함
                }.bind(this)}>{this.props.title}</a></h1>
                {this.props.content}
            </header>
        );
    }
}

export default Header;