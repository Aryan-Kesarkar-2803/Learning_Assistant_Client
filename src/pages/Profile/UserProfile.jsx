import React, { useEffect, useState } from "react";
import {successNotification,alertNotification,errorNotification} from '../../utils/toast'
// import { uploadSingleImage } from "../../utils/cloudinary";
import { isNumber } from "../../utils/others";
import { getUserProfile, updateUserProfile } from "../../utils/repository/user";
import { useAtom } from "jotai";
// import { userAtom } from "../../store/user";
import Loader from "../../components/globalComponents/Loader";
import { CircularProgress } from "@mui/material";
import SelectBox from "../../components/globalComponents/SelectBox";
import ImagePopup from "../../components/globalComponents/ImagePopup.jsx";
import { authUserAtom } from "../../store/other";

const UserProfile = () => {
  const [authUser, setAuthUser] = useAtom(authUserAtom)
//   const [user, setUser] = useAtom(userAtom);
const user = {};
  const [loading, setLoading] = useState(false);
  const [loadingForSave, setLoadingForSave] = useState(false)
  const [openImagePopup, setOpenImagePopup] = useState(false)
  const [activeImageSrc, setActiveImageSrc] = useState('')
  const [userProfile, setUserProfile] = useState({
    fullName: "",
    phoneNo: "",
    gender: "",
    profileImageData: {
      url:"",
      publicId:"",
    },
    email:"",
    file:null,
  });

  const handleChange = (e) => {
    setUserProfile({ ...userProfile, [e.target.name]: e.target.value });
  };



  const handleImageUpload = async(e) => {
    
    // const res = await uploadSingleImage(e);

    // if(res == false) return;

    // if(res == null){
    //    setUserProfile( prev => ({
    //   ...prev,
    //   profileImageData:{}
    // }))
    //   return;
    // }

    // setUserProfile(prev => ({
    //   ...prev,
    //   profileImageData:{
    //     ...prev?.profileImageData,
    //     url: res?.secure_url || '',
    //     publicId: res?.public_id || ''
    //   }
    // }))

    const file = e.target.files[0];

    if(file?.size > 1 * 1024 * 1024){
      errorNotification({message:'file size must be less than 1mb'});
      return;
    }

    setUserProfile(prev => ({
      ...prev,
      profileImageData: file
    }))

    // successNotification({message:'Image uploaded successfully'});
  };

  const clearImage = () => {

    if(userProfile?.file !== null){
       setUserProfile(prev => ({
        ...prev,
        file:null
      }))
    }else{
           setUserProfile(prev => ({
        ...prev,
        profileImageData:{
          ...prev.profileImageData,
          url:'',
        }
      }))
    }
  };
  const handleChangeProfileName = (e) => {
    setUserProfile(prev => ({
      ...prev,
      fullName: e.target.value,
    }))
  }
 const handleChangePhoneNo = (e) => {
  const value = e.target.value
  if (isNumber(value) && value?.length <= 10) {
    setUserProfile(prev => ({
      ...prev,
      phoneNo: value,
    }))
  }
}
const handleChangeImageData = (e) =>{
  const file = e.target.files[0];
  if(file?.size > 3 * 1024 * 1024){
    errorNotification({message: 'file size must be less than 3 mb'});
    return;
  }
  setUserProfile(prev => ({
    ...prev,
    file:file
  }))
}
const handleChangeGender = (e) =>{
  const value = e.target.value;
  setUserProfile(prev => ({
    ...prev,
    gender:value
  }))
}



  const handleSubmit = async(e) => {
    setLoadingForSave(true)
    e.preventDefault();
    if(userProfile?.phoneNo !== "" && userProfile?.phoneNo?.length !== 10){
      errorNotification({message:"please enter valid phone no"})
      setLoadingForSave(false)
      return;
    }

    let formData = new FormData();
    if(userProfile?.file !== null){
      formData.append('file',userProfile?.file || null);
    }
    
    formData.append('userProfile',JSON.stringify({
      fullName: userProfile?.fullName,
      gender: userProfile.gender,
      phoneNo: userProfile?.phoneNo,
      profileImageData: userProfile.profileImageData
    }))

    const res = await updateUserProfile(formData);
    if(!res){
      setLoadingForSave(false)
      return;
    }

    const data = res?.data || {};
    setUserProfile(prev => ({
      ...prev,
      fullName: data?.fullName || '',
      gender: data?.gender || '',
      profileImageData: {
        ...prev.profileImageData,
        url: data?.profileImageData?.url || '',
        publicId: data?.profileImageData?.publicId || ''
      },
      phoneNo: data?.phoneNo,
      file:null
    }))
    // setting name in authUser too

     setAuthUser(prev => ({
    ...prev,
    userDetails:{
      ...prev?.userDetails,
      name: data?.fullName || '',
    }
  }))

    successNotification({message: res?.message || ''})
    setLoadingForSave(false)
  };

  useEffect(()=>{
    
    // fetching the user' profile updated one normally
    
    const fetchUserProfile = async() =>{
      setLoading(true);
      const response = await getUserProfile();
      if(!response){
        setLoading(false);
        return;
      }
      
      const data = response?.data || {};

      setUserProfile(prev => ({
        ...prev,
        file:null,
        fullName: data?.fullName || "",
        gender: data?.gender || "",
        phoneNo: data?.phoneNo || "",
        profileImageData:{
          ...prev.profileImageData,
          publicId: data?.profileImageData?.publicId || "",
          url: data?.profileImageData?.url || ""
        },
      }))
      
      setLoading(false)
    }

    if(authUser?.token  && authUser?.token !== '' && authUser?.role == 'user'){
       fetchUserProfile();
    }
   
  },[])

  return (

<div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 via-white to-gray-200 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 p-6 transition-colors duration-300">

  {/* Loader */}
  {(loading || loadingForSave) ? (
    <Loader
      texts={
        loadingForSave
          ? ["Saving profile...", "Please wait..."]
          : ["Fetching User Profile...", "Loading..."]
      }
    />
  ) : (

    <form
      onSubmit={handleSubmit}
      className="w-full max-w-5xl rounded-3xl bg-white/80 dark:bg-gray-900/70 backdrop-blur-xl border border-gray-200 dark:border-gray-800 shadow-2xl p-8 md:p-10 transition-all duration-300"
    >

      {/* Header */}
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white">
          User Profile
        </h2>
        <p className="text-gray-500 dark:text-gray-400 mt-2">
          Manage your personal details
        </p>
      </div>

      {/* Profile Image */}
      <div className="flex flex-col items-center mb-10">

        {(userProfile?.profileImageData?.url?.length > 0 || userProfile?.file !== null) ? (
          <div className="relative group">

            <img
              onClick={() => {
                setActiveImageSrc(
                  userProfile?.file !== null
                    ? URL.createObjectURL(userProfile?.file)
                    : userProfile?.profileImageData?.url
                );
                setOpenImagePopup(true);
              }}
              src={
                userProfile?.file !== null
                  ? URL.createObjectURL(userProfile?.file)
                  : userProfile?.profileImageData?.url
              }
              alt="profile"
              className="w-32 h-32 rounded-full object-cover border-4 border-indigo-500 dark:border-indigo-400 shadow-lg cursor-pointer group-hover:scale-105 transition-transform duration-300"
            />

            <button
              type="button"
              onClick={clearImage}
              className="absolute -bottom-3 left-1/2 -translate-x-1/2 px-3 py-1 text-xs rounded-full bg-red-500 text-white hover:bg-red-600 transition"
            >
              Remove
            </button>

          </div>
        ) : (
          <div className="w-32 h-32 flex items-center justify-center rounded-full bg-gray-200 dark:bg-gray-800 text-gray-500 dark:text-gray-400 border border-gray-300 dark:border-gray-700">
            No Image
          </div>
        )}

        <input
          type="file"
          accept="image/*"
          onChange={handleChangeImageData}
          className="mt-4 text-sm text-gray-600 dark:text-gray-300 file:mr-3 file:px-4 file:py-1.5 file:rounded-lg file:border-0 file:bg-indigo-100 file:text-indigo-700 dark:file:bg-indigo-900/40 dark:file:text-indigo-300 hover:file:opacity-90 transition"
        />
      </div>

      {/* Form Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">

        <div>
          <label className="text-sm font-medium text-gray-600 dark:text-gray-300">
            Full Name
          </label>
          <input
            type="text"
            name="fullName"
            value={userProfile.fullName}
            onChange={handleChangeProfileName}
            className="mt-2 w-full p-3 rounded-xl bg-white dark:bg-gray-950 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-gray-600 dark:text-gray-300">
            Phone Number
          </label>
          <input
            type="text"
            name="phoneNo"
            value={userProfile.phoneNo}
            onChange={handleChangePhoneNo}
            className="mt-2 w-full p-3 rounded-xl bg-white dark:bg-gray-950 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-gray-600 dark:text-gray-300">
            Gender
          </label>
          <div className="mt-2">
            <SelectBox
              value={userProfile.gender}
              onChange={handleChangeGender}
              options={['Male', 'Female']}
            />
          </div>
        </div>

        <div>
          <label className="text-sm font-medium text-gray-600 dark:text-gray-300">
            Email
          </label>
          <input
            disabled
            value={authUser?.userDetails?.email || ''}
            className="mt-2 w-full p-3 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 border border-gray-200 dark:border-gray-700 cursor-not-allowed"
          />
        </div>

      </div>

      {/* Save Button */}
      <div className="flex justify-center">
        <button
          type="submit"
          className="px-10 py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-semibold hover:scale-105 transition-all duration-300 shadow-lg"
        >
          {loadingForSave ? (
            <CircularProgress size={20} color="inherit" />
          ) : (
            "Save"
          )}
        </button>
      </div>

    </form>
  )}

  <ImagePopup
    open={openImagePopup}
    onClose={() => setOpenImagePopup(false)}
    src={activeImageSrc}
  />

</div>

  );
};

export default UserProfile;