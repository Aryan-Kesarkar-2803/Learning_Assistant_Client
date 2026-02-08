import React, { use, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, redirect, useNavigate } from "react-router-dom";


const RegisterPage = () => {
  const navigate = useNavigate();
  const [registerType, setRegisterType] = useState("user"); // user | vendor | venue
  const [showPassword, setShowPassword] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [passwordForUser, setPasswordForUser] = useState("")
  const [passwordForVendor, setPasswordForVendor] = useState("")
  const [passwordForVenue, setPasswordForVenue] = useState("")
  const [emailForUser, setEmailForUser] = useState("");
  const [emailForVendor, setEmailForVendor] = useState("");
  const [emailForVenue, setEmailForVenue] = useState("");
  const [loading, setLoading] = useState(false);

  // Email validation
  const isValidEmail = (email) => {
    const emailRegex = /^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,6}$/;
    return emailRegex.test(email);
  };

  // Password validation
  const isStrongPassword = (pass) => {
    const passwordRegex =
      /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=!]).{8,}$/;
    return passwordRegex.test(pass);
  };

//   const handleRegisterUser = async(e) => {
//     e.preventDefault();

//     if (!isValidEmail(emailForUser)) {
//       alertNotification({message:'Please enter a valid email'})
//       return;
//     }

//     if(!isStrongPassword(passwordForUser)){
//       alertNotification({message:'Please enter strong password'});
//       return;
//     }
//     setLoading(true);

//     const response = await registerUser({
//       email: emailForUser.trim(),
//       password: passwordForUser.trim()
//     })
//     if(response == false){
//       setLoading(false)
//       return;
//     }
//     if(response.status == 201){
//        successNotification({message:response?.message});
//        setEmailForUser('');
//        setPasswordForUser('');
//        navigate("/login")
//     }else{
//       errorNotification({message:response?.message})
//     }
//     setLoading(false)
//   };

//   const handleRegisterVendor = async(e) => {
//     e.preventDefault();

//     if (!isValidEmail(emailForVendor)) {
//       alertNotification({message:'Please enter a valid email'})
//       return;
//     }

//      if(!isStrongPassword(passwordForVendor)){
//       alertNotification({message:'Please enter strong password'});
//       return;
//     }
//     setLoading(true);
//     const response = await registerVendor({
//       email: emailForVendor.trim(),
//       password: passwordForVendor.trim()
//     })

//     if(response == false){
//       setLoading(false)
//       return;
//     }

//     if(response.status == 201){
//        setEmailForVendor('');
//        setPasswordForVendor('')
//        successNotification({message:response?.message});
//        navigate("/login")
//     }else{
//       errorNotification({message:response?.message})
//     }
//     setLoading(false)
//   }
//   const handleRegisterVenue = async(e) => {
    
//     e.preventDefault();

//     if (!isValidEmail(emailForVenue)) {
//       alertNotification({message:'Please enter a valid email'})
//       return;
//     }

//      if(!isStrongPassword(passwordForVenue)){
//       alertNotification({message:'Please enter strong password'});
//       return;
//     }
//     setLoading(true);
//     const response = await registerVenue({
//       email: emailForVenue.trim(),
//       password: passwordForVenue.trim()
//     })

//     if(response == false){
//       setLoading(false)
//       return;
//     }

//     if(response.status == 201){
//        setEmailForVenue('');
//        setPasswordForVenue('');
//        successNotification({message:response?.message});
//        navigate("/login")
//     }else{
//       errorNotification({message:response?.message})
//     }
//     setLoading(false)
//   }

  const handleChangeEmailForUser = (e) =>{
        setEmailForUser(e.target.value)
  }
  const handleChangeEmailForVenue = (e) =>{
        setEmailForVenue(e.target.value)
  }
  const handlePasswordChangeForUser = (e) =>{
        setPasswordForUser(e.target.value)
  }
  const handlePasswordChangeForVenue = (e) =>{
        setPasswordForVenue(e.target.value)
  }
  const handleChangeEmailForVendor = (e)=>{
        setEmailForVendor(e.target.value)
  }
  const handlePasswordChangeForVendor =(e) =>{
        setPasswordForVendor(e.target.value);
  }

  return (
    <>
    {
      loading ?
    //   <Loader texts={["...processing","...this may take some time"]}/>:
    <div></div>
    :
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-50 to-yellow-100 px-4">
      <div className="bg-white shadow-lg rounded-2xl w-full max-w-md p-8">

        {/* Heading */}
        <h2 className="text-2xl font-bold text-indigo-900 text-center mb-6">
          Create User Account
        </h2>

        {/* Form */}
      
        
        {/* User Register */}
        <form className="space-y-5" 
        // onSubmit={handleRegisterUser}
        >
          {/* Email with OTP */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Email</label>
            <div className="flex gap-2">
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={emailForUser}
                className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-yellow-400 outline-none"
                onChange={handleChangeEmailForUser}
                required
              />
            </div>
          </div>

          {/* OTP Field */}
          {/* {otpSent && (
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Enter OTP
              </label>
              <input
                type="text"
                placeholder="Enter the OTP"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-yellow-400 outline-none"
                required
              />
            </div>
          )} */}

          {/* Password */}
          <div className="relative">
            <label className="block text-gray-700 font-medium mb-1">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={passwordForUser}
              onChange={handlePasswordChangeForUser}
              placeholder="Create a password"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-yellow-400 outline-none"
              required
            />
            <button
              type="button"
              className="absolute right-3 top-10 text-gray-500"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
            <p
              className={`mt-2 text-sm ${
                isStrongPassword(passwordForUser) ? "text-green-600" : "text-red-600"
              }`}
            >
              {passwordForUser.length > 0 ? (
                isStrongPassword(passwordForUser) ? (
                    "Strong password ✅"
                ) : (
                    "Weak password ❌ Must contain 8+ chars, uppercase, lowercase, number & special char"
                )
                ) : null}
            </p>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-yellow-400 text-indigo-900 py-2 rounded-lg font-semibold hover:bg-yellow-300 transition"
          >
            Register
          </button>
        </form>

        
       

        {/* Footer */}
        <p className="text-sm text-gray-600 mt-6 text-center">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-yellow-500 font-semibold hover:underline"
          >
            Login here
          </Link>
        </p>
      </div>
    </div>
    }
    </>
  );
};

export default RegisterPage;
