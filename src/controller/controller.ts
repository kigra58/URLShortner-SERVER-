import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { nanoid } from "nanoid";

const prisma = new PrismaClient();
export const createUrl = async (req: Request, res: Response) => {
  const { url } = req.body;
  console.log("========url", url);
  if (url) {
    const existURL = await prisma.user.findFirst({
      where: { redirectURL: url },
    });
    if (existURL && existURL.shortId) {
      res.status(200).json({ success: true, shortId: existURL.shortId });
    } else {
      const shortId = nanoid(8);
      const result = await prisma.user.create({
        data: {
          shortId,
          visitHistory: "",
          redirectURL: url,
        },
      });
      if (result) {
        res.status(201).json({ success: true, shortId: result.shortId });
      } else {
        res.send();
        res
          .status(400)
          .json({ success: false, error: "Unable to generate URL" });
      }
    }
  } else {
    res.status(400).json({ success: false, error: "URL is required" });
  }
};

/**
 *  REDIRECT UTL
 * @param req
 * @param res
 */
export const redirectURL = (req: Request, res: Response) => {
  const shortId = req.params.shortId;
  // console.log("=========tttttttttttttttttt", shortId);
  if (shortId) {
    prisma.user
      .findFirst({
        where: { shortId },
      })
      .then((existShortId) => {
        // console.log("========existShortId", existShortId?.redirectURL);
        if (existShortId && existShortId.redirectURL) {
          res.redirect(existShortId.redirectURL);
        }
      })
      .catch((err) => console.error(err));
  }
};

/**
 *  GET URL ANALYTICS
 * @param req
 * @param res
 */
export const URLAnalytics = async (req: Request, res: Response) => {
  try {
    const { shortId } = req.params;
    const existShortId = await prisma.user.findFirst({
      where: { shortId },
    });
    if (existShortId && existShortId.visitHistory) {
      const analytics = JSON.parse(existShortId.visitHistory);
      res.status(200).json({ totalVisted: analytics.length, analytics });
    }
  } catch (error) {
    console.error(error);
  }
};
