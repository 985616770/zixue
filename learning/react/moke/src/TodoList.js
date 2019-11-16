import React, { Component, Fragment } from 'react';
import TodoItem from './TodoItem';

export default class TodoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: 'hello',
      list: ['learn React', 'learn Vue', 'learn NodeJS'],
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
    this.handleItemClick = this.handleItemClick.bind(this);
  }
  handleInputChange(e) {
    this.setState({
      inputValue: e.target.value,
    });
  }
  handleKeyUp(e) {
    if (e.keyCode === 13) {
      if (!this.state.inputValue) {
        return;
      }
      const list = [...this.state.list, this.state.inputValue];
      this.setState({
        list,
        inputValue: '',
      });
    }
  }
  handleItemClick(index) {
    const list = [...this.state.list];
    list.splice(index, 1);
    this.setState({
      list,
    });
  }
  getListItem() {
    return this.state.list.map((value, index) => {
      return (
        // <li
        //   key={index}
        //   onClick={this.handleItemClick.bind(this, index)}
        //   dangerouslySetInnerHTML={{ __html: value }}
        // ></li>
        <TodoItem
          content={value}
          key={index}
          deleteFun={this.handleItemClick}
          index={index}
        />
      );
    });
  }
  render() {
    return (
      // dsf
      <Fragment>
        <input
          value={this.state.inputValue}
          onChange={this.handleInputChange}
          onKeyUp={this.handleKeyUp}
        />
        <ul>{this.getListItem()}</ul>
      </Fragment>
    );
  }
}
