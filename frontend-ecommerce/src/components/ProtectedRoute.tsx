"use client";
import { useAuthContext } from "@/app/context/AuthContext";
import { useRouter } from "next/navigation";
const ProtectedRoute = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const { authToken, isTokenExpired, clearToken } = useAuthContext();
  const router = useRouter();
  // Check if the user is authenticated
  if (!authToken || isTokenExpired()) {
    // If not authenticated, redirect to the login page
    clearToken();
    router.push("/login");
  } else {
    return <>{children}</>;
  }
};

export default ProtectedRoute;
