
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { SubscribeModal } from '../components/SubscribeModal';

interface SubscribeContextType {
  openSubscribeModal: () => void;
  closeSubscribeModal: () => void;
}

const SubscribeContext = createContext<SubscribeContextType | undefined>(undefined);

export const useSubscribe = () => {
  const context = useContext(SubscribeContext);
  if (!context) {
    throw new Error('useSubscribe must be used within a SubscribeProvider');
  }
  return context;
};

export const SubscribeProvider = ({ children }: { children?: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);

  const openSubscribeModal = () => setIsOpen(true);
  const closeSubscribeModal = () => setIsOpen(false);

  return (
    <SubscribeContext.Provider value={{ openSubscribeModal, closeSubscribeModal }}>
      {children}
      {isOpen && <SubscribeModal onClose={closeSubscribeModal} />}
    </SubscribeContext.Provider>
  );
};
