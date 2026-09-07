import { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";

export function useIsAdmin() {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const check = async () => {
      try {
        const user = await base44.auth.me();
        setIsAdmin(user?.role === "admin");
      } catch {
        setIsAdmin(false);
      }
    };
    check();
  }, []);

  return isAdmin;
}