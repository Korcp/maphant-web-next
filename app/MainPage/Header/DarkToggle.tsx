"use client";
import classes from './DarkToggle.module.css'

function DarkToggel() {
  return (
    <label className={classes.switch}>
      <input type="checkbox" />
      <span className={classes.slider}></span>
    </label>
  );
}

export default DarkToggel;
