'use client'
import classes from "./page.module.css"

export default function page(){
  return (
    <div>
      <div>
        <h1>All messages</h1>
      </div>
      <div>
        <input className={classes["chat-input"]} type="text" placeholder="Message..." />
        <button className={classes["button"]}>Send</button>
      </div>
    </div>
  );
}