import { useDispatch, useSelector } from "react-redux";
import { verification } from "../../store/userslice";
import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

const Verification = () => {
  const dispatch = useDispatch();
  const { userId, token } = useParams();
  const { loading, isVerified } = useSelector((state) => state.user);

  useEffect(() => {
    const obj = {
      userId,
      token
    };
    dispatch(verification(obj));
  }, [dispatch, userId, token]);

  return (
    <div className="w-full absolute top-0 left-0 z-30 min-h-screen flex flex-col justify-center items-center bg-gray-100">
      {loading ? (
        <>
          <FaCheckCircle className="text-green-500 text-9xl mb-4" />
          <h1 className="text-3xl font-semibold text-gray-800 mb-2">Verifying Your Account</h1>
          <p className="text-lg text-gray-600">Please wait while we verify your account...</p>
        </>
      ) : isVerified ? (
        <>
          <FaCheckCircle className="text-green-500 text-9xl mb-4" />
          <h1 className="text-3xl font-semibold text-gray-800 mb-2">Account Verified Successfully</h1>
          <p className="text-lg text-gray-600">Your account has been successfully verified.</p>
          <Link to="/" className="mt-4 text-blue-500 hover:underline">Go to Home Page</Link>
        </>
      ) : (
        <>
          <FaTimesCircle className="text-red-500 text-9xl mb-4" />
          <h1 className="text-3xl font-semibold text-gray-800 mb-2">Verification Failed</h1>
          <p className="text-lg text-gray-600">There was an issue verifying your account. Please try again.</p>
          <Link to="/" className="mt-4 text-blue-500 hover:underline">Go to Home Page</Link>
        </>
      )}
    </div>
  );
}

export default Verification;
