import {delPost, addPost} from './homepage-reduser';
import homepageReducer from './homepage-reduser';

let state = {    
    posts:[
        { "userId": 1, "id": 1, "title": "Post 1 title", "body": "Post 1 body" },
        { "userId": 2, "id": 2, "title": "Post 2 title", "body": "Post 2 body" },
        { "userId": 1, "id": 3, "title": "Post 3 title", "body": "Post 3 body" },
        { "userId": 2, "id": 4, "title": "Post 4 title", "body": "Post 4 body" }
    ]
};

it('should posts decrement', () => {
        // 1.test Data
        
        let action = delPost(2);

        //2. action
        let newstate = homepageReducer(state, action);

        //3. expect

        expect(newstate.posts.length).toBe(3)

});
it('should posts increment', () => {
        // 1.test Data
        let newPost = { "userId": 1, "id": 5, "title": "Post 5 title", "body": "Post 5 body" }
        let action = addPost(newPost);

        //2. action
        let newstate = homepageReducer(state, action);

        //3. expect
        console.log(newstate.posts);
        expect(newstate.posts.length).toBe(5)

});
