import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
  orderBy,
  Timestamp,
} from 'firebase/firestore';
import { db } from './firebase';
import { Client, ClientFormData } from '@/types/client';

const CLIENTS_COLLECTION = 'clients';

export const addClient = async (userId: string, clientData: ClientFormData) => {
  const clientsRef = collection(db, CLIENTS_COLLECTION);
  const now = Timestamp.now();
  
  const newClient = {
    ...clientData,
    userId,
    createdAt: now,
    updatedAt: now,
  };

  const docRef = await addDoc(clientsRef, newClient);
  return { id: docRef.id, ...newClient };
};

export const updateClient = async (clientId: string, clientData: Partial<ClientFormData>) => {
  const clientRef = doc(db, CLIENTS_COLLECTION, clientId);
  const updates = {
    ...clientData,
    updatedAt: Timestamp.now(),
  };
  
  await updateDoc(clientRef, updates);
  return { id: clientId, ...updates };
};

export const deleteClient = async (clientId: string) => {
  const clientRef = doc(db, CLIENTS_COLLECTION, clientId);
  await deleteDoc(clientRef);
};

export const getClientsByUserId = async (userId: string) => {
  const clientsRef = collection(db, CLIENTS_COLLECTION);
  const q = query(
    clientsRef,
    where('userId', '==', userId),
    orderBy('createdAt', 'desc')
  );

  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  })) as Client[];
};

export const calculateMonthlyRevenue = (clients: Client[]) => {
  const monthlyData = clients.reduce((acc: { [key: string]: number }, client) => {
    const timestamp = client.createdAt as unknown as Timestamp;
    const date = new Date(timestamp.seconds * 1000);
    const monthYear = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
    
    acc[monthYear] = (acc[monthYear] || 0) + client.amountPaid;
    return acc;
  }, {});

  return monthlyData;
};

export const calculateShares = (amount: number) => {
  return {
    tenPercent: amount * 0.10,
    thirteenPercent: amount * 0.13,
  };
}; 