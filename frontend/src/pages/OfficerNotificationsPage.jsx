import OfficerWorkspace from '../components/OfficerWorkspace.jsx';
import NotificationCenter from '../components/NotificationCenter.jsx';
import { useEngagementDemo } from '../context/EngagementDemoContext.jsx';
import { officerNotificationCategories } from '../data/notificationData.js';

export default function OfficerNotificationsPage(){
 const {officerNotifications,readOfficerNotification,readAllOfficerNotifications,removeOfficerNotification}=useEngagementDemo();
 return <OfficerWorkspace activePath="/officer/notifications" title="Officer notifications" subtitle="Review reminders and demo activity updates"><NotificationCenter workspace="officer" notifications={officerNotifications} categories={officerNotificationCategories} onRead={readOfficerNotification} onReadAll={readAllOfficerNotifications} onDelete={removeOfficerNotification}/></OfficerWorkspace>;
}
