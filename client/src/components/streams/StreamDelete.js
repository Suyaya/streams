import React from 'react';
import Modal from '../Modal';
import history from '../../history';
import {fetchStream, deleteStream} from '../../actions/index';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

class StreamDelete extends React.Component {

    renderActions =()=>{
        return (
            <React.Fragment>
                <button className="ui button negative" onClick={()=>{
            this.props.deleteStream(this.props.match.params.id);
        }}>Delete</button>
                <Link to='/' className="ui button" >Cancel</Link>
            </React.Fragment>
        );
    }
    renderContent =()=>{
        if(!this.props.stream){
            return 'Are you sure you want to delete this stream?'
        }
        return `Are you sure you want to delete the stream with title: ${this.props.stream.title} ?`
    }
    componentDidMount(){
        this.props.fetchStream(this.props.match.params.id);
    }
    render(){

        return (
            <div>
                <Modal 
                    title='Delete Stream'
                    content = {this.renderContent()}
                    actions = {this.renderActions()}
                    onDismiss ={()=>{history.push('/')}}
                />
            </div>
         )
        }
}

const mapStateToProps = (state,ownProps)=>{
    return(
        {stream: state.streams[ownProps.match.params.id]}
    )
}
export default connect(mapStateToProps,{fetchStream, deleteStream})(StreamDelete);