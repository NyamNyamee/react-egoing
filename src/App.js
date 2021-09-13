import React, { Component } from 'react';
import './App.css';

import Header from "./components/Header";
import Navigation from "./components/Navigation";
import Article from "./components/Article";

class App extends Component {
  /* 렌더링 전에, 생성자로 props에 전달한 state 세팅 */
  constructor(props) {
    super(props);  // props 초기화

    this.state = {  // state 지정
      mode: "home",
      nav_num: 0,
      header: { title: "WWW", content: "World Wide Web" },
      navigation: [
        { id: 1, title: 'HTML', content: "HyperTextMarkupLanguage" },
        { id: 2, title: 'CSS', content: "Cascading Style Sheet" },
        { id: 3, title: 'JavaScript', content: "JavaScript" }
      ],
      welcome: { title: "Welcome", content: "Greetings Everyone!" }
    }
  }

  render() {
    let title, content = null;
    if (this.state.mode === 'home') {
      title = this.state.welcome.title;
      content = this.state.welcome.content;
    } else if (this.state.mode === 'read') {
      title = this.state.navigation[this.state.nav_num].title;
      content = this.state.navigation[this.state.nav_num].content;
    }

    return (
      <div className="App">
        {/* 사용자 지정 태그(객체)에 key=value 형태로 props(attribute) 지정 시 해당 객체에서 props 값을 받아 원하는 부분에 넣을 수 있음 */}
        <Header
          title={this.state.header.title}
          content={this.state.header.content}
          onClickHeaderTitle={
            function () {
              this.setState({
                mode: "home"
              });
            }.bind(this)}>  {/* 이벤트 함수 지정 */}
        </Header>
        {/* <header>
          <h1><a href="/" onClick={function (e) {  // 클릭 시 실행할 콜백함수(e는 클릭 이벤트) 설정
            e.preventDefault();  // a태그의 기본 속성인 href속성을 제거하여 클릭 시 불필요한 페이지 리로드 제거
            // this.state.mode = 'welcome';  // 불가능. 이유1) 이 함수 내에서 this는 현재 클래스를 가리키지 않음. 그래서 함수 뒤에 .bind(this)로 연결해줘야 함, 이유2) state에 직접 접근해서 변경하면, 리액트에서 이를 인식하지 못함
            this.setState({  // 따라서 직접 state를 변경할 수 없고, .setState({변경할 state:값}) 으로 변경해야 한다
              mode: "home"
            });
          }.bind(this)
          }>{this.state.header.title}</a></h1>
          {this.state.header.content}
        </header> */}
        <Navigation
          list={this.state.navigation}
          onClickNavList={
            function (id) {
              this.setState({
                mode: 'read',
                nav_num: id
              })
            }.bind(this)
          }>
        </Navigation>
        <Article
          title={title}
          content={content}>
        </Article>
        {/* <Article
          title="article2"
          content="i do not want to go work">
        </Article> */}
      </div >
    );
  }
}

export default App;
