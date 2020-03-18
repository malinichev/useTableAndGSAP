
import React from 'react';
import EditPageWhithFormRedux from './edit-page';
import {Redirect} from 'react-router-dom';
import { connect } from 'react-redux';
import {sendUpdatePost} from '../../../redux/editpage-reduser';
import {updatePostData} from '../../../redux/homepage-reduser';



class EditPageContainerApi extends React.Component {
    componentWillUnmount(){
        if(this.props.isPostUpdate===true){
        this.props.sendUpdatePost()
        }
    }
    render(){
        // debugger
        
        if(this.props.isPostUpdate) {
            
            return <Redirect to={'/'} />
        }

        
        const idPost = this.props.postId
        // eslint-disable-next-line
        let PostToEdit = this.props.posts.find(el => el.id==idPost)
        const editPostOnSubmit = (e) =>{
                        
            this.props.updatePostData(e)
        }

        return(
            <EditPageWhithFormRedux PostToEdit={PostToEdit}  editPostOnSubmit={editPostOnSubmit}/>
            
        );
    }
}



const mapStateToProps = (state /*, ownProps*/) => {
    return {
      posts: state.homepage.posts,
      isPostUpdate: state.editPage.isPostUpdate,

    }
  }


let EditPageContainer = connect(mapStateToProps,{updatePostData,sendUpdatePost})(EditPageContainerApi)



export default EditPageContainer