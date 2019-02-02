import * as React from "react";
import Button from 'muicss/lib/react/button';
import PropTypes from "prop-types";

export default class TodoItem extends React.Component {
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

    removeItem() {
        if (this.props.onRemove instanceof Function) {
            this.props.onRemove();
        }
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
                {this.props.item.name}{" " + this.props.item.count + "x"}
                <Button onClick={this.removeItem}>Remove Item</Button>
                <input
                    name="isFinished"
                    type="checkbox"
                    checked={this.state.isFinished}
                    onChange={this.checkItem} />
            </div>
        );
    }
}