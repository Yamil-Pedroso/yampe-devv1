import { Request, Response } from "express";
import { Notification } from "./notifications.model";

/**
 * Get all notifications (sorted by newest)
 */
export const listNotifications = async (req: Request, res: Response) => {
  try {
    const notifications = await Notification.find().sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      notifications,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch notifications",
    });
  }
};

/**
 * Create a new notification
 */
export const createNotification = async (req: Request, res: Response) => {
  const { message } = req.body;

  try {
    if (!message) {
      return res.status(400).json({
        success: false,
        error: "Text field is required",
      });
    }

    const newNotification = await Notification.create({ message });

    return res.status(201).json({
      success: true,
      notification: newNotification,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to create notification",
    });
  }
};

/**
 * Update an existing notification
 */
export const updateNotification = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { message } = req.body;

  try {
    if (!message) {
      return res.status(400).json({
        success: false,
        error: "Text field is required",
      });
    }

    const updatedNotification = await Notification.findByIdAndUpdate(
      id,
      { message },
      { new: true }
    );

    if (!updatedNotification) {
      return res.status(404).json({
        success: false,
        error: "Notification not found",
      });
    }

    return res.status(200).json({
      success: true,
      notification: updatedNotification,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to update notification",
    });
  }
};

/**
 * Delete a notification
 */
export const deleteNotification = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const deletedNotification = await Notification.findByIdAndDelete(id);

    if (!deletedNotification) {
      return res.status(404).json({
        success: false,
        error: "Notification not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Notification deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to delete notification",
    });
  }
};
