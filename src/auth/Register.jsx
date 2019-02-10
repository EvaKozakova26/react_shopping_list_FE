import Form from 'muicss/lib/react/form';
import Input from 'muicss/lib/react/input';
import React from "react";
import Button from 'muicss/lib/react/button';
import PropTypes from "prop-types";
import Calls from "../calls";


export default class Login extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name: "",
            password: "",
            show: PropTypes.object.viewLoginForm,
            currentUser: null
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

    async handleSubmit(event) {
        event.preventDefault();

        let user = await Calls.registerUser({
            name: this.state.name,
            password: this.state.password
        });

        this.setState({
            name: "",
            password: "",
            currentUser: user
        });
        window.location.reload();
        console.log(this.state.currentUser);
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
