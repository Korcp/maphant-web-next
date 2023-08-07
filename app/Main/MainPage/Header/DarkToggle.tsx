"use client";
import classes from "./DarkToggle.module.css";
import { MdSunny, MdOutlineNightlightRound } from "react-icons/md";

function DarkToggel() {
  return (
    <label className={classes.switch}>
      <input type="checkbox" />
      <span className={classes.slider}>
        {" "}
        <MdOutlineNightlightRound size={'1.25rem'} color="gray" />
        <MdSunny size={'1.25rem'} color="yellow" />
      </span>
    </label>
  );
}

export default DarkToggel;
