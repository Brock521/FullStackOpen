import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { resetNotifMessage } from './Reducers/notificationReducer'; // Assume you have this action to clear the notification

const Notification = () => {
  const dispatch = useDispatch();
  const notification = useSelector((state) => state.notification);

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        dispatch(resetNotifMessage());
      }, 5000);

      // Cleanup the timer if the component unmounts or notification changes
      return () => clearTimeout(timer);
    }
  }, [notification, dispatch]);

  if (!notification) return null; // Don't render if there's no notification

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 10,
  };

  return <div style={style}>{notification}</div>;
};

export default Notification;