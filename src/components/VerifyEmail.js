import { sendEmailVerification } from "firebase/auth";
import { auth } from "./firebase";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function VerifyEmail() {
  const navigate = useNavigate();
  const user = auth.currentUser;
                    

  async function handleResend() {
    try {
      await sendEmailVerification(user);
      toast.success("Verification email resent!");
    } catch (error) {
      toast.error(error.message);
    }
  }

  const handleLogout = async () => {
    await auth.signOut();
    navigate("/login");
  };

  return (
    <div className="container mt-5">
      <div className="card p-4" style={{ maxWidth: "500px", margin: "0 auto" }}>
        <h2 className="text-center mb-4">Verify Your Email</h2>
        <p>
          We've sent a verification link to <strong>{user?.email}</strong>.
          Please check your inbox and click the link to verify your account.
        </p>
        <div className="d-grid gap-2">
          <button onClick={handleResend} className="btn btn-primary">
            Resend Verification Email
          </button>
          <button onClick={handleLogout} className="btn btn-outline-secondary">
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default VerifyEmail;