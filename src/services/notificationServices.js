
function notificationsHandler(type, message) {
    console.log(this.state);
    this.setState({
        notification: {
            type: type,
            message: message,
        }
    
    })


    // if (type === `good`) {




    // } else if (type === `bad`) {



    // }


}

const funcs = {
    notificationsHandler,
}

export default funcs;
    