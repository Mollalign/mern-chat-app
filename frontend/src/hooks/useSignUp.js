import { useState } from "react"
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

const useSignUp = () => {
  const [loading, setLoading] = useState(false);
  const {authUser, setAuthUser} = useAuthContext();

  const signUp = async ({fullName, username, password, confirmPassword, gender}) => {
    const success = handleInputError({fullName, username, password, confirmPassword, gender});
    if(!success) return;
    
    setLoading(true);
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullName, username, password, confirmPassword, gender })
      });

      const data = await res.json();
      console.log(data);

      if (!res.ok) {
        toast.error(data.error || "Something went wrong");
        return;
      }

      toast.success("Signup successful!");

      // local storage
      localStorage.setItem("chat-user", JSON.stringify(data));
      setAuthUser(data);

    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }

  return { loading, setLoading, signUp }
};

export default useSignUp;

function handleInputError({fullName, username, password, confirmPassword, gender}) {
  if(!fullName || !username || !password || !confirmPassword || !gender) {
    toast.error("Please fill in all fields");
    return false;
  }

  if (password !== confirmPassword) {
    toast.error('Passwords do not match');
    return false;
  }

  if(password.length < 6) {
    toast.error('Password must be at least 6 characters');
    return false;
  }

  return true;
}
