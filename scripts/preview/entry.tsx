// Client-only entry for the standalone preview.html (no Next.js router needed).
import { createRoot } from "react-dom/client";
import Home from "@/app/page";
import { MotionProvider } from "@/components/layout/MotionProvider";

createRoot(document.getElementById("root")!).render(
  <MotionProvider>
    <Home />
  </MotionProvider>
);
