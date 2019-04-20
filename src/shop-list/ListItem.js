import * as React from "react";
import Button from 'muicss/lib/react/button';
import PropTypes from "prop-types";
import Calls from "../calls";

export default class ListItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isFinished: false,
            item: PropTypes.object.isRequired,
            onRemove: PropTypes.func,
            onUpdate: PropTypes.func

        };
        this.removeItem = this.removeItem.bind(this);
    }

    async componentDidMount() {
        this.setState({ isFinished: this.props.item.state});
        console.log(this.state.isFinished)
    }

    removeItem() {
        if (this.props.onRemove instanceof Function) {
            this.props.onRemove();
        }
    }

    checkItem = (event) => {
        if(typeof this.props.onUpdate === "function" ) {
            let item = {...this.props.item};
            if(item.state === true){
                item.state = false;
            }else {
                item.state = true;
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
                {this.props.item.name}{" " + this.props.item.count + "x"}
                <button class="mui-btn mui-btn--flat mui-btn--danger" onClick={this.removeItem}>Remove Item</button>
                <input
                    name="isFinished"
                    type="checkbox"
                    checked={this.state.isFinished}
                    onChange={this.checkItem} />
            </div>
        );
    }
}