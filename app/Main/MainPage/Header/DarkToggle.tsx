"use client";
import classes from "./DarkToggle.module.css";
import { MdSunny, MdOutlineNightlightRound } from "react-icons/md";

function DarkToggel() {
  return (
    <label className={classes.switch}>
      <input type="checkbox" />
      <span className={classes.slider}>
        {" "}
        <MdOutlineNightlightRound size={20} color="gray" />
        <MdSunny size={20} color="yellow" />
      </span>
    </label>
  );
}

export default DarkToggel;
