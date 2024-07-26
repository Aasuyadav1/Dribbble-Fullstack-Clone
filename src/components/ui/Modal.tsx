"use client";
import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { motion } from "framer-motion";

type ModalProps = {
  children: React.ReactNode;
  open: boolean;
  isOpen: (open: boolean) => void;
  openBtn?: React.ReactNode;
};
const Modal = ({
  children,
  open,
  isOpen,
  openBtn,
}: ModalProps) => {
  const [mounted, isMounted] = useState(false);
  const mainVariants: any = {
    open: { visibility: "visible", opacity: 1 },
    close: {
      opacity: 0,
      transitionEnd: {
        visibility: "hidden",
      },
    },
  };
  const sectionVariants = {
    open: { scale: 1 },
    close: { scale: 0.95 },
  };

  useEffect(() => {
    isMounted(true);
  }, []);
  return (
    <>
      <div className="w-full" onClick={() => isOpen(true)}>
        {openBtn}
      </div>

      {
        mounted && (
          <motion.main
          animate={open ? "open" : "close"}
          variants={mainVariants}
          transition={{ duration: 0.2 }}
          onClick={() => isOpen(false)}
          initial={{ visibility: "hidden", opacity: 0 }}
          className="bg-black/50  z-50 fixed inset-0 h-screen w-screen grid place-content-center overflow-hidden"
        >
          <motion.section
            animate={open ? "open" : "close"}
            variants={sectionVariants}
            transition={{ duration: 0.2 }}
            onClick={(e) => e.stopPropagation()}
            className="rounded-xl w-full  border-2 shadow-md bg-primary"
          >
            <div className="  bg-white font-semibold flex items-center justify-between relative">
              
              <IoIosCloseCircleOutline
                onClick={() => isOpen(false)}
                className="absolute top-3 right-3 text-2xl cursor-pointer text-secondary hover:text-secondary/50"
              />
            </div>
            <div className="flex items-center justify-center  flex-1">
              {children}
            </div>
          </motion.section>
        </motion.main>
        )
      }
    </>
  );
};

export default Modal;
