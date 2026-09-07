import React, { createContext, useContext, useState } from "react";

const ContactModalContext = createContext(null);

export function ContactModalProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <ContactModalContext.Provider value={{ isOpen, open: () => setIsOpen(true), close: () => setIsOpen(false) }}>
      {children}
    </ContactModalContext.Provider>
  );
}

export function useContactModal() {
  const ctx = useContext(ContactModalContext);
  if (!ctx) throw new Error("useContactModal must be used within ContactModalProvider");
  return ctx;
}
