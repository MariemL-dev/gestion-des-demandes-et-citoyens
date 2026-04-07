import { Request, Response } from "express";
import prisma from "../lib/prisma";

// CREATE Citizen

export const createCitizen = async (req: Request, res: Response) => {
  try {
    const { nom, prenom, email } = req.body;

    // Validation
    if (!nom || !prenom || !email) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const citizen = await prisma.citizen.create({
      data: {
        nom,
        prenom,
        email,
      },
    });

    return res.status(201).json(citizen);
  } catch (error: any) {
    if (error.code === "P2002") {
      return res.status(400).json({ error: "Email already exists" });
    }

    return res.status(500).json({ error: "Error creating citizen" });
  }
};


// GET ALL Citizens

export const getCitizens = async (req: Request, res: Response) => {
  try {
    const citizens = await prisma.citizen.findMany({
      include: {
        demandes: true,
      },
    });

    return res.json(citizens);
  } catch (error) {
    return res.status(500).json({ error: "Error fetching citizens" });
  }
};


// GET ONE Citizen

export const getCitizen = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid ID" });
    }

    const citizen = await prisma.citizen.findUnique({
      where: { id },
      include: {
        demandes: true,
      },
    });

    if (!citizen) {
      return res.status(404).json({ error: "Citizen not found" });
    }

    return res.json(citizen);
  } catch (error) {
    return res.status(500).json({ error: "Error fetching citizen" });
  }
};

// UPDATE Citizen

export const updateCitizen = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const { nom, prenom, email } = req.body;

    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid ID" });
    }

    if (!nom || !prenom || !email) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const citizen = await prisma.citizen.update({
      where: { id },
      data: {
        nom,
        prenom,
        email,
      },
    });

    return res.json(citizen);
  } catch (error: any) {
    if (error.code === "P2025") {
      return res.status(404).json({ error: "Citizen not found" });
    }

    return res.status(500).json({ error: "Error updating citizen" });
  }
};
// DELETE Citizen
export const deleteCitizen = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid ID" });
    }

    await prisma.citizen.delete({
      where: { id },
    });

    return res.json({ message: "Citizen deleted successfully" });
  } catch (error: any) {
    if (error.code === "P2025") {
      return res.status(404).json({ error: "Citizen not found" });
    }

    return res.status(500).json({ error: "Error deleting citizen" });
  }
};