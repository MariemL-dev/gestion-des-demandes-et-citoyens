import { Request, Response } from "express";
import prisma from "../lib/prisma";

// CREATE Demande
export const createDemande = async (req: Request, res: Response) => {
  try {
    const { title, description, citizenId, statusId } = req.body;

    if (!title || !description || !citizenId || !statusId) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const demande = await prisma.demande.create({
      data: {
        title,
        description,
        citizenId: Number(citizenId),
        statusId: Number(statusId),
      },
      include: {
        citizen: true,
        status: true,
      },
    });

    return res.status(201).json(demande);
  } catch (error) {
    console.error("CREATE DEMANDE ERROR:", error);
    return res.status(500).json({ error: "Error creating demande" });
  }
};

// GET ALL Demandes
export const getDemandes = async (req: Request, res: Response) => {
  try {
    const demandes = await prisma.demande.findMany({
      include: {
        citizen: true,
        status: true,
      },
    });

    return res.json(demandes);
  } catch (error) {
    console.error("GET DEMANDES ERROR:", error);
    return res.status(500).json({ error: "Error fetching demandes" });
  }
};

// GET ONE Demande
export const getDemande = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid ID" });
    }

    const demande = await prisma.demande.findUnique({
      where: { id },
      include: {
        citizen: true,
        status: true,
      },
    });

    if (!demande) {
      return res.status(404).json({ error: "Demande not found" });
    }

    return res.json(demande);
  } catch (error) {
    console.error("GET DEMANDE ERROR:", error);
    return res.status(500).json({ error: "Error fetching demande" });
  }
};

// UPDATE Demande
export const updateDemande = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const { title, description, citizenId, statusId } = req.body;

    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid ID" });
    }

    if (!title || !description || !citizenId || !statusId) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const demande = await prisma.demande.update({
      where: { id },
      data: {
        title,
        description,
        citizenId: Number(citizenId),
        statusId: Number(statusId),
      },
      include: {
        citizen: true,
        status: true,
      },
    });

    return res.json(demande);
  } catch (error: any) {
    if (error.code === "P2025") {
      return res.status(404).json({ error: "Demande not found" });
    }

    console.error("UPDATE DEMANDE ERROR:", error);
    return res.status(500).json({ error: "Error updating demande" });
  }
};

// DELETE Demande
export const deleteDemande = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid ID" });
    }

    await prisma.demande.delete({
      where: { id },
    });

    return res.json({ message: "Demande deleted successfully" });
  } catch (error: any) {
    if (error.code === "P2025") {
      return res.status(404).json({ error: "Demande not found" });
    }

    console.error("DELETE DEMANDE ERROR:", error);
    return res.status(500).json({ error: "Error deleting demande" });
  }
};
