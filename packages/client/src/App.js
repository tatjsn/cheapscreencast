import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      popup: null,
      shots: null,
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleLeavePopup = this.handleLeavePopup.bind(this);
  }

  componentDidMount() {
    const ref = this.props.db
      .collection('screenshots')
      .orderBy('ts', 'desc')
      .limit(40);
    this.unsubsribe = ref.onSnapshot((coll) => {
      this.setState({
        shots: coll.docs,
      });
    });
  }

  componentWillUnmount() {
    this.unsubsribe();
  }

  handleClick(id) {
    const itemToShow = this.state.shots.find(s => s.id === id);
    this.setState({
      popup: itemToShow,
    });
  }

  handleLeavePopup() {
    this.setState({
      popup: null,
    });
  }

  render() {
    if (this.state.popup) {
      const s = this.state.popup;
      return (
        <img
          alt={s.id}
          src={s.data().path}
          onClick={() => this.handleLeavePopup()}
        />
      );
    }
    return (
      this.state.shots ? (
        <ul>
          {
            this.state.shots.map(s => (
              <li key={s.id}>
                <img
                  alt={s.id}
                  src={s.data().path}
                  width="100"
                  onClick={() => this.handleClick(s.id)}
                />
                {s.data().ts.toDate().toLocaleString()}
              </li>
            ))
          }
        </ul>
      ) : (
        <p>Now loading...</p>
      )
    );
  }
}

export default App;
