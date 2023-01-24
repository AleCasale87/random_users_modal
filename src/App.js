import React from 'react';
import './App.css';
import { useImmerReducer } from 'use-immer';
import { StateContext, DispatchContext } from './state/AppContext';
import { AppInitialState, AppReducer } from './state/AppState';
import Button from '@mui/material/Button';
import ToggleBarModal from './view/ToggleBarModal.react';

function App() {
    const [state, dispatch] = useImmerReducer(AppReducer, AppInitialState)

    const handleClickOpen = () => {
        dispatch({type: 'setOpenModal', payload: {openModal: true}});
    };

    return (
        <DispatchContext.Provider value={dispatch}>
            <StateContext.Provider value={state}>
                <div className="App">
                    <Button variant="outlined" onClick={handleClickOpen}>
                        Open
                    </Button>
                    <ToggleBarModal/>
                </div>
            </StateContext.Provider>
        </DispatchContext.Provider>
    );
}

export default App;
