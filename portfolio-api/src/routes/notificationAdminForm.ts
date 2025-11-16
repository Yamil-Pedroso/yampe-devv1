import { Router } from "express";

const router = Router();

// Detect environment
const isProd = process.env.APP_ENV === "production";

// Base URL depending on environment
const apiBase = isProd ? "https://yampe.dev/api" : "http://localhost:3010/api";

/**
 * CREATE FORM
 */
router.get("/notifications/new", (_req, res) => {
  res.send(`
    <html>
      <head>
        <title>Create Notification</title>
        <style>
          body { font-family: sans-serif; margin: 40px; }
          form { display: flex; flex-direction: column; max-width: 400px; }
          input, button { padding: 10px; margin-top: 10px; font-size: 16px; }
          button { cursor: pointer; }
        </style>
      </head>
      <body>
        <h2>Create Notification</h2>

        <form method="POST" action="/admin/notifications/create" enctype="application/x-www-form-urlencoded">
          <input type="text" name="message" placeholder="Write your notification…" required />
          <button type="submit">Create</button>
        </form>

        <a href="/admin/notifications/list">Go to Notifications List</a>
      </body>
    </html>
  `);
});

/**
 * POST: Create notification via API
 */
router.post("/notifications/create", async (req, res) => {
  try {
    const { message } = req.body;

    await fetch(`${apiBase}/notifications`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message }),
    });

    return res.redirect("/admin/notifications/list");
  } catch (err) {
    console.error(err);
    return res.status(500).send("Error creating notification");
  }
});

/**
 * LIST
 */
router.get("/notifications/list", async (_req, res) => {
  try {
    const response = await fetch(`${apiBase}/notifications`);
    const data = await response.json();
    const notifications = data.notifications || [];

    const html = `
      <html>
        <head>
          <title>Notifications List</title>
          <style>
            body { font-family: sans-serif; margin: 40px; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            th, td { padding: 12px; border-bottom: 1px solid #ddd; }
            th { background: #f3f3f3; }
          </style>
        </head>
        <body>
          <h2>Notifications</h2>

          <a href="/admin/notifications/new">← Back to create notification</a>

          <table>
            <thead>
              <tr>
                <th>Text</th>
                <th>Created At</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              ${notifications
                .map(
                  (n: any) => `
                <tr>
                  <td>${n.message}</td>
                  <td>${new Date(n.createdAt).toLocaleString()}</td>
                  <td>
                    <a href="/admin/notifications/edit/${n._id}">Edit</a> |
                    <a href="/admin/notifications/delete/${
                      n._id
                    }" style="color:red;">Delete</a>
                  </td>
                </tr>`
                )
                .join("")}
            </tbody>
          </table>
        </body>
      </html>
    `;

    res.send(html);
  } catch (err) {
    return res.status(500).send("Error loading notifications.");
  }
});

/**
 * EDIT FORM
 */
router.get("/notifications/edit/:id", async (req, res) => {
  try {
    const response = await fetch(`${apiBase}/notifications`);
    const data = await response.json();
    const notification = data.notifications.find(
      (n: any) => n._id === req.params.id
    );

    if (!notification) {
      return res.send("Notification not found");
    }

    res.send(`
      <html>
        <head>
          <title>Edit Notification</title>
        </head>
        <body>
          <h2>Edit Notification</h2>

          <form method="POST" action="/admin/notifications/update/${notification._id}" enctype="application/x-www-form-urlencoded">
            <input type="text" name="message" value="${notification.message}" required />
            <button type="submit">Update</button>
          </form>

          <a href="/admin/notifications/list">Back to list</a>
        </body>
      </html>
    `);
  } catch (err) {
    res.status(500).send("Error loading notification");
  }
});

/**
 * UPDATE
 */
router.post("/notifications/update/:id", async (req, res) => {
  try {
    const { message } = req.body;

    await fetch(`${apiBase}/notifications/${req.params.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message }),
    });

    return res.redirect("/admin/notifications/list");
  } catch (err) {
    res.status(500).send("Error updating notification");
  }
});

/**
 * DELETE
 */
router.get("/notifications/delete/:id", async (req, res) => {
  try {
    await fetch(`${apiBase}/notifications/${req.params.id}`, {
      method: "DELETE",
    });

    return res.redirect("/admin/notifications/list");
  } catch (err) {
    res.status(500).send("Error deleting notification");
  }
});

export default router;
