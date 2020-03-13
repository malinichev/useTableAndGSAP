import React, {useEffect} from 'react';
import { Form } from 'react-bootstrap';
import { Field, reduxForm } from 'redux-form'

const EditPage = (props) =>{
    
    const{PostToEdit} = props
    
    useEffect(() => {
        
        const setItitData = () => {
            if(PostToEdit!==undefined){
                props.initialize({title: PostToEdit.title,  body: PostToEdit.body, id: PostToEdit.id, userId: PostToEdit.userId})
            }   
        };
        setItitData();
        // eslint-disable-next-line
    }, [PostToEdit]);
    
    if(PostToEdit!==undefined){
        return (
            <>
                <Form style={{width:'50%', margin:'20px auto'}} onSubmit={props.handleSubmit(props.editPostOnSubmit)}>
                    <Form.Group controlId="formGroupTitle">
                        <Form.Label>Title</Form.Label>
                        <Field name={'title'}  className='form-control' component={'input'}/>
                        
                    </Form.Group>
                    <Form.Group controlId="formGroupBody">
                        <Form.Label>Body</Form.Label>
                        <Field name={'body'} className='form-control' component={'input'}/>
                    </Form.Group>
                    
                        
                        <Field type="hidden" name={'id'} component={'input'}/>
                        <Field type="hidden" name={'userId'} component={'input'}/>
                    
                    <button className='btn btn-primary'>Submit</button>
                </Form>
            </>
        );
    }
    return <span>Is LOADDING...</span>
    
}


const EditPageWhithFormRedux = reduxForm({
    form: 'editPostForm'
  })(EditPage)



export default EditPageWhithFormRedux