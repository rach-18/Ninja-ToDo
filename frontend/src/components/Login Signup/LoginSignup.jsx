import { DotLottiePlayer, Controls } from "@dotlottie/react-player";
import "@dotlottie/react-player/dist/index.css";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { useState } from "react";
import { auth } from "../../firebase";
import { Link } from "react-router-dom";

function LoginSignup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("User registered successfully!");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("signup");

  const provider = new GoogleAuthProvider();

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);
    setStatus("loading");

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      console.log("User Created: ", user);

      setSuccess("User registered successfully!");
      setStatus("success");
    } catch (err) {
      console.log("Error while signing up: ", err.message);
      setError(err.message);
      setStatus("fail");
    }

    setLoading(false);
  }

  async function handleGoogleSignIn() {
    setError("");
    setSuccess("");
    setLoading(true);
    setStatus("loading");

    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log("Google Sign-In Successful: ", user);

      setSuccess("Google Sign-In Successful!");
      setStatus("success");
    } catch (err) {
      console.error("Error during Google Sign-In: ", err.message);
      setError(err.message);
      setStatus("fail");
    }

    setLoading(false);
  }

  return (
    <div className="h-screen bg-white flex items-center">
      <div className="bg-[#F9FAFC] flex items-center h-5/6 w-11/12 mx-auto border-2 border-purple-600 rounded-xl purple-shadow">
        {status === "signup" && (
          <>
            <div className="w-1/2 h-full flex flex-col items-center justify-between bg-purple-300/30 py-10 rounded-l-xl">
              <p className="font-bold text-3xl">Hello there!</p>
              <iframe
                className="w-[20rem] h-[20rem] border-2 border-purple-600 rounded-full bg-white"
                src="https://lottie.host/embed/b70d3fb6-8580-400e-a496-bd6703e08c6c/qP02g4DfkT.lottie"
              ></iframe>
              <p className="font-semibold text-xl">
                Please sign up to get started with your Ninja Tasks!
              </p>
            </div>
            {/* <form
              onSubmit={handleSubmit}
              className="w-1/2 h-full flex flex-col gap-4 items-center justify-center py-10"
            >
              <input
                type="text"
                name="name"
                placeholder="Enter your name..."
                className="w-5/6 px-5 py-4 border-2 border-purple-600 purple-shadow rounded-lg"
                onChange={(e) => setName(e.target.value)}
                value={name}
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Enter your email..."
                className="w-5/6 px-5 py-4 border-2 border-purple-600 purple-shadow rounded-lg"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                required
              />
              <input
                type="password"
                name="password"
                placeholder="Enter your password..."
                className="w-5/6 px-5 py-4 border-2 border-purple-600 purple-shadow rounded-lg"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                required
              />
              <button
                className="mt-5 bg-purple-600 rounded-full font-semibold px-5 py-3 border-2 border-purple-600 text-white hover:text-purple-600 hover:bg-white hover:scale-105 transition-all"
                type="submit"
              >
                Sign Up
              </button>
            </form> */}
            <div className="flex items-center justify-center w-1/2">
              <button
                className="mt-5 bg-blue-600 rounded-full font-semibold px-5 py-3 border-2 border-blue-600 text-white hover:text-blue-600 hover:bg-white hover:scale-105 transition-all"
                type="button"
                onClick={handleGoogleSignIn}
              >
                Sign Up with Google
              </button>
            </div>
          </>
        )}
        {status === "loading" && (
          <div className="w-full flex flex-col items-center justify-center">
            <iframe src="https://lottie.host/embed/5bd7b4e4-cb21-4486-9a7d-78453b23e965/pTJ15Kw3d2.lottie"></iframe>
            <p>Please wait till we sign you up..</p>
          </div>
        )}
        {status === "success" && (
          <div className="w-full flex flex-col items-center justify-center relative">
            <iframe
              className="absolute top-0 left-0 w-full h-full"
              src="https://lottie.host/embed/35a84f2d-30be-45b9-893a-9a0d0b98c3dc/zUnpxKFuk4.lottie"
            ></iframe>
            <iframe
              className="h-1/2"
              src="https://lottie.host/embed/a2ce4abb-c131-47af-9198-b91a08fce1df/uS1i8jb9Yz.lottie"
            ></iframe>
            <p>Congratulations! You have been successfully signed up!</p>
            <Link
              className="bg-purple-300 text-white px-4 py-2 rounded-full mt-2 z-10"
              to="/general-tasks"
            >
              Start getting Sh*t done
            </Link>
          </div>
        )}
        {status === "fail" && (
          <div className="w-full flex flex-col items-center justify-center">
            <iframe
              className="h-1/2"
              src="https://lottie.host/embed/1bf11e53-9198-4ab1-be0b-6ea1616717ee/8xMJm9AiIS.lottie"
            ></iframe>
            <p>Oops! There was an error in the signup!</p>
            <Link
              className="bg-red-300 text-white px-4 py-2 rounded-full mt-2"
              to="/login-signup"
            >
              Try Again
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default LoginSignup;
