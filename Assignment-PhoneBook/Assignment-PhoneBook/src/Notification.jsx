import "./Notification.css";

const Notification = ({ message, notifType }) => {
    if (message === null) {
      return null
    }
  

    
        if(notifType != null && notifType.toUpperCase()=== 'ERROR'){
            return (
                <div className='NotificationMessageError'>
                 {message}
                </div>
                )
        } else {
            return (
                <div className='NotificationMessageSuccess'>
                {message}
            </div>
            )
        }


    
  }

  export default Notification