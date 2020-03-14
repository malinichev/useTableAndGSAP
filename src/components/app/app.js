import React, {useEffect} from 'react';
import { connect } from 'react-redux';
import {getPost, getUser} from '../../redux/homepage-reduser';



import { BrowserRouter, Route, Switch } from 'react-router-dom';
import EditPageContainer from '../pages/editpage';
import HomePageContainer from '../pages/homepage';
import NavBar from '../navbar';
import Warning from '../warning';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';








const App =  (props) => {
  
  useEffect(() => {
    props.getUser()
    props.getPost()
    // eslint-disable-next-line
  }, []);
  
  
        
  return (
    <BrowserRouter>
      <NavBar isDataLoad={props.isDataLoad}/>
          <Warning isError={props.isError}/>
      <Switch>
        <Route
          path="/"
          exact
          render={() => {
            return (            
              <HomePageContainer/>
              );
          }}
           />
        
        <Route
          path="/edit/:postId"
          
          render={({match}) => {
            const {postId} = match.params;
            
            return <EditPageContainer postId={postId}/>
          }}
          />
      </Switch>
    
    </BrowserRouter>
  );
};

const mapStateToProps = (state /*, ownProps*/) => {
  return {
    isDataLoad: state.homepage.isLoad,
    isPostUpdate: state.editPage.isPostUpdate,
    isError: state.homepage.isError
  }
}


export default connect(mapStateToProps,{getPost, getUser})(App)