import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Mutation } from 'react-apollo';
import INTERACT_WITH_NODE from './interactWithNode';

class InteractWhenLoaded extends PureComponent {
  componentDidMount() {
    if (!this.props.isLoading) {
      this.interact();
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.isLoading && !this.props.isLoading) {
      this.interact();
    }
  }

  //disable tracking for beta
  interact() {
    return null;
  }

  render() {
    return null;
  }
}

InteractWhenLoaded.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  // properties: PropTypes.any,
  mutate: PropTypes.func.isRequired,
};

const InteractWhenLoadedConnected = (props) => {
  // ---- NOTE ----
  // In order to track more accurate interactions,
  // we want to disable tracking for our beta site
  return null;
};

InteractWhenLoadedConnected.propTypes = {
  nodeId: PropTypes.string,
  action: PropTypes.string.isRequired,
};

export default InteractWhenLoadedConnected;
