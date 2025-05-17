import React, { useContext, useState } from "react";
import { assets } from "../../assets/assets";
import { AdminContext } from "../../Contexts/AdminContext";
import { toast } from "react-toastify";
import axios from "axios";

function AddDoctor() {
    const[docImg,setDocImg]=useState(false)
    const [name,setName]=useState('')
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const [experience,setExperience]=useState('1')
    const [fee,setFee]=useState('')
    const [about,setAbout]=useState('')
    const [Speciality,setSpeciality]=useState('General Physician')
    const [Degree,setDegree]=useState('')
    const [address1,setAddress1]=useState('')
    const [address2,setAddress2]=useState('')
    const {backendurl, aToken} = useContext(AdminContext)

    const onSubmitHandler=async(e)=>{
        e.preventDefault()
        try {
            if(!docImg){
                return toast.error('Image Not Selected')
            }
            const formData=new FormData()
            formData.append('image',docImg);
            formData.append('name',name);
            formData.append('email',email);
            formData.append('password',password);
            formData.append('experience',Number(experience));
            formData.append('fee',Number(fee));
            formData.append('about',about);
            formData.append('speciality',Speciality);
            formData.append('degree',Degree);
            formData.append('address',JSON.stringify({line1:address1,line2:address2}));
            formData.append('date', Date.now());

            console.log('Form data being sent:');
            formData.forEach((value,key)=>{
                console.log(`${key}: ${value}`);
            });

            const {data}=await axios.post(backendurl+'/api/admin/add-doctor',formData,{
                headers:{
                    'atoken': aToken,
                    'Content-Type': 'multipart/form-data'
                }
            });
            
            if(data.success){
                toast.success(data.message);
                // Clear form after successful submission
                setName('');
                setEmail('');
                setPassword('');
                setExperience('1');
                setFee('');
                setAbout('');
                setSpeciality('General Physician');
                setDegree('');
                setAddress1('');
                setAddress2('');
                setDocImg(false);
            }else{
                toast.error(data.message);
            }
        } catch (error) {
            console.error('Error adding doctor:', error);
            if (error.response) {
                console.error('Error response:', error.response.data);
                toast.error(error.response.data.message || 'Error adding doctor');
            } else {
                toast.error('Error adding doctor. Please try again.');
            }
        }
    }
  return (
    <form onSubmit={onSubmitHandler} className="m-5 w-full  ml-10 ">
      <p className="mb-4 text-lg font-medium">Add Doctor</p>
      <div className=" bg-white px-8 py-8 border rounded w-full max-w-4xl max-h-[80vh] overflow-y-scroll  ">
        <div className="flex items-center gap-4 text-gray-500 mb-8" >
          <label htmlFor="doc-img">
            <img className="w-16 bg-gray-100  rounded-full cursor-pointer" src={docImg?URL.createObjectURL(docImg):assets.upload_area} alt="" />
          </label>
          <input onChange={(e)=>setDocImg(e.target.files[0])}  type="file" id="doc-img" hidden />
          <p>
            Upload Doctor <br />
            picture
          </p>
        </div>
        <div className="flex flex-col lg:flex-row items-start text-gray-600 gap-5 " >
          <div className="w-full lg-flex-1 flex flex-col gap-4" >
          <div className="flex-1 flex flex-col gap-2" >
            <p >Doctor name</p>
            <input onChange={(e)=>setName(e.target.value)} value={name}  className="border rounded px-3 py-2" type="text" placeholder="Name" required />
          </div>
          <div className="flex-1 flex flex-col gap-2" >
            <p>Doctor Email</p>
            <input onChange={(e)=>setEmail(e.target.value)} value={email} className="border rounded px-3 py-2"  type="email" placeholder="email" required />
          </div>
          <div className="flex-1 flex flex-col gap-2" >
            <p>Doctor Password</p>
            <input onChange={(e)=>setPassword(e.target.value)} value={password} className="border rounded px-3 py-2"  type="password" placeholder="password" required />
          </div>
          <div className="flex-1 flex flex-col gap-2" >
            <p>Doctor Experience (Years)</p>
            <select onChange={(e)=>setExperience(e.target.value)} value={experience}  className="border rounded px-3 py-2"  name="" id="">
              <option value="1">1 Year</option>
              <option value="2">2 Years</option>
              <option value="3">3 Years</option>
              <option value="4">4 Years</option>
              <option value="5">5 Years</option>
              <option value="6">6 Years</option>
              <option value="7">7 Years</option>
              <option value="8">8 Years</option>
              <option value="9">9 Years</option>
              <option value="10">10 Years</option>
            </select>
          </div>
          <div className="flex-1 flex flex-col gap-2" >
            <p>Doctor Fee</p>
            <input onChange={(e)=>setFee(e.target.value)} value={fee}  className="border rounded px-3 py-2"  type="number" placeholder="Fee" required />
          </div>
          </div>
       
        <div className="w-full lg-flex-1 flex flex-col gap-4">
          <div className="flex-1 flex flex-col gap-2" >
            <p>Speciality</p>
            <select onChange={(e)=>setSpeciality(e.target.value)} value={Speciality}  className="border rounded px-3 py-2"  name="" id="">
              <option value="General Physician">General Physician</option>
              <option value="Gynecologist">Gynecologist</option>
              <option value="Dermatologist">Dermatologist</option>
              <option value="Neurologist">Neurologist</option>
              <option value="Pediatricians">Pediatricians</option>
              <option value="Gastroenterologist">Gastroenterologist</option>
            </select>
          </div>
          <div className="flex-1 flex flex-col gap-2" >
            <p>Education</p>
            <input onChange={(e)=>setDegree(e.target.value)} value={Degree}  className="border rounded px-3 py-2"  type="text" placeholder="education" required />
          </div>
          <div className="flex-1 flex flex-col gap-2" >
            <p>Address</p>
            <input onChange={(e)=>setAddress1(e.target.value)} value={address1}  className="border rounded px-3 py-2"  type="text" placeholder="line 1" required />
            <input onChange={(e)=>setAddress2(e.target.value)} value={address2}  className="border rounded px-3 py-2"  type="text" placeholder="line 2" required />
          </div>
        </div>
        </div>
        <div className="flex-1 flex flex-col gap-2 mt-5 text-gray-600" >
          <p>About Doctor</p>
          <textarea onChange={(e)=>setAbout(e.target.value)} value={about}  className="border rounded px-3 py-2 "
            placeholder="Write about doctor"
            rows={5}
            cols={10}
          ></textarea>
        </div>
        <button className='bg-primary text-sm px-10 py-2 mt-5 rounded-full text-white '>Add Doctor</button>
    </div>
    </form>
  );
}

export default AddDoctor;
