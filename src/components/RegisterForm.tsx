import React, { useState } from 'react'
import apiRequestHandler from '../services/httpClient.service'
import type { IRegisterFormErrors } from "../types/register-form"
import { useToast } from '../context/ToastContext'
const RegisterForm = () => {
  const [form, setForm] = useState({ name: '', email: '', phone: '' })
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<IRegisterFormErrors>({});
  const showToast = useToast();

  const validate = () => {
    const newErrors: IRegisterFormErrors = {};

    if (!form.name) newErrors.name = "Name is required";
    if (!form.phone) newErrors.phone = "Phone number is required";
    if (!form.email) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) newErrors.email = "Invalid email";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleClose = () => {
    const modal = document.getElementById('form-modal') as HTMLDialogElement | null;
    modal?.close();
    setForm({ name: "", email: "", phone: "" });
    setErrors({});
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsLoading(true);
    setErrors({});

    if (!validate()) {
      setIsLoading(false);
      return;
    }

    try {
      const res = await apiRequestHandler({
        name: form.name,
        email: form.email,
        phone: form.phone,
      });
      if (res.success) {
        showToast("Registration Successful!", "success");
        setForm({ name: "", email: "", phone: "" });
        handleClose()
      } else {
        const errorMsg =
          typeof res.data === "string"
            ? res.data
            : res.data?.message || "Something went wrong!";
        showToast(errorMsg, "error");
      }
    } catch (err) {
      showToast("Unexpected error occurred.", "error");
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <div className="modal-action flex flex-col mt-0" >
      <button
        type="button"
        onClick={handleClose}
        className="absolute top-3 right-3 text-gray-400 hover:text-gray-700"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
      <h3 className='text-center lg:text-2xl md:text-xl text-lg md:mt-0.5 text-black lg:mt-1'>Register Your Interest</h3>
      <form onSubmit={handleSubmit} className='dialog flex flex-col gap-1 md:gap-1.5 lg:gap-2'>

        {/* Name */}
        <fieldset className="fieldset">
          <legend className="fieldset-legend text-black p-0">Name</legend>
          <input
            type="text"
            className="input w-full border-1 rounded py-2 px-2 bg-white text-black border-gray-500 focus:border-2 focus:ring-gray-700"
            placeholder="Type your name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          {errors.name && <p className='text-red-500'>{errors.name}</p>}
        </fieldset>

        {/* Email */}
        <fieldset className="fieldset">
          <legend className="fieldset-legend text-black p-0">Email</legend>
          <input
            type="text"
            className="input w-full border-1 rounded py-2 px-2 bg-white text-black border-gray-500 focus:border-2 focus:ring-gray-700"
            placeholder="Type your email address"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          {errors.email && <p className='text-red-500'>{errors.email}</p>}
        </fieldset>

        {/* phoone */}
        <fieldset className="fieldset">
          <legend className="fieldset-legend text-black p-0">Phone Number</legend>
          <input
            type="text"
            className="input w-full border-1 rounded bg-white text-black py-2 px-2 border-gray-500 focus:border-2 focus:ring-gray-700"
            placeholder="Type your phone number"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
          />
          {errors.phone && <p className='text-red-500'>{errors.phone}</p>}
        </fieldset>

        {/* Submit Button */}
        <div className="mt-2">
          <span className="block w-full rounded-md shadow-sm">
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-black bg-[#fc9432] cursor-pointer"
            >
              {isLoading ? (
                <span className="flex justify-center items-center gap-2">
                  <svg className="w-4 h-4 animate-spin" viewBox="0 0 16 16">
                    <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="2" fill="none" />
                  </svg>
                  Registering...
                </span>
              ) : 'Register'}
            </button>
          </span>
        </div>
      </form>
    </div>
  )
}

export default RegisterForm