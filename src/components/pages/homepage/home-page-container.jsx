

import React from 'react';
import HomePage from './home-page';
import UserInfo from '../../user-info';
import { connect } from 'react-redux';
import {getPost, getUser, setSelectedUserinState, delOnePost} from '../../../redux/homepage-reduser';
import {sendUpdatePost} from '../../../redux/editpage-reduser';
import preloader from './Ellipsis200.svg'

class HomePageContainerApi extends React.Component {
    componentDidMount(){
      this.props.sendUpdatePost()
    }

    render(){
      const selectedUser = (name,id) =>{
        this.props.setSelectedUserinState(name,id);
      }
      const delPost = (id) =>{
        this.props.delOnePost(id);
      }
      
      if(!!this.props.posts.length && this.props.posts.length > 1 ){
        return(
          <>
            <UserInfo users={this.props.users} 
                      selectUserName={this.props.selectedUsers} 
                      selectedUser={selectedUser}
                      />
            <HomePage posts={this.props.posts.filter( el => 
                              this.props.selectedUsers.userId ? 
                              el.userId === this.props.selectedUsers.userId 
                              : el.userId
                            )}
                            delPost={delPost} 
                      />
          </>
            
        );
      }else{
       return( 
        <>
          <div style={
              {display: 'flex',
              justifyContent: 'center',
              alignContent: 'center',
              height: '100vh'}
                      }>
                        <img src={preloader} alt='preloader' />
          </div>
        </>
        );
      } 
    }
}

const mapStateToProps = (state /*, ownProps*/) => {
    return {
      posts: state.homepage.posts,
      users: state.homepage.users,
      selectedUsers: state.homepage.selectedUser,
      isDataLoad: state.homepage.isLoad,
      isPostUpdate: state.editPage.isPostUpdate
    }
  }


const HomePageContainer = connect(mapStateToProps,{sendUpdatePost,delOnePost, getPost, getUser, setSelectedUserinState})(HomePageContainerApi)



export default HomePageContainer