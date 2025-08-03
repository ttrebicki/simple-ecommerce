"use client";
import { useRouter } from "next/navigation";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/lib/validators/login";
import { TextField } from "@/ui/reusable/TextField";
import { firebaseToastError } from "@/lib/helpers/toastError";
import { Button } from "@/ui/reusable/Button";
import { Box } from "@/ui/reusable/Box";
import { app } from "@/lib/api/firebase_client";
import { fetcher } from "@/lib/api/fetcher";
import { uri } from "@/lib/constants/uri";
import toast from "react-hot-toast";
import { useState } from "react";

export default function Login() {
  const auth = getAuth(app);
  const [isRegister, toggleRegister] = useState(false);

  const router = useRouter();
  const { handleSubmit, register, watch } = useForm({
    mode: "onChange",
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });
  const email = watch("email");
  const password = watch("password");

  const handleLogin = async () => {
    try {
      const res = await signInWithEmailAndPassword(auth, email, password);
      const token = await res.user.getIdToken();

      await fetcher.post({
        uri: uri.getFirebaseSession,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      });

      router.replace("/");
      toast.success(
        res.user.displayName
          ? `Logged in! Hello, ${res.user.displayName}!`
          : "Logged in!"
      );
    } catch (error) {
      console.log({ error });
      firebaseToastError(error);
    }
  };

  const handleRegister = async () => {
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      const token = await res.user.getIdToken();

      await fetcher.post({
        uri: uri.getFirebaseSession,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      });

      router.replace("/");
      toast.success(
        res.user.displayName
          ? `Logged in! Hello, ${res.user.displayName}!`
          : "Logged in!"
      );
    } catch (error) {
      firebaseToastError(error);
    }
  };

  const onSubmit = handleSubmit(isRegister ? handleRegister : handleLogin);

  return (
    <Box>
      <form onSubmit={onSubmit} className="flex flex-col gap-4">
        <div>
          <TextField label={"Email"} {...register("email")} />
          <TextField
            type="password"
            label={"Password"}
            {...register("password")}
          />
        </div>
        <Button type="submit">{isRegister ? "Register" : "Log In"}</Button>
      </form>
      <Button
        onClick={() => {
          toggleRegister((state) => !state);
        }}
        variant="outlined"
        padding={1}
        className={"mt-4 "}
      >
        {isRegister
          ? "Return to login"
          : "No account? Click here to register. 😎"}
      </Button>
    </Box>
  );
}
