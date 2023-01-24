import React from 'react';
import { StateContext, DispatchContext } from '../state/AppContext';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import $ from 'jquery';


function UserCard(props) {
    const [state, dispatch] = [React.useContext(StateContext), React.useContext(DispatchContext)];
    const { isLoading, userList, selectedUser, selectedAvatar, loadedAvatarList } = state;
    const { totWidth, minHeigth } = props;
    const selectedUserContent = userList.filter(obj => {return obj.uid === selectedUser;})[0];
    

    const getAvatarToBe = React.useCallback(() => {
        $.get(selectedUserContent.avatar,
            {}, 
            (res) => {
                dispatch({type: 'setSelectedAvatar', payload: {selectedAvatar: res, loadedAvatar: selectedUser}});
            }
        );
    }, [dispatch, selectedUserContent, selectedUser])

    const onAvatarLoad = React.useCallback(() => {
        if(selectedUser && !isLoading && !loadedAvatarList.includes(selectedUser)){
            dispatch({type: 'setSelectedAvatar', payload: {selectedAvatar: null}});
            getAvatarToBe()
        }
    }, [selectedUser, isLoading, loadedAvatarList, dispatch, getAvatarToBe])

    React.useEffect(() => {
        onAvatarLoad()
    }, [selectedUser, onAvatarLoad])

    return (
        <Card style={{ width: totWidth }}>
        {selectedUserContent ?
            <CardContent style={{ minHeight: minHeigth }}>
                {selectedAvatar ? 
                    <Avatar alt={selectedUser} src={selectedUserContent.avatar}
                    >
                        {selectedUserContent.first_name[0]}
                    </Avatar>
                :
                    <Avatar alt={selectedUser}>
                        {selectedUserContent.first_name[0]}
                    </Avatar>
                }
                <Typography variant="body2" style={{marginTop:"5px"}}>
                    {selectedUserContent.first_name + " " + selectedUserContent.last_name}
                </Typography>
                <Typography variant="body2" style={{marginTop:"5px"}}>
                    {selectedUserContent.email}
                </Typography>
            </CardContent>
        :
            userList.length>0 && <CardContent style={{ minHeight: minHeigth }}></CardContent>
        }
    </Card>
    );
}
export default UserCard