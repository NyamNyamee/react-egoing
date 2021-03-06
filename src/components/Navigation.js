import { render } from '@testing-library/react';
import React, { Component } from 'react';

class Navigation extends Component {
    shouldComponentUpdate(new_props, new_state) {  // render함수 전에 호출되는 함수. return값이 true라면 render()호출, false라면 render()호출X
        let render_flag = true;

        if (new_props.list === this.props.list) {  // 새로운 props와 기존props가 동일하다면 새로 렌더할 필요가 없음
            render_flag = false;
        }

        return render_flag;
    }

    render() {
        let list_navigation_props = this.props.list;  // list라는 props를 가져와서 저장
        // console.log(props_navigation_list);
        let list_navigation_tags = [];  // 태그를 담을 리스트 생성
        // list라는 props를 반복하며 태그 리스트에 새로운 태그 생성. 태그에 key라는 props은 각 태그의 식별자(id값)로써, 리액트 내부적으로 사용하기 위해 지정해줘야 하는 props임
        list_navigation_props.forEach((component, index) => {
            list_navigation_tags.push(
                <li key={component.id}>
                    <a
                        href={"/content/" + component.id}
                        onClick={function (e) {
                            e.preventDefault();
                            this.props.onClickNavList(index);  // props의 onClickNavList호출하면서 index를 함께 넘김
                        }.bind(this)}>{component.title}
                    </a>
                </li>);
        });
        // console.log(navigation_list);
        return (
            <nav>
                <ul>
                    {/* 태그들이 담긴 리스트를 넣어주기만 하면 리스트 안의 값들이 알아서 들어감 */}
                    {list_navigation_tags}
                </ul>
            </nav>
        );
    }
}

export default Navigation;