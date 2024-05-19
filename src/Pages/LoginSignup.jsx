import React, { useState } from 'react';
import './CSS/LoginSignup.css';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../firebase/Firebase';
import { Timestamp, addDoc, collection } from 'firebase/firestore';
import { toast } from 'react-toastify';

const LoginSignup = () => {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [agreed, setAgreed] = useState(false);

  const signup = async () => {
    setLoading(true);
    if (name === "" || email === "" || password === "") {
      toast.error("All fields are required");
      setLoading(false);
      return;
    }

    if (!agreed) {
      toast.error("You must agree to the terms of use & privacy policy");
      setLoading(false);
      return;
    }

    try {
      const users = await createUserWithEmailAndPassword(auth, email, password);

      const user = {
        name: name,
        uid: users.user.uid,
        email: users.user.email,
        time: Timestamp.now()
      };
      const userRef = collection(db, "users");
      await addDoc(userRef, user);
      toast.success("Signup Successfully");
      setLoading(false);
      setName("");
      setEmail("");
      setPassword("");
      setAgreed(false);

    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error("Signup Failed");
    }
  };

  return (
    <div className='loginsignup'>
      <div className="loginsignup-container">
        <h1>Sign Up</h1>
        <div className="loginsignup-fields">
          <input value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder='Your Name' />
          <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder='Email Address' />
          <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder='Password' />
        </div>
        
        <button onClick={signup}>
          {loading ? <span>Loading...</span> : <span>Sign Up</span>}
        </button>

        <p className="loginsignup-login">Already have an account? <span>Login Here</span></p>
        <div className="loginsignup-agree">
          <input type="checkbox" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} />
          <p>By continuing, I agree to the terms of use & privacy policy</p>
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;
