"use client";

import { useFormStatus } from "react-dom";
import Button from "@/components/common/buttons/Button";
import { IoIosArrowForward } from "react-icons/io";
import {
  ctaEnter,
  ctaHover,
  ctaTap,
} from "@/components/common/animation/motionTokens";

type Props = {
  children: React.ReactNode;
  className?: string;
};

export default function SubmitButton({ children, className }: Props) {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      disabled={pending}
      aria-disabled={pending}
      initial="hidden"
      animate="show"
      variants={ctaEnter}
      transition={{ delay: 0.35 }}
      whileHover={!pending ? ctaHover : undefined}
      whileTap={!pending ? ctaTap : undefined}
      className={`group ${className ?? ""} ${pending ? "opacity-80 cursor-not-allowed" : "cursor-pointer"}`}
    >
      <span className="font-bold">{pending ? "Sending…" : children}</span>
      <IoIosArrowForward
        className={`ml-2 transition-all duration-300 ${pending ? "" : "group-hover:ml-3"}`}
        size={20}
      />
    </Button>
  );
}
