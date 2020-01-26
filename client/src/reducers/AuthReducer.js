const INITIAL_STATE = {
    isSignedIn:null,
    userId: null
};

export const AuthReducer = (state=INITIAL_STATE,action)=>{
    switch(action.type){
        case 'SIGN':
            return {...state,isSignedIn:action.payload.isSignedIn,userId:action.payload.userId};
        default:
            return state
    }
}

