



const SEND_UPDATE_POST = 'SEND_UPDATE_POST';
const POST_IS_SEND = 'POST_IS_SEND';


const initState = {
    
        isPostUpdate:false,
        isErr: false,
        
    
};

const editpageReduser = (state = initState, action) => {
    
    switch (action.type) {
        case SEND_UPDATE_POST:
            return {
                ...state,
                isPostUpdate: false
            };
        case POST_IS_SEND:
            return {
                ...state,
                isPostUpdate: true
            };
        
        
        default:
            return state;
    }



};


export const sendUpdatePostAC = () => ({
    type: SEND_UPDATE_POST
})
export const postIsSend = () => ({
    type: POST_IS_SEND
})

export const sendUpdatePost = () => {
    return (dispatch) => {
        dispatch(sendUpdatePostAC());
    }
}


export default editpageReduser