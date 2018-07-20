import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import App from './App.component';

export default withRouter(connect()(App));
