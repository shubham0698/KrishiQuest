import FarmerWorkspace from '../components/FarmerWorkspace.jsx';
import NotificationCenter from '../components/NotificationCenter.jsx';
import { useEngagementDemo } from '../context/EngagementDemoContext.jsx';
import { farmerNotificationCategories } from '../data/notificationData.js';

export default function FarmerNotificationsPage(){
 const {farmerNotifications,readFarmerNotification,readAllFarmerNotifications,removeFarmerNotification}=useEngagementDemo();
 return <FarmerWorkspace activePath="/farmer/notifications" title="Notifications" subtitle="Your community and learning updates"><NotificationCenter notifications={farmerNotifications} categories={farmerNotificationCategories} onRead={readFarmerNotification} onReadAll={readAllFarmerNotifications} onDelete={removeFarmerNotification}/></FarmerWorkspace>;
}
