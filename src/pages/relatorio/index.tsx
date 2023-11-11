import { useEffect, useState } from "react";
import MetaTags from "../../components/metatags/metatags";
import ScriptComponents from "../../components/scripts/scripts";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import Router from "next/router";
import Navbar from "../../components/navbar/navbar";

export default function Relatorios() {
  return (
    <>
      <ToastContainer />
      <MetaTags />
      <Navbar active={"r"} />
      <main></main>
      <ScriptComponents />
    </>
  );
}
