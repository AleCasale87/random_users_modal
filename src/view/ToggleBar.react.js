import React from 'react';
import { StateContext, DispatchContext } from '../state/AppContext';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

function ToggleBar(props) {
    const [state, dispatch] = [React.useContext(StateContext), React.useContext(DispatchContext)];
    const { userList, selectedUser, toolbarCols } = state;
    const { totWidth } = props;

    const handleChange = (event, newValue) => {
        dispatch({type: 'setSelectedUser', payload: {selectedUser: newValue}});
    };

    const getColumns = React.useCallback(() => {
        let N = userList.length;
        let maxCol = 5;
        let minCol = Math.round(maxCol/2)
        let array = []
        let exception = false
        let i;
        let cols;
        for (i = maxCol ; i>=minCol; i--){
            let quotient = N/i
            let remainder = N%i
            if(remainder===0 && i >= Math.floor(N/i)){
                exception = true
                break;
            }
            array.push(remainder/quotient)
        }
        if (exception){
            cols = i
        }
        else{
            let max = Math.max(...array)
            cols = maxCol - array.indexOf(max)
        }
        // let rows = Math.floor(N/cols)
        // let rem = N%cols
        // console.log(cols+" x "+rows+" + "+rem)
        dispatch({type: 'setToolbarCols', payload: {toolbarCols: cols}});
    }, [userList, dispatch])

    React.useEffect(() => {
        if(userList.length>0){
            getColumns()
        }
    }, [userList, getColumns])

    return (
        <div style={{width: totWidth}}>
            <ToggleButtonGroup
            color="primary"
            value={selectedUser}
            exclusive
            onChange={handleChange}
            style={{flexWrap: "wrap"}}
            >
                {userList.map((x, index) => (
                    <ToggleButton   key={x.uid} 
                                    value={x.uid} 
                                    style={{    // the calculation of the width includes an offset to compensate ToggleButton margins  
                                                width: (userList.length === 0 || toolbarCols === 0) ? 0 : (userList.length === 1 || userList.length === 2 ) ? (totWidth+userList.length-2)/userList.length : (totWidth+toolbarCols-2)/toolbarCols, 
                                                borderRadius: (userList.length === 1) ? "10px 10px 10px 10px" : (index === 0 || ((index)%toolbarCols === 0)) ? "10px 0px 0px 10px" : (index === userList.length -1 || ((index+1)%toolbarCols === 0)) ? "0px 10px 10px 0px" : "",
                                                borderLeft: (((index)%toolbarCols === 0)) ? "1px solid rgba(0, 0, 0, 0.12)" : "",
                                                marginLeft: (((index)%toolbarCols === 0)) ? "0.5px" : ""
                                    }}
                    >
                        {x.first_name}
                    </ToggleButton>
                ))}
            </ToggleButtonGroup>
        </div>
    );
}
export default ToggleBar