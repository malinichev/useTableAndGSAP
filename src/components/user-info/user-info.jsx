import React from 'react';
import { Dropdown,DropdownButton } from 'react-bootstrap';

const UserInfo = ({users, selectedUser, selectUserName}) => {
    return (
        <>
            <DropdownButton style={{padding: '1rem' }} id="dropdown-basic-button" title={selectUserName.userName} variant='secondary'>
                {
                    users.map(el=> <Dropdown.Item 
                        key={el.id+el.phone}
                        onClick={()=>selectedUser(el.name, el.id)}
                        >
                            {el.name}</Dropdown.Item>)
                }
            </DropdownButton>
        </>
    );
}
export default UserInfo

