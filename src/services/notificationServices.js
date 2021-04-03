
function notificationsHandler(type, message) {
    this.setState({
        notification: {
            type: type,
            message: message,
        }

    })
}

const funcs = {
    notificationsHandler,
}

export default funcs
