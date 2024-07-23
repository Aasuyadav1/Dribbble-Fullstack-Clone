'use client'
import React, { useState, useEffect } from "react";
import Button from "../ui/Button";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { signIn, useSession } from "next-auth/react";

interface LoadingType {
  github: boolean;
  google: boolean;
}

const AuthBtns = () => {
  const { status } = useSession();
  const [loading, setLoading] = useState<LoadingType>({ github: false, google: false });

  const handleSignIn = async (provider: "github" | "google") => {
    try {
      setLoading((prev) => ({ ...prev, [provider]: true }));
      await signIn(provider, { callbackUrl: "/" });
    } catch (error) {
      console.error(`Error signing in with ${provider}:`, error);
    } finally {
      setLoading((prev) => ({ ...prev, [provider]: false }));
    }
  };

  useEffect(() => {
    if (status === 'unauthenticated') {
      setLoading({ github: false, google: false });
    }
  }, [status]);

  return (
    <div className="mt-10 flex flex-col gap-5 w-full">
      <Button
        className="w-full px-2 py-4 flex items-center gap-4 justify-center rounded-full text-md font-medium"
        disabled={loading.google}
        onClick={() => handleSignIn("google")}
      >
        <FcGoogle className="w-6 h-6" />
        Sign in with Google
      </Button>
      <Button
        className="w-full px-2 py-4 flex items-center gap-4 justify-center rounded-full text-md font-medium"
        disabled={loading.github}
        onClick={() => handleSignIn("github")}
      >
        <FaGithub className="w-6 h-6" />
        Sign in with GitHub
      </Button>
    </div>
  );
};

export default AuthBtns;
