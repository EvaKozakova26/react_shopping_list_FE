import * as React from "react";
import TodoItem from "./TodoItem";
import Form from 'muicss/lib/react/form';
import Input from 'muicss/lib/react/input';
import Button from 'muicss/lib/react/button';
import Divider from 'muicss/lib/react/divider';
import Container from 'muicss/lib/react/container';
import Calls from '../calls';

export default class NewItemList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            value: '',
            count: 1,
            loadingState: "INIT",
        };

        this.addItem = this.addItem.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onCountChange = this.onCountChange.bind(this);
        this.onListSaveClick = this.onListSaveClick.bind(this);
    }

    async componentDidMount() {
      /*  this.setState({ loadingState: "LOADING" });
        try {
            let result = await Calls.getShoppingList();
            console.log("co je v result " + result )
            this.setState({ items: result, loadingState: "DONE" });
        } catch (error) {
            this.setState({ error:error, loadingState: "ERROR" });
        }*/
    }

    async removeItem(item, index) {
        let reducedItems = this.state.items;
        await Calls.deleteShoppingItem({ id: item.id });
        reducedItems.splice(index, 1);
        this.setState({ items: reducedItems });
    }

    async addItem(event) {
        event.preventDefault();
        let items = [...this.state.items];

        let serverItem = await Calls.createShoppingItem({
            name: this.state.value,
            state: false,
            count: this.state.count,
        });
        items.push(serverItem);
        this.setState({ items: items });
        console.log(items);

        this.setState({
            value: ''
        });
    }

    async onListSaveClick() {
        let lisst = await Calls.saveShoppingList(this.state.items);
        console.log("returned list " + lisst)
    }

    async updateItem(item, index, newItem) {
        let items = [...this.state.items];
        let updatedItem = await Calls.updateShoppingItem(newItem);
        items[index] = updatedItem;
        this.setState({ items: items });
    }

    onChange(event) {
        this.setState({value: event.target.value});
    }

    onCountChange(event) {
        this.setState({count: event.target.value});
    }

    render() {
        let items = this.state.items.map((item, index) => (
            <div>
                <Container fluid={true}>
                    <TodoItem
                        key={item.id}
                        item={item}
                        onRemove={() => {this.removeItem(item, index)}}
                        onUpdate={newItem => {this.updateItem(item, index, newItem);}}>
                    </TodoItem>
                    <Divider/>
                </Container>
            </div>

        ));
        return (
            <div >
                <link href="//cdn.muicss.com/mui-0.9.41/css/mui.min.css" rel="stylesheet" type="text/css" media="screen" />

                <Form inline={true} onSubmit={this.addItem}>
                    <Input required={true} placeholder="new item" value={this.state.value} onChange={this.onChange} />
                    <Input required={true} type="number" placeholder="count" value={this.state.count} onChange={this.onCountChange} />
                    <Button className="style" variant="fab" type="submit">Add</Button>
                </Form>
                <div ></div>
                {items}
                <div ><button class="mui-btn mui-btn--primary" onClick={this.onListSaveClick}>save shopping list</button></div>

            </div>
        );
    }
}