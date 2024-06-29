import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import {
  Route, Switch, withRouter, Redirect,
} from 'react-router-dom';
import { fetchWorkspace, clearWorkspace } from '../actions/index';
import Workspace from '../pages/workspaces/Workspace';
import WorkspaceFeed from '../pages/workspaces/Feed';
import WorkspaceBoards from '../pages/workspaces/Boards';
import WorkspaceSettings from '../pages/workspaces/Settings';
import WorkspaceAcceptInvite from '../pages/workspaces/Accept';


class WorkspaceFetcher extends React.Component {
  componentDidMount() {
    const {
      isWorkspaceFetched,
      onFetchWorkspace,
      match: { params: { id } },
    } = this.props;


    if (!isWorkspaceFetched) onFetchWorkspace(id);
  }

  componentWillReceiveProps(nextProps) {
    const { onFetchWorkspace, onClearWorkspace } = this.props;
    if (nextProps.match.params.id !== this.props.match.params.id) {
      onClearWorkspace();
      onFetchWorkspace(nextProps.match.params.id);
    }
  }

  componentWillUnmount() {
    const { onClearWorkspace } = this.props;
    onClearWorkspace();
  }

  render() {
    const { isWorkspaceFetched } = this.props;
    if (!isWorkspaceFetched) {
      return <div>Loading...</div>;
    }
    return (
      <div>
        <Switch>
          {/*<Redirect exact from="/dashboard/workspace/:id" to="/dashboard/workspace/:id/feed" />*/}
          <Route exact path="/dashboard/workspace/:id" component={Workspace} />
          <Route path="/dashboard/workspace/:id/accept/:code" component={WorkspaceAcceptInvite} />
          <Route path="/dashboard/workspace/:id/feed" component={WorkspaceFeed} />
          <Route path="/dashboard/workspace/:id/boards" component={WorkspaceBoards} />
          <Route path="/dashboard/workspace/:id/settings" component={WorkspaceSettings} />
        </Switch>
      </div>
    );
  }
}

WorkspaceFetcher.propTypes = {
  workspace: PropTypes.object.isRequired,
  isWorkspaceFetched: PropTypes.bool.isRequired,
  onFetchWorkspace: PropTypes.func.isRequired,
  onClearWorkspace: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  workspace: state.workspace.current,
  isWorkspaceFetched: state.workspace.isFetched,
});

const mapDispatchToProps = dispatch => ({
  onFetchWorkspace: id => dispatch(fetchWorkspace(id)),
  onClearWorkspace: () => dispatch(clearWorkspace()),
});

const composedWorkspaceFetcher = compose(
  connect(mapStateToProps, mapDispatchToProps),
  withRouter,
)(WorkspaceFetcher);

export default composedWorkspaceFetcher;
