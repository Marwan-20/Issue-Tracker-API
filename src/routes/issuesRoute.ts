import { Router } from "express";
import pool from '../db/db'

const route = Router();

route.get('/projects/:projectId/issues', async (req, res) => {
  try {
    const projectId = req.params.projectId;

     if(!projectId || !Number.isInteger(Number(projectId)) || Number(projectId) < 1) {
      return res.status(400).json({
        state: "failed",
        message: "invalid id"
      });
    }

    const [rows] = await pool.query('SELECT * FROM issues WHERE project_id = ?', [Number(projectId)])

    res.status(200).json({state: "secseuss", issues: rows})

  } catch(e) {  
    console.error("there is an error while geting the projecgt: ", e);

    res.status(500).json({
      state: "failed",
      mesage: "there is an error while geting the project"
    })
  }
})

route.get('/issues/:id', async (req, res) => {
  try {
    const id = req.params.id;

     if(!id || !Number.isInteger(Number(id)) || Number(id) < 1) {
      return res.status(400).json({
        state: "failed",
        message: "invalid id"
      });
    }

    const [issue] = await pool.query("SELECT * FROM issues WHERE id = ?", [Number(id)])

    if((issue as any[]).length === 0) {
      return res.status(404).json({
        state: "Failed",
        message: "the issues not found"
      })
    }

    res.status(200).json({
      state: "secusess",
      issue: issue
    })
  } catch(e) {
    console.error("there is an internal server error: ", e);

    res.status(500).json({
      state: "failed",
      message: "there is an internal server error"
    })
  }
})

route.post('/projects/:projectId/issues', async (req, res) => {
  try {
    const projectId = Number(req.params.projectId);
    const { name, status } = req.body;

    if (!Number.isInteger(projectId) || projectId < 1) {
      return res.status(400).json({
        state: "failed",
        message: "Invalid project ID"
      });
    }

    if (!name || !status) {
      return res.status(400).json({
        state: "failed",
        message: "Name and status are required"
      });
    }

    // Check whether the project exists
    const [projects] = await pool.query(
      "SELECT id FROM projects WHERE id = ?",
      [projectId]
    );

    if ((projects as any[]).length === 0) {
      return res.status(404).json({
        state: "failed",
        message: "Project not found"
      });
    }

    // Create the new issue
    const [result] = await pool.query(
      `INSERT INTO issues
       (project_id, name, statue, createdAt, updatedAt)
       VALUES (?, ?, ?, NOW(), NOW())`,
      [projectId, name, status]
    );

    return res.status(201).json({
      state: "success",
      message: "Issue created successfully",
      issueId: (result as { insertId: number }).insertId
    });

  } catch (e) {
    console.error("Error while creating the issue:", e);

    return res.status(500).json({
      state: "failed",
      message: "Internal server error"
    });
  }
});


route.patch('/issues/:id', async (req, res) => {
  try {
    const id = Number(req.params.id);
    const { name, status } = req.body;

    // Validate the issue ID
    if (!Number.isInteger(id) || id < 1) {
      return res.status(400).json({
        state: "failed",
        message: "Invalid issue ID"
      });
    }

    // Check that at least one field was provided
    if (name === undefined && status === undefined) {
      return res.status(400).json({
        state: "failed",
        message: "Provide name or status to update"
      });
    }

    // Check whether the issue exists
    const [issues] = await pool.query(
      "SELECT id FROM issues WHERE id = ?",
      [id]
    );

    if ((issues as any[]).length === 0) {
      return res.status(404).json({
        state: "failed",
        message: "Issue not found"
      });
    }

    // Update the issue
    await pool.query(
      `UPDATE issues
       SET name = ?,
           statue = ?,
           updatedAt = NOW()
       WHERE id = ?`,
      [name ?? null, status ?? null, id]
    );

    return res.status(200).json({
      state: "success",
      message: "Issue updated successfully"
    });

  } catch (e) {
    console.error("Error while updating the issue:", e);

    return res.status(500).json({
      state: "failed",
      message: "Internal server error"
    });
  }
});


route.delete('/issues/:id', async (req, res) => {
  try {
    const id = req.params.id

    if(!id || !Number.isInteger(Number(id)) || Number(id) < 1) {
      return res.status(400).json({
        state: "failed",
        message: "invalid id"
      });
    }

    await pool.query("Delete from issues WHERE id = ?", [Number(id)])

    res.status(200).json({
      state: "secseuss",
      message: "the issues have been deleted"
    })

  } catch (e) {
    console.error(`there is an error in deleting the issues : ${e}`)

    res.status(500).json({
      state: "failed",
      message: "internal server error"
    })
  }
})

export default route;