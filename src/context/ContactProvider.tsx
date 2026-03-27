import { createContext, useContext, useState, ReactNode } from "react";
import ContactDialog from "../components/ContactDialog";

interface ContactContextType {
  openContactDialog: () => void;
  closeContactDialog: () => void;
}

const ContactContext = createContext<ContactContextType | undefined>(undefined);

export function ContactProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const openContactDialog = () => setIsOpen(true);
  const closeContactDialog = () => setIsOpen(false);

  return (
    <ContactContext.Provider value={{ openContactDialog, closeContactDialog }}>
      {children}
      <ContactDialog isOpen={isOpen} onClose={closeContactDialog} />
    </ContactContext.Provider>
  );
}

export function useContact() {
  const context = useContext(ContactContext);
  if (context === undefined) {
    throw new Error("useContact must be used within a ContactProvider");
  }
  return context;
}
