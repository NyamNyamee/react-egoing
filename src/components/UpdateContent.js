import React, { Component } from 'react';

class UpdateContent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.data.id,
            title: this.props.data.title,
            description: this.props.data.description
        }

        this.onChangeInputHanlder = this.onChangeInputHanlder.bind(this);
    }

    onChangeInputHanlder(e) {
        this.setState({ [e.target.name]: e.target.value })
    }

    render() {
        return (
            <article>
                <h2>Update</h2>
                <form action="/update_process" method="post" onSubmit={
                    function (e) {
                        e.preventDefault();  // form의 기본 이벤트인 액션속성을 막아 페이지 이동을 방지함
                        const id = this.state.id;  // id value 저장
                        const title = this.state.title;  // title value 저장
                        const description = this.state.description;  // description value 저장

                        this.props.onSubmit(id, title, description);  // props의 onSubmit함수호출
                    }.bind(this)
                }>
                    <input type="hidden" name="id" value={this.state.id}></input>
                    <p>
                        <input type="text" name="title" placeholder="title" value={this.state.title} onChange={this.onChangeInputHanlder}></input>
                    </p>
                    <p>
                        <textarea name="description" placeholder="description" value={this.state.description} onChange={this.onChangeInputHanlder}></textarea>
                    </p>
                    <p>
                        <input type="submit" value="submit"></input>
                    </p>
                </form>
            </article>
        );
    }
}

export default UpdateContent;