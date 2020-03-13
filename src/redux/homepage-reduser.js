import {getPostApi, getUsersApi,delPostApi, updatePostApi} from '../api';
import {postIsSend} from './editpage-reduser';



const IS_DATA_LOAD = 'IS_DATA_LOAD';
const SET_POST = 'SET_POST';
const SET_USER = 'SET_USER';
const SELECT_USER = 'SELECT_USER';
const UPDATE_POST = 'UPDATE_POST';
const DEL_POST = 'DEL_POST';


const initState = {
    
        
        posts:[],
        users:[],
        isLoad:false,
        selectedUser:{
            userName: 'Select User',
            userId: null
        }
        
    
};

const homepageReduser = (state = initState, action) => {
    switch (action.type) {
       
        case IS_DATA_LOAD:
            return {
                ...state,
                isLoad: action.isDataLoad  
            };
        case SET_POST:
            return {
                ...state,
                ...state.posts,
                posts: [...action.posts]
            };
        case UPDATE_POST:{
            let idX = state.posts.findIndex(el=>el.id===action.post.id)
            
            return {
                ...state,
                ...state.posts,
                posts: [...state.posts.slice(0, idX), action.post, ...state.posts.slice(idX + 1)]
            }
        }
        case DEL_POST:{
            
            let idXDel = state.posts.findIndex(el=>el.id===action.postId)
            return {
                ...state,
                ...state.posts,
                posts: [...state.posts.slice(0, idXDel), ...state.posts.slice(idXDel + 1)]
            }
        }
        case SET_USER:
            return {
                ...state,
                ...state.users,
                users: [...action.users]
            };
        case SELECT_USER:
            return {
                ...state,
                ...state.selectedUser,
                selectedUser: action.selectedUser
            };
        default:
            return state;
    }
};



export const isDataLoad = (isDataLoad) => ({
    type: IS_DATA_LOAD,
    isDataLoad
})
export const setPost = (posts) => ({
    type: SET_POST,
    posts
})
export const updatePost = (post) => ({
    type: UPDATE_POST,
    post
})
export const delPost = (postId) => ({
    type: DEL_POST,
    postId
})
export const setUser = (users) => ({
    type: SET_USER,
    users
})
export const setSelectUser = (selectedUser) => ({
    type: SELECT_USER,
    selectedUser
})

export const getPost = () => {
    return (dispatch) => {
        dispatch(isDataLoad(false));
        getPostApi()
            .then(res => {
                dispatch(setPost(res))
                dispatch(isDataLoad(true)) 
            })
            .catch(err=>console.log('errrr'));
            
    }
}
export const updatePostData = (postData) => {
    return (dispatch) => {
        dispatch(isDataLoad(false));
        updatePostApi(postData)
            .then(res => {
                dispatch(updatePost(res));
                dispatch(postIsSend());
                dispatch(isDataLoad(true));
            })
            .catch(err=>console.log('errrr'));
    }
}  
export const getUser = () => {
    return (dispatch) => {
        dispatch(isDataLoad(false));
        getUsersApi()
            .then(res => {
                // console.log(res)
                const Alluser = 
                    {
                        id: null,
                        name: "Select All",
                    }
                res.push(Alluser)
                dispatch(setUser(res))
                dispatch(isDataLoad(true)) 
            })
            .catch(err=>console.log('errrr'));
            
    }
} 
export const setSelectedUserinState = (selectedUserName,selectedUserId) => {
    return (dispatch) => {
        dispatch(setSelectUser({
            userName: selectedUserName,
            userId: selectedUserId
        }));
        
    }
}

export const delOnePost = (postId) => {
    return (dispatch) => {
        dispatch(isDataLoad(false));
        delPostApi(postId)
        .then(res => {
            dispatch(delPost(postId))
            dispatch(isDataLoad(true))
        })
        .catch(err=>console.log('errrr'));            
    }
} 



export default homepageReduser