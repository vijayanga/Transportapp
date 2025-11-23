import { useRouter } from "expo-router";
import { useEffect } from "react";
import { useAppSelector } from "../store/hooks";

export default function Index() {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      router.replace("/(tabs)/" as any);
    } else {
      router.replace("/login" as any);
    }
  }, [isAuthenticated]);

  return null;
}
