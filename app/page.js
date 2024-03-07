"use client";
import { db } from "./firebaseConfig";
import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import React, { useState, useEffect } from "react";
import { getDoc } from "firebase/firestore";
import Link from "next/link";

export default function Home() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    fetchData();
  }, [messages]);

  const fetchData = async () => {
    console.log("Fetching data...");
    try {
      const querySnapshot = await getDocs(collection(db, "messages"));
      console.log("Query snapshot:", querySnapshot);
      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      console.log("Data:", data);
      setMessages(data);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  async function addDatatoFirestore(name, email, message) {
    try {
      const docRef = await addDoc(collection(db, "messages"), {
        name: name,
        email: email,
        message: message,
      });
      console.log("id", docRef.id);
      return true;
    } catch (error) {
      console.log("error", error);
      return false;
    }
  }

  const handlerSubmit = async (e) => {
    e.preventDefault();
    const added = await addDatatoFirestore(name, email, message);
    if (added) {
      setName("");
      setEmail("");
      setMessage("");
      alert("Data Got Stored");
    } else {
      alert("Nothing");
    }
  };

  const deleteData = async (documentId) => {
    try {
      const docRef = doc(db, "messages", documentId);
      await deleteDoc(docRef);
      console.log("Document successfully deleted!");
    } catch (error) {
      console.error("Error deleting document: ", error);
    }
  };

  const updateData = async (documentId, newData) => {
    try {
      const docRef = doc(db, "messages", documentId);
      const docSnapshot = await getDoc(docRef);

      if (docSnapshot.exists()) {
        const data = { id: docSnapshot.id, ...docSnapshot.data() };
        console.log("Document data:", data);

        // Update the data here
        const updatedData = { ...data, message: "Updated message" }; // Modify this line according to your update logic
        await updateDoc(docRef, updatedData);

        // Fetch data again to update the state
        fetchData();
      } else {
        console.log("No such document!");
      }
    } catch (error) {
      console.error("Error fetching document: ", error);
    }
  };

  return (
    <>
      <h1>Add data To Database</h1>
      <form onSubmit={handlerSubmit}>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          name="name"
          id=""
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label htmlFor="email">Email</label>
        <input
          type="text"
          name="email"
          id=""
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="message">message</label>
        <input
          type="text"
          name="message"
          id=""
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button type="submit">SUBMIT</button>
      </form>

      <h1>Fetched Data</h1>
      <ul>
        {messages.map((m) => (
          <li key={m.id}>
            <strong>Name:</strong> {m.name}, <strong>Email:</strong> {m.email},{" "}
            <strong>Message:</strong> {m.message}
            <button
              style={{ marginLeft: 20 }}
              onClick={() => deleteData(m.id)}
            >
              Delete
            </button>
            <button
              style={{ marginLeft: 20 }}
              onClick={() => updateData(m.id)}
            >
              Update
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}
