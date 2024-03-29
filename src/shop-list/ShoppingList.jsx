import * as React from "react";
import Button from 'muicss/lib/react/button';
import PropTypes from "prop-types";
import List from "./List";
import ListItem from "./ListItem";

export default class ShoppingList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isFinished: false,
            list: PropTypes.object.isRequired,
            onRemove: PropTypes.func,
            expand: false

        };
        this.removeItem = this.removeItem.bind(this);
        this.expandList = this.expandList.bind(this);
    }

    removeItem() {
        if (this.props.onRemove instanceof Function) {
            this.props.onRemove();
        }
    }

    expandList() {
         this.setState({
             expand: true
         })


    }

    checkItem = (event) => {
        if(typeof this.props.onUpdate === "function" ) {
            let item = {...this.props.item};
            if(item.state === "FINISHED"){
                item.state = "NEW";
            }else {
                item.state = "FINISHED";
            }
            this.props.onUpdate(item);
        }

        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
    };

    render() {
        return (
            <div>
                <link href="//cdn.muicss.com/mui-0.9.41/css/mui.min.css" rel="stylesheet" type="text/css" media="screen" />
                <div className="mui--text-title" onClick={this.expandList}>{"Shopping list " + this.props.list.id}</div>
                {console.log("jsem tu")}
                <button class="mui-btn mui-btn--flat mui-btn--danger" onClick={this.removeItem}>Remove List</button>
                {(this.state.expand) ? <List list={this.props.list}/> : ""}
            </div>
        );
    }
}