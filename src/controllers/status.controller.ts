import { Request, Response } from "express";
import prisma from "../lib/prisma";

// GET ALL Statuses
export const getStatuses = async (req: Request, res: Response) => {
  try {
    const statuses = await prisma.status.findMany({
      include: {
        demandes: true,
      },
    });

    return res.json(statuses);
  } catch (error) {
    console.error("GET STATUSES ERROR:", error);
    return res.status(500).json({ error: "Error fetching statuses" });
  }
};

// CREATE Status
export const createStatus = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ error: "Name is required" });
    }

    const status = await prisma.status.create({
      data: { name },
    });

    return res.status(201).json(status);
  } catch (error) {
    console.error("CREATE STATUS ERROR:", error);
    return res.status(500).json({ error: "Error creating status" });
  }
};

// UPDATE Status
export const updateStatus = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const { name } = req.body;

    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid ID" });
    }

    if (!name) {
      return res.status(400).json({ error: "Name is required" });
    }

    const status = await prisma.status.update({
      where: { id },
      data: { name },
    });

    return res.json(status);
  } catch (error: any) {
    if (error.code === "P2025") {
      return res.status(404).json({ error: "Status not found" });
    }

    console.error("UPDATE STATUS ERROR:", error);
    return res.status(500).json({ error: "Error updating status" });
  }
};

// DELETE Status
export const deleteStatus = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid ID" });
    }

    await prisma.status.delete({
      where: { id },
    });

    return res.json({ message: "Status deleted successfully" });
  } catch (error: any) {
    if (error.code === "P2025") {
      return res.status(404).json({ error: "Status not found" });
    }

    console.error("DELETE STATUS ERROR:", error);
    return res.status(500).json({ error: "Error deleting status" });
  }
};
