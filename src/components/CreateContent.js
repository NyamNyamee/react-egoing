import React, { Component } from 'react';

class CreateContent extends Component {
    render() {
        return (
            <article>
                <h2>Create</h2>
                <form action="/create_process" method="post" onSubmit={
                    function (e) {
                        e.preventDefault();  // form의 기본 이벤트인 액션속성을 막아 페이지 이동을 방지함
                        const title = e.target.title.value;  // title value 저장
                        const description = e.target.description.value;  // description value 저장
                        this.props.onSubmit(title, description);  // props의 onSubmit함수호출
                    }.bind(this)
                }>
                    <p>
                        <input type="text" name="title" placeholder="title"></input>
                    </p>
                    <p>
                        <textarea name="description" placeholder="description"></textarea>
                    </p>
                    <p>
                        <input type="submit" value="submit"></input>
                    </p>
                </form>
            </article>
        );
    }
}

export default CreateContent;