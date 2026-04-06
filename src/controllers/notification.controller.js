import { getUserNotifications, markNotificationRead } from "../services/notification.js";

export const getNotifications = async (req, res) => {
  try {
    const userId = req.user.id;
    const notifications = await getUserNotifications(userId);
    res.json(notifications);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const markAsRead = async (req, res) => {
  try {
    const userId = req.user.id;
    const notificationId = req.params.id;

    const notification = await markNotificationRead(notificationId, userId);

    if (!notification) {
      return res.status(404).json({
        message: "Notification not found",
      });
    }

    res.json(notification);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
