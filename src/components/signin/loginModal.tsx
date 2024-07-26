"use client";
import React from "react";
import Modal from "../ui/Modal";
import AuthBtns from "./AuthBtns";
import { useStore } from "@/store/useStore";

type Props = {};

const LoginModal = (props: Props) => {
  const { loginModalOpen, setLoginModalOpen } = useStore((state) => state);
  return (
      <Modal open={loginModalOpen} isOpen={setLoginModalOpen}>
        <div className="!w-[450px] p-2 flex flex-col  justify-center">
          <h1 className="text-3xl font-semibold mt-2">
            Login to <span className="text-accent">Dribbble</span>
          </h1>
          <div className="mt-1 w-full">
          <AuthBtns />
          </div>
        </div>
      </Modal>
  );
};

export default LoginModal;
