"use client";
import { AlertColor } from "@mui/material";
import { useState } from "react";

export type Alert = (msg: string) => void;
export type OnClose = () => void;
export type SetAlertType = (t: AlertColor) => void;

export const useAlert = (): [
  boolean,
  string,
  AlertColor,
  Alert,
  SetAlertType,
  OnClose
] => {
  const [open, setOpen] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [type, setType] = useState<AlertColor>("success");

  const alert = (msg: string) => {
    setMessage(msg);
    setOpen(true);
  };

  const setAlertType = (t: AlertColor) => setType(t);

  const onClose = () => setOpen(false);

  return [open, message, type, alert, setAlertType, onClose];
};
