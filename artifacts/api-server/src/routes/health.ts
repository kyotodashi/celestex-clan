import { Router } from "express";

const router = Router();

router.get("/healthz", (_req, res) => {
  res.send("OK");
});

export default router;