import admin from "firebase-admin";
import { cookies } from "next/headers";
import { toastError } from "../helpers/toastError";

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY!.replace(/\\n/g, "\n"),
    }),
  });
}

export const adminAuth = admin.auth();
// TODO: will maybe used for register

export const getUserFromServerCookie = async () => {
  const token = (await cookies()).get("token")?.value;
  let initialUser = null;

  if (token) {
    try {
      const decoded = await adminAuth.verifyIdToken(token);
      initialUser = { uid: decoded.uid, email: decoded.email };

      return initialUser;
    } catch (error) {
      toastError(error);
    }
  }
};
