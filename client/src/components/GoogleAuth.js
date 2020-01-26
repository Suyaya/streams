import React from 'react';
import {connect} from 'react-redux';
import {signIn} from '../actions/index';

// import{signIn,signOut} from '../actions';

class GoogleAuth extends React.Component{
    componentDidMount(){
        // load the auth2 library
        window.gapi.load('client:auth2',()=>{
            //initialize the GoogleAuth object, this returns gapi.auth2.GoogleAuth
            window.gapi.client.init({
                clientId:'298686558113-8q2mp9ituo4u7m3t8pte8dts4ugcmba3.apps.googleusercontent.com',
                scope:'email'
            }).then(()=>{
                this.auth = window.gapi.auth2.getAuthInstance();
                this.onAuthChange(this.auth.isSignedIn.get());
                this.auth.isSignedIn.listen(this.onAuthChange);
            });
        }); 
    }
    
    onAuthChange = (isSignedIn)=>{
        this.props.signIn(isSignedIn,this.auth.currentUser.get().getId());
    };

    // onAuthChange = (isSignedIn)=>{
    //     if(isSignedIn){
    //         this.props.signIn();
    //     }else{
    //         this.props.signout();
    //     }
    // }

    onSignOutClick = ()=>{
        this.auth.signOut();
    };

    onSignInClick = ()=>{
        this.auth.signIn();
    };

    renderAuthButton(){
        if(this.props.isSignedIn === null){
            return null;
        }else if(this.props.isSignedIn){
            return(
                <button className="ui red button" onClick={this.onSignOutClick}>
                    <i className="google icon"></i>
                    Sign Out
                </button>
            )
        }else{
            return(
                <button className="ui red button" onClick={this.onSignInClick}>
                    <i className="google icon"></i>
                    Sign In with Google
                </button>
            )
        }
    }
    render(){
        return(<div className='item'>{this.renderAuthButton()}</div>)
    }
}

const mapStateToProps = (state)=>{
    return {isSignedIn:state.auth.isSignedIn}
};

export default connect(mapStateToProps,{signIn:signIn})(GoogleAuth);

// export default connect(null,{signIn,signOut})(GoogleAuth);