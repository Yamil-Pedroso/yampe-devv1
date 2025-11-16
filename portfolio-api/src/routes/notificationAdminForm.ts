import { Router } from "express";
import { Notification } from "../modules/notifications/notifications.model";

const router = Router();

// Create notification (POST)
router.post("/admin/notifications", async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.send("Message is required");
    }

    await Notification.create({ message });

    return res.redirect("/notifications/list");
  } catch (error) {
    console.error(error);
    return res.status(500).send("Error creating notification");
  }
});

// Simple admin form (GET)
router.get("/notifications/new", (req, res) => {
  res.send(`
    <html>
      <head>
        <title>Create Notification</title>
        <style>
          body {
            font-family: sans-serif;
            margin: 40px;
            padding: 0;
          }
          form {
            display: flex;
            flex-direction: column;
            max-width: 400px;
          }
          input, button {
            padding: 10px;
            margin-top: 10px;
            font-size: 16px;
          }
          button {
            cursor: pointer;
          }
        </style>
      </head>

      <body>
        <h2>Create Notification</h2>
       <form action="/admin/notifications" method="POST">


          <input
            type="text"
            name="message"
            placeholder="Write your notification…"
            required
          />
          <button type="submit">Create</button>
        </form>

        <a href="/notifications/list" style="
  display: inline-block;
  margin-top: 15px;
  padding: 10px;
  background: #f3f3f3;
  border: 1px solid #ccc;
  text-decoration: none;
  font-size: 16px;
">Go to Notifications List</a>

      </body>
    </html>
  `);
});

router.get("/notifications/list", async (req, res) => {
  try {
    const notifications = await Notification.find().sort({ createdAt: -1 });

    const html = `
      <html>
        <head>
          <title>Notifications List</title>
          <style>
            body {
              font-family: sans-serif;
              margin: 40px;
            }
            table {
              width: 100%;
              border-collapse: collapse;
              margin-top: 20px;
            }
            th, td {
              padding: 12px;
              border-bottom: 1px solid #ddd;
              text-align: left;
            }
            th {
              background: #f3f3f3;
            }
            a {
              display: inline-block;
              margin-bottom: 20px;
            }
          </style>
        </head>

        <body>
          <h2>Notifications</h2>

          <a href="/notifications/new">← Back to create notification</a>

          <table>
            <thead>
              <tr>
                <th>Text</th>
                <th>Created At</th>
              </tr>
            </thead>
           <tbody>
  ${notifications
    .map(
      (n) => `
        <tr>
          <td style="color: black">${n.message}</td>
          <td>${n.createdAt.toLocaleString()}</td>

          <td>
            <a
              href="/notifications/edit/${n._id}"
              style="margin-right: 10px;"
            >
              Edit
            </a>

            <a
              href="/notifications/delete/${n._id}"
              style="color: red;"
            >
              Delete
            </a>
          </td>
        </tr>
      `
    )
    .join("")}
</tbody>

          </table>
        </body>
      </html>
    `;

    res.send(html);
  } catch (error) {
    res.status(500).send("Error loading notifications.");
  }
});

router.get("/notifications/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;

    await Notification.findByIdAndDelete(id);

    return res.redirect("/notifications/list");
  } catch (error) {
    return res.status(500).send("Error deleting notification");
  }
});

router.get("/notifications/edit/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const notification = await Notification.findById(id);

    if (!notification) {
      return res.send("Notification not found");
    }

    const html = `
      <html>
        <head>
          <title>Edit Notification</title>
          <style>
            body {
              font-family: sans-serif;
              margin: 40px;
            }
            form {
              display: flex;
              flex-direction: column;
              max-width: 400px;
            }
            input, button {
              padding: 10px;
              margin-top: 10px;
              font-size: 16px;
            }
            button {
              cursor: pointer;
            }
          </style>
        </head>

        <body>
          <h2>Edit Notification</h2>

          <form action="/notifications/update/${id}" method="POST">
            <input
              type="text"
              name="message"
              value="${notification.message}"
              required
            />
            <button type="submit">Update</button>
          </form>

          <a href="/notifications/list">Back to list</a>
        </body>
      </html>
    `;

    res.send(html);
  } catch (error) {
    res.status(500).send("Error loading notification for edit");
  }
});

router.post("/notifications/update/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { message } = req.body;

    if (!message) {
      return res.send("Message is required");
    }

    await Notification.findByIdAndUpdate(id, { message });

    return res.redirect("/notifications/list");
  } catch (error) {
    res.status(500).send("Error updating notification");
  }
});

export default router;
