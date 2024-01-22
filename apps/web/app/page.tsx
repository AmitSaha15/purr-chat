"use client";
import { useState } from "react";
import { useSocket } from "../context/SocketProvider";
import classes from "./page.module.css";

export default function Page() {
  const { sendMessage, messages } = useSocket();
  const [message, setMessage] = useState("");

  return (
    <div className={classes["parent-div"]}>
      <h1>PurrChat</h1>
      <div className={classes["main-div"]}>
        <div>
          {messages.map((e) => (
            <li>{e}</li>
          ))}
        </div>
      </div>
      <div className={classes["inputs"]}>
          <input
            onChange={(e) => setMessage(e.target.value)}
            className={classes["chat-input"]}
            placeholder="Message..."
          />
          <button
            onClick={(e) => sendMessage(message)}
            className={classes["button"]}
          >
            Send
          </button>
        </div>
    </div>
  );
}