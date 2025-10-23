import React,{useState,useEffect, useRef} from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { setLoading } from '@/app/redux/slices/profileSlice';
import { updateProfilePicture } from '@/services/userService';
const ChangeProfilePicture = () => {
    const {user} = useSelector((state)=>(state.profile));
    const dispatch=useDispatch();
    const [imageFile,setImageFile] = useState(null);
    const [previewSource,setPreviewSource] = useState("");
    const fileInputRef = useRef(null);
    const [loading,setLoading]=useState(false);
    useEffect(() => {
        if(!imageFile) return;
        previewFile(imageFile)
    }, [imageFile]);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if(file) {
            setImageFile(file);
            previewFile(file)
        }
    }
    const previewFile = (file) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onloadend = () => {
        setPreviewSource(reader.result)
      }
    }
    const uploadHandler = async () => {
        if (!imageFile) return;
        const formData = new FormData();
        formData.append("image", imageFile);
        try {
          setLoading(true)
          dispatch(updateProfilePicture(formData))
        } catch (error) {
          console.log("Issue in Changing Picture")
        }finally{
          setLoading(false)
        }
    }

    return (
        <div className='flex flex-col gap-6 justify-center items-center '>

          <div className='flex flex-col lg:flex-row gap-4 items-center justify-around p-10 rounded-md w-2/3'>
            <img 
            className='w-32 h-32 md:w-40 md:h-40 object-cover rounded-full border-4 border-blue-200/60 shadow-lg object-center' 
            width={120} 
            height={120} 
            src={previewSource || user?.image } 
            alt={`${user?.firstName}`} 
            />
            <div className='flex flex-col gap-4 ml-4 border-t lg:border-l lg:border-t-0 border-richblack-400 p-5 pl-10'>
              <p className='text-lg font-semibold font-inter text-center text-blue-400'>Change Profile Picture</p>
              <span className='flex gap-6 mt-5'>
                    <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    ref={fileInputRef}
                    style={{ display: "none" }}
                    />
                    <button 
                    className='px-6 py-1 rounded-md bg-richblack-700 cursor-pointer border-b border-richblack-200'
                    onClick={() => fileInputRef.current.click()}
                    >Select</button>
                    <button 
                    className='cursor-pointer px-6 py-1 rounded-md bg-yellow-300 text-black'
                    onClick={uploadHandler}>
                    {
                      loading ? "Uploading..." : "Upload"
                    }
                    </button>
              </span>
            </div>
          </div>
        </div>
  )
}

export default ChangeProfilePicture