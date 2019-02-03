import Form from 'muicss/lib/react/form';
import Input from 'muicss/lib/react/input';
import React from "react";
import Button from 'muicss/lib/react/button';
import PropTypes from "prop-types";


export default class Login extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name: "",
            password: "",
            show: PropTypes.object.viewLoginForm
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onNameChange = this.onNameChange.bind(this);
        this.onPasswordChange = this.onPasswordChange.bind(this);

    }

    onNameChange(event) {
        this.setState({name: event.target.value});
    }

    onPasswordChange(event) {
        this.setState({password: event.target.value});
    }

    handleSubmit = event => {
        console.log(this.state.name);
        console.log(this.state.password);
        window.location.reload();
        event.preventDefault();
    }

    render() {
        return (
            <Form onSubmit={this.handleSubmit}>
                    <Input placeholder = "login"  type="text" onChange = {this.onNameChange}/>
                    <Input placeholder = "password" type="password" onChange = {this.onPasswordChange}/>
                <Button type="submit">Submit</Button>
            </Form>
        );
    }
}
