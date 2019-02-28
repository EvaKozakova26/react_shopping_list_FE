import React, { Component } from 'react';
import './App.css';
import './style.css';
import Panel from 'muicss/lib/react/panel';
import Button from 'muicss/lib/react/button';
import Login from "./auth/Login";
import Register from "./auth/Register";
import Calls from "./calls";
import ShoppingList from "./todo-list/ShoppingList";
import Container from "muicss/lib/react/container";
import NewItemList from "./todo-list/NewItemList";
import Divider from "muicss/lib/react/divider";


class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            viewLoginForm: false,
            loginForm: null,
            lists: [],
            expand: false
        };

        this.onLoginClicked = this.onLoginClicked.bind(this);
        this.onRegisterClicked = this.onRegisterClicked.bind(this);
        this.onLogoutClicked = this.onLogoutClicked.bind(this);

    }

    async componentDidMount() {
        let result = await Calls.getAllLsits();
        this.setState({ lists: result, loadingState: "DONE" });

    }

    onLoginClicked() {
        console.log("click");
        this.setState({
            viewLoginForm: true,
        });
        this.loginForm = <Login show = {this.viewLoginForm}/>;
    }

    onRegisterClicked() {
        console.log("clickReg");
        this.setState({
            viewLoginForm: true,
        });
        this.loginForm = <Register show = {this.viewLoginForm}/>;
    }

    async onLogoutClicked(event) {
       await Calls.logoutUser();
       window.location.reload();
    }

    async removeShopList(item, index) {
        let reducedLists = this.state.lists;
        await Calls.deleteShoppingList({ id: item.id });
        reducedLists.splice(index, 1);
        this.setState({ lists: reducedLists });
        window.location.reload()
    }

    render() {
        let results = this.state.lists.map((result, index) => (
            <div>
                <Container fluid={true}>
                    {(result.id === 0) ? '' :
                        <ShoppingList
                            key={result.id}
                            list={result}
                            onRemove={() => {this.removeShopList(result, index)}}>
                        </ShoppingList>
                    }

                </Container>
            </div>

        ));
    return (

        <div className="App">
            <link href="//cdn.muicss.com/mui-0.9.41/css/mui.min.css" rel="stylesheet" type="text/css" media="screen" />

          <Panel>
              <div className="mui--text-display3">Shopping List</div>

              <Button onClick={this.onLoginClicked}>Login</Button>
              <Button onClick={this.onRegisterClicked}>Register</Button>
              <Button onClick={this.onLogoutClicked}>Logout</Button>

              <div className={"wrapperLoginForm"}>
                  {(this.state.viewLoginForm) ? this.loginForm : ''}
              </div>
          </Panel>
            <calls/>
            <NewItemList/>
            <Divider/>
            {results}
      </div>
    );
  }
}

export default App;
