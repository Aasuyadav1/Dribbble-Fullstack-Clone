"use client";
import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { motion } from "framer-motion";

type devModalProps = {
  children: React.ReactNode;
  open: boolean;
  isOpen: (open: boolean) => void;
  openBtn?: React.ReactNode;
  modalTitle?: string;
};
const Modal = ({
  children,
  open,
  isOpen,
  openBtn,
  modalTitle,
}: devModalProps) => {
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
      <div className="w-fit" onClick={() => isOpen(true)}>
        {openBtn}
      </div>

      {mounted && (
          <motion.main
            animate={open ? "open" : "close"}
            variants={mainVariants}
            transition={{ duration: 0.2 }}
            onClick={() => isOpen(false)}
            initial={{ visibility: "hidden", opacity: 0 }}
            className="bg-black/50  !z-[9999] fixed inset-0 h-screen w-screen grid place-content-center"
          >
            <motion.section
              animate={open ? "open" : "close"}
              variants={sectionVariants}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-[90vw] flex border  flex-col md:w-[40vw] min-h-60 rounded-xl shadow-md bg-slate-100  overflow-hidden"
            >
              <div className="w-full  bg-white  font-semibold flex items-center justify-between relative">
                <h3 className="p-3 text-cyan-500">{modalTitle}</h3>
                <IoIosCloseCircleOutline
                  onClick={() => isOpen(false)}
                  className="absolute top-3 right-3 text-2xl cursor-pointer text-black hover:text-black/50"
                />
              </div>
              <div className="flex items-center justify-center flex-1">
                {children}
              </div>
            </motion.section>
          </motion.main>
        )}
    </>
  );
};

export default Modal;
