import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { List } from 'antd';

class PageList extends Component {
  componentWillReceiveProps(nextProps) {
    const id = nextProps.match.params.id;
    axios
      .get('http://www.dell-lee.com/react/api/list.json?id=' + id)
      .then(res => {
        this.setState({
          data: res.data.data,
        });
      });
  }

  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }

  render() {
    return (
      <List
        style={{ background: '#fff' }}
        bordered
        dataSource={this.state.data}
        renderItem={item => (
          <List.Item>
            <Link to={`/detail/${item.id}`}>{item.title}</Link>
          </List.Item>
        )}
      />
    );
  }

  componentDidMount() {
    let url = 'http://www.dell-lee.com/react/api/list.json';
    const id = this.props.match.params.id;
    if (id) {
      url = url + '?id=' + id;
    }
    axios.get(url).then(res => {
      this.setState({
        data: res.data.data,
      });
    });
  }
}

export default PageList;
