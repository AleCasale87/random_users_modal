import React from 'react';
import { StateContext, DispatchContext } from '../state/AppContext';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import ToggleBar from './ToggleBar.react';
import UserCard from './UserCard.react';
import $ from 'jquery';

function ToggleBarModal(props) {
    const [state, dispatch] = [React.useContext(StateContext), React.useContext(DispatchContext)];
    const { firstTime, isLoading, openModal, userNumber, errorMessage } = state;
    const dialogWidth = 535;
    const dialogHeight = 470; 
    const togglebarWidth = 470;
    const cardMinHeigth = 90;

    const handleClose = (event, reason) => {
        if (reason && reason === "backdropClick") 
            return;
            dispatch({type: 'setOpenModal', payload: {openModal: false}});
    }

    const getToBe = React.useCallback(() => {
        $.get("https://random-data-api.com/api/users/random_user?size="+userNumber,
            {}, 
            (res) => {
                let users = res.map(x => ({"uid": x.uid, 
                                            "first_name": x.first_name, "last_name": x.last_name, 
                                            "avatar": x.avatar, "email": x.email}))
                let payload = {userList: users}
                if(firstTime){
                    payload.firstTime = false
                }
                dispatch({type: 'setUsers', payload: payload});
            }
        );
    }, [dispatch, firstTime, userNumber])

    const handleNumberChanged = (event) => {
        dispatch({type: 'setUserNumber', payload: {userNumber: parseInt(event.target.value)}});
    }

    const handleReload = () => {
        if(userNumber>20){
            dispatch({type: 'setErrorMessage', payload: {errorMessage: "Sorry, but it is not possible to load more than 20 users"}});
        }
        else if(userNumber===0) {
            dispatch({type: 'setUsers', payload: {userList: []}});
        }
        else{
            onLoad()
        }
    }

    const onLoad = React.useCallback(() => {
        dispatch({type: 'setLoading', payload: {isLoading: true}});
        getToBe()
    }, [dispatch, getToBe])

    const onFirstTimeLoad = React.useCallback(() => {
        if(firstTime && openModal){
            onLoad()
        }
    }, [firstTime, openModal, onLoad])

    React.useEffect(() => {
        onFirstTimeLoad()
    }, [openModal, onFirstTimeLoad])

    return (
        <Dialog
                open={openModal}
                onClose={handleClose}
                PaperProps={{ style: { width: dialogWidth, height: dialogHeight } }}
            >
                <DialogTitle>
                    Random user profiles
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {isLoading && "Loading..."}
                        {(!isLoading && errorMessage.length>0) && errorMessage}
                    </DialogContentText>
                    {!isLoading && errorMessage.length===0 && <ToggleBar totWidth={togglebarWidth}/>}
                    {!isLoading && errorMessage.length===0 && <UserCard totWidth={togglebarWidth} minHeigth={cardMinHeigth}/>}
                </DialogContent>
                <DialogActions>
                    <Typography>Set the number of users:</Typography>
                    <TextField  type="number"
                                variant="standard"
                                size="small"
                                style={{width:'50px', marginLeft: '15px', marginRight: '15px'}}
                                value={userNumber}
                                InputProps={{inputProps:{min:0, step:1}}}
                                InputLabelProps={{shrink:true}}
                                onChange={handleNumberChanged}
                                />
                    <Button onClick={handleReload}>Reload</Button>
                    <Button onClick={handleClose}>Close</Button>
                </DialogActions>
            </Dialog>
    )
}
export default ToggleBarModal
