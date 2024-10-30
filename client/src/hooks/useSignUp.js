// useSignup.js
import axios from "axios";
import toast from "react-hot-toast";
import { useAuthContext } from "../Context/AuthContext";
import { useState } from "react";




const useSignup = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
  
    const signup = async (userData) => {
      setLoading(true);
      setError(null);
  
      console.log("Sending signup request:", userData); // Debugging
  
      try {
        const response = await fetch("http://localhost:3000/api/auth/signup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(userData),
        });
  
        console.log("Response status:", response.status); // Debugging
  
        const result = await response.json();
        console.log("Response data:", result); // Debugging
  
        if (!response.ok) {
          throw new Error(result.error || "Signup failed");
        }
  
        setLoading(false);
        return result;
      } catch (err) {
        setLoading(false);
        setError(err.message);
        console.error("Error during signup:", err); // Debugging
        throw err;
      }
    };
  
    return { loading, signup, error };
  };
  
  export default useSignup;
  
// const useSignup = () => {
//   const [loading, setLoading] = useState(false);
//   const { setAuthUser } = useAuthContext();

//   const signup = async (inputs) => {
//     const { fullName, username, password, confirmPassword } = inputs;
    
//     const success = handleInputErrors({ fullName, username, password, confirmPassword });
//     if (!success) return;

//     setLoading(true);
//     try {
//       const { data } = await axios.post("http://localhost:3000/api/auth/signup", inputs);
      
//       localStorage.setItem("chat-user", JSON.stringify(data));
//       setAuthUser(data);
//       toast.success("Signup successful!");
//     } catch (error) {
//       toast.error(error.response?.data?.error || "Signup failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return { loading, signup };
// };

// export default useSignup;

// // Validation function
// function handleInputErrors({ fullName, username, password, confirmPassword }) {
//   if (!fullName || !username || !password || !confirmPassword ) {
//     toast.error("Please fill in all fields");
//     return false;
//   }

//   if (password !== confirmPassword) {
//     toast.error("Passwords do not match");
//     return false;
//   }

//   if (password.length < 6) {
//     toast.error("Password must be at least 6 characters");
//     return false;
//   }

//   return true;
// }
