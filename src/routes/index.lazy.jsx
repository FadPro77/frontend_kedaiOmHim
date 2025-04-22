/* eslint-disable no-unused-vars */
import { createLazyFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { useRef } from "react";
import GuestLayout from "../layouts/GuestLayout";
import ScreenHomepage from "../components/Homepage/ScreenHomepage";
import { motion } from "motion/react";
export const Route = createLazyFileRoute("/")({
  component: Index,
});

function Index() {
  const [openHomepage, setOpenHomepage] = useState(true);
  return (
    <>
      <GuestLayout
        openHomepage={openHomepage}
        setOpenHomepage={setOpenHomepage}
      >
        {openHomepage && <ScreenHomepage />}
      </GuestLayout>
    </>
  );
}
