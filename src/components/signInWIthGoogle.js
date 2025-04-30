import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth, db } from "./firebase";
import { toast } from "react-toastify";
import { doc, setDoc } from "firebase/firestore";

function SignInwithGoogle() {
  async function googleLogin() {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      
      // Split displayName into first and last name
      const names = user.displayName ? user.displayName.split(' ') : ['', ''];
      const firstName = names[0] || '';
      const lastName = names.length > 1 ? names.slice(1).join(' ') : '';
      
      await setDoc(doc(db, "Users", user.uid), {
        email: user.email,
        firstName: firstName,
        lastName: lastName,
        photo: user.photoURL,
        emailVerified: true, // Google sign-ins are automatically verified
        createdAt: new Date(),
      });
      
      toast.success("User logged in Successfully", {
        position: "top-center",
      });
      window.location.href = "/profile";
    } catch (error) {
      toast.error(error.message, {
        position: "bottom-center",
      });
    }
  }

  return (
    <div>
      <p className="continue-p">--Or continue with--</p>
      <div
        style={{ display: "flex", justifyContent: "center", cursor: "pointer" }}
        onClick={googleLogin}
      >
        <img src={require("../google.png")} width={"60%"} alt="Google sign-in" />
      </div>
    </div>
  );
}

export default SignInwithGoogle;