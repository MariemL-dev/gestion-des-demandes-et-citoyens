import { Request, Response } from "express";
import prisma from "../lib/prisma";

export const getAdminProfile = async (req: Request, res: Response) => {
  try {
    let profile = await prisma.adminProfile.findFirst();

    if (!profile) {
      profile = await prisma.adminProfile.create({
        data: {
          fullName: "Admin Manager",
          email: "admin@civicadmin.com",
          role: "Super Administrator",
          theme: "Light",
          notifications: true,
        },
      });
    }

    return res.json(profile);
  } catch (error) {
    console.error("GET ADMIN PROFILE ERROR:", error);
    return res.status(500).json({ error: "Error fetching admin profile" });
  }
};

export const updateAdminProfile = async (req: Request, res: Response) => {
  try {
    const { fullName, email, role, theme, notifications } = req.body;

    let profile = await prisma.adminProfile.findFirst();

    if (!profile) {
      profile = await prisma.adminProfile.create({
        data: {
          fullName: fullName || "Admin Manager",
          email: email || "admin@civicadmin.com",
          role: role || "Super Administrator",
          theme: theme || "Light",
          notifications:
            notifications !== undefined ? Boolean(notifications) : true,
        },
      });

      return res.json(profile);
    }

    const updatedProfile = await prisma.adminProfile.update({
      where: { id: profile.id },
      data: {
        fullName,
        email,
        role,
        theme,
        notifications,
      },
    });

    return res.json(updatedProfile);
  } catch (error: any) {
    console.error("UPDATE ADMIN PROFILE ERROR:", error);

    if (error.code === "P2002") {
      return res.status(400).json({ error: "Email already exists" });
    }

    return res.status(500).json({ error: "Error updating admin profile" });
  }
};
