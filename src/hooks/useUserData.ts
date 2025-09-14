import { useState, useEffect } from "react";
import type { UserData } from "../types";

const STORAGE_KEYS = {
  email: "mf_email",
  name: "mf_name",
} as const;

export function useUserData() {
  const [userData, setUserData] = useState<UserData>({
    email: "",
    name: "",
  });

  useEffect(() => {
    const email = localStorage.getItem(STORAGE_KEYS.email) || "";
    const name = localStorage.getItem(STORAGE_KEYS.name) || "";
    setUserData({ email, name });
  }, []);

  const setEmail = (email: string) => {
    localStorage.setItem(STORAGE_KEYS.email, email);
    setUserData((prev) => ({ ...prev, email }));
  };

  const setName = (name: string) => {
    localStorage.setItem(STORAGE_KEYS.name, name);
    setUserData((prev) => ({ ...prev, name }));
  };

  const clearUserData = () => {
    localStorage.removeItem(STORAGE_KEYS.email);
    localStorage.removeItem(STORAGE_KEYS.name);
    setUserData({ email: "", name: "" });
  };

  return {
    userData,
    setEmail,
    setName,
    clearUserData,
  };
}
