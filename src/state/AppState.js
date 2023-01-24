const AppAction = {
    setOpenModal: (draft, payload) => {
        draft.openModal = payload.openModal
    },
    setLoading: (draft, payload) => {
        draft.isLoading = payload.isLoading
    },
    setUsers: (draft, payload) => {
        draft.userList = payload.userList
        draft.isLoading = false
        draft.errorMessage = ""
        draft.selectedUser = null
        draft.selectedAvatar = null
        draft.loadedAvatarList = []
        if(payload.hasOwnProperty('firstTime')){
            // used only for the first time, not for reload
            draft.firstTime = payload.firstTime 
        }
    },
    setUserNumber: (draft, payload) => {
        draft.userNumber = payload.userNumber
    },
    setErrorMessage: (draft, payload) => {
        draft.errorMessage = payload.errorMessage
        draft.userList = []
        draft.selectedUser = null
        draft.selectedAvatar = null
        draft.loadedAvatarList = []
    },
    setSelectedUser: (draft, payload) => {
        draft.selectedUser = payload.selectedUser
    },
    setSelectedAvatar: (draft, payload) => {
        draft.selectedAvatar = payload.selectedAvatar
        if(payload.hasOwnProperty('loadedAvatar') && !draft.loadedAvatarList.includes(payload.loadedAvatar)){
            draft.loadedAvatarList.push(payload.loadedAvatar)
        } 
    },  
    setToolbarCols: (draft, payload) => {
        draft.toolbarCols = payload.toolbarCols
    },
}

export const AppReducer =  (draft,action) => {
    if (AppAction.hasOwnProperty(action.type))
        AppAction[action.type](draft,action.payload)
};

export const AppInitialState = {
    firstTime: true,
    isLoading: false,
    openModal: false,
    userNumber: 5,
    userList: [],
    selectedUser: null,
    errorMessage: "",
    selectedAvatar: null,
    loadedAvatarList: [],
    toolbarCols: 0,
};