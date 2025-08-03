"use client";

import { fetcher } from "@/lib/api/fetcher";
import { app } from "@/lib/api/firebase_client";
import { uri } from "@/lib/constants/uri";
import { toastError } from "@/lib/helpers/toastError";
import { Button } from "@/ui/reusable/Button";
import { getAuth } from "firebase/auth";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export const Logout = () => {
  const auth = getAuth(app);
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await auth.signOut();
      await fetcher.delete(uri.getFirebaseSession);

      router.replace("/");
      toast.success("Logged out!");
    } catch (error) {
      toastError(error);
    }
  };

  return <Button onClick={handleLogout}>{"Log out"}</Button>;
};
