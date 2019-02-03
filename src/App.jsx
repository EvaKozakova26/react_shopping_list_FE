import React, { Component } from 'react';
import './App.css';
import './style.css';
import TodoList from "./todo-list/TodoList";
import Panel from 'muicss/lib/react/panel';
import Button from 'muicss/lib/react/button';
import Login from "./auth/Login";


class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            viewLoginForm: false,
            loginForm: null,
        };

        this.onLoginClicked = this.onLoginClicked.bind(this);

    }

    onLoginClicked() {
        console.log("click");
        this.setState({
            viewLoginForm: true,
        });
        this.loginForm = <Login show = {this.viewLoginForm}/>;
    }

    render() {
    return (
        <div className="App">
            <link href="//cdn.muicss.com/mui-0.9.41/css/mui.min.css" rel="stylesheet" type="text/css" media="screen" />

          <Panel>
              <div className="mui--text-display3">Shopping List</div>

              <Button onClick={this.onLoginClicked}>Login</Button>

              <div className={"wrapperLoginForm"}>
                  {(this.state.viewLoginForm) ? this.loginForm : ''}
              </div>

          </Panel>
            <calls/>

          <TodoList />
      </div>
    );
  }
}

export default App;
