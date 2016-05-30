import React from 'react'
import CircularProgress from 'material-ui/lib/circular-progress'
import store from '../store/configureStore'
import { syncHistory, routeReducer, routeActions } from 'react-router-redux'

export default class EnvoiProgress extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      completed: 0,
    };
  }

  componentDidMount() {
    this.timer = setTimeout(() => this.progress(5), 1000);
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  progress(completed) {
    if (completed > 100) {
      this.setState({completed: 100});

      // redirection vers mes constats
      store.dispatch(routeActions.push('/mes_constats'));
    } else {
      this.setState({completed});
      const diff = Math.random() * 30;
      this.timer = setTimeout(() => this.progress(completed + diff), 1000);
    }
  }

  render() {
    return (
      <div>
        <CircularProgress mode="determinate" value={this.state.completed} size={2}/>
      </div>
    );
  }
}
