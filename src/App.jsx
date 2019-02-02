import React, { Component } from 'react';
import './App.css';
import TodoList from "./todo-list/TodoList";
import Panel from 'muicss/lib/react/panel';


class App extends Component {
  render() {
    return (

        <div className="App">
            <link href="//cdn.muicss.com/mui-0.9.41/css/mui.min.css" rel="stylesheet" type="text/css" media="screen" />

          <Panel>
              <div className="mui--text-display3">Shopping List</div>

          </Panel>
            <calls/>

          <TodoList />
      </div>
    );
  }
}

export default App;
