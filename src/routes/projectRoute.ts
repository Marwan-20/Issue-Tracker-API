import { Router } from "express";
import pool from "../db/db";

const route = Router();

route.get("/projects", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM projects");
    res.status(200).json({
      state: "secsess",
      project: rows,
    });
  } catch (e) {
    console.error("Error fetching projects:", e);
    res.status(500).json({
      state: "failed",
      message: "internal server error",
    });
  }
});

route.get("/projects/:id", async (req, res) => {
  try {
    const id = req.params.id;

    if (!id || !Number.isInteger(Number(id)) || Number(id) < 1) {
      return res.status(400).json({
        state: "failed",
        message: "invalid id",
      });
    }

    const [result] = await pool.query("SELECT * FROM projects WHERE id = ?", [
      Number(id),
    ]);

    if ((result as any[]).length === 0) {
      return res.status(404).json({
        state: "failed",
        message: "Project not found",
      });
    }

    res.status(200).json({
      state: "secsess",
      project: result,
    });
  } catch (e) {
    console.error("there is an error: ", e);

    res.status(500).json({
      state: "falied",
      message: "internal server error",
    });
  }
});

route.post("/projects", async (req, res) => {
  try {
    const { user_id, name, status } = req.body;

    if (!name || !status) {
      return res.status(400).json({
        state: "failed",
        message: "name and description are required",
      });
    }

    await pool.query(
      "INSERT INTO projects (user_id, name, status, createdAt, updatedAt) VALUES (?, ?, ?, NOW(), NOW())",
      [user_id, name, status],
    );

    return res
      .status(201)
      .json({ state: "secsuss", message: "the project inserted successfully" });
  } catch (e) {
    console.error("Error while creating project:", e);
    return res.status(500).json({ message: "Internal server error" });
  }
});

// delete project
route.delete("/projects/:id", async (req, res) => {
  try {
    const id = req.params.id;

    if (!id || !Number.isInteger(Number(id)) || Number(id) < 1) {
      return res.status(400).json({
        state: "failed",
        message: "invalid id",
      });
    }

    const [result] = await pool.query("DELETE FROM projects WHERE id = ?", [
      Number(id),
    ]);

    if ((result as { affectedRows: number }).affectedRows === 0) {
      return res.status(404).json({
        state: "failed",
        message: "the project was not deleted",
      });
    }
    res.status(200).json({
      state: "secsuss",
    });
  } catch (e) {
    console.error("error while deleting the project", e);

    res
      .status(500)
      .json({ state: "false", message: "error while deleting the project" });
  }
});

// updating project
route.patch("/projects/:id", async (req, res) => {
  try {
    const { name, status } = req.body;
    const id = req.params.id;

    if (!id || !Number.isInteger(Number(id)) || Number(id) < 1) {
      return res.status(400).json({
        state: "failed",
        message: "invalid input or missing information",
      });
    }

    if (name === undefined && status === undefined) {
      return res.status(400).json({
        state: "failed",
        message: "Provide at least one field to update",
      });
    }

    const [result] = await pool.query(
      "UPDATE projects SET name = ?, status = ?, updatedAt = NOW() WHERE id = ?",
      [name, status, id],
    );
    res
      .status(200)
      .json({ state: "secusess", message: "updating project secsesfully" });
  } catch (e) {
    console.error("there is a problem in updating the project: ", e);

    res.status(500).json({ state: "failed", message: "internal server error" });
  }
});

export default route;
