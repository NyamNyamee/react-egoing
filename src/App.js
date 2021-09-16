import React, { Component } from 'react';
import './App.css';

import Header from "./components/Header";
import Navigation from "./components/Navigation";
import ReadContent from "./components/ReadContent";
import CreateContent from "./components/CreateContent";
import UpdateContent from "./components/UpdateContent";
import Control from "./components/Control";

class App extends Component {
  /* 렌더링 전에, 생성자로 props에 전달한 state 세팅 */
  constructor(props) {
    super(props);  // props 초기화

    this.max_navigation_id = 3;  // 네비게이션 id 최대값 초기화

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

  getArticle() {
    /**
     * stata의 mode에 따라 본문(article)컴포넌트를 리턴
     */
    let title, content, article = null;
    if (this.state.mode === 'home') {  // 홈
      title = this.state.welcome.title;
      content = this.state.welcome.content;
      article = <ReadContent title={title} content={content}></ReadContent>
    } else if (this.state.mode === 'read') {  // 읽기
      title = this.state.navigation[this.state.nav_num].title;
      content = this.state.navigation[this.state.nav_num].content;
      article = <ReadContent title={title} content={content}></ReadContent>
    } else if (this.state.mode === 'create') {  // 생성
      article = <CreateContent title={title} content={content} onSubmit={function (title, description) {
        this.max_navigation_id += 1;
        // this.state.navigation.push(  // 이렇게 state값을 직접 변경하는건 좋지 않음. 오리지널state와 변경한state가 같아지기 떄문에 shouldComponentUpdate에서 컴포넌트를 렌더할지 말지 구분하기 어려움
        //   { id: this.max_navigation_id, title: title, content: description }
        // );
        // let navigation = this.state.navigation.concat(  // 1. 그래서 state값은 그대로 두고 새 값을 concat으로 추가해서 새로운 객체를 navigion변수에 저장
        //   { id: this.max_navigation_id, title: title, content: description }
        // );
        let navigation = Array.from(this.state.navigation) // 2. 그래서 state값은 그대로 두고  Array.from을 통해 새로운 객체를 navigation변수에 저장 (객체일 경우 Object.assign을 통해 복제 가능)
        navigation.push(
          { id: this.max_navigation_id, title: title, content: description }
        );
        this.setState({  // setState로 바뀐 값을 넣어주기
          navigation: navigation,
          mode: "read",  // 생성 후 바로 읽기로 이동하기 위해 state의 mode와 nav_num을 최대값으로 변경
          nav_num: this.max_navigation_id - 1
        });
      }.bind(this)}></CreateContent>
    } else if (this.state.mode === 'update') {  // 수정
      let data = {
        id: this.state.navigation[this.state.nav_num].id,
        title: this.state.navigation[this.state.nav_num].title,
        description: this.state.navigation[this.state.nav_num].content
      }
      article = <UpdateContent data={data} onSubmit={function (id, title, description) {
        let navigation = Array.from(this.state.navigation);
        for (let i = 0; i < navigation.length; i++) {
          if (navigation[i].id === id) {
            navigation[i] = { id: id, title: title, content: description }
            break;
          }
        }
        this.setState({
          navigation: navigation,
          mode: 'read' // 수정 후 즉시 읽기로 이동시키기 위해 state의 mode를 변경
        });
      }.bind(this)}></UpdateContent>
    }

    return article;
  }

  render() {
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
        <Control
          onClickControlList={
            function (mode) {
              if (mode === "delete") {  // 삭제
                if (window.confirm('delete confirm')) {  // 컨펌창 수락 시 true
                  let navigation = Array.from(this.state.navigation);
                  navigation.splice(this.state.nav_num, 1);
                  this.setState({
                    navigation: navigation,
                    mode: 'home'
                  });
                  alert("delete complete");
                }
              } else {  // 기타
                this.setState({
                  mode: mode
                });
              }
            }.bind(this)
          }>
        </Control>
        {/* <ReadContent
          title={title}
          content={content}>
        </ReadContent> */}
        {/* <Article
          title="article2"
          content="i do not want to go work">
        </Article> */}
        {this.getArticle()}
      </div >
    );
  }
}

export default App;
