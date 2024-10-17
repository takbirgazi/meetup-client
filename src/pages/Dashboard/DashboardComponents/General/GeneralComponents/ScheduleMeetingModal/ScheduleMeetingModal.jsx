import React from 'react';
import { useForm } from 'react-hook-form';

const ScheduleMeetingModal = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = (data) => {
        console.log(data); // Handle the submitted meeting data
    };

    return (
        <>
            <input className="modal-state" id="modal-2" type="checkbox" />
            <div className="modal w-screen">
                <label className="modal-overlay" htmlFor="modal-2"></label>
                <div className="modal-content min-h-72 flex flex-col gap-5 max-w-3xl bg-gradient-to-r from-gray-600 to-gray-700 text-gray-300 rounded-lg p-12">
                    <div className="flex flex-col min-h-60 justify-center relative">
                        <label
                            htmlFor="modal-2"
                            className="btn btn-sm rounded-2xl btn-ghost absolute right-0 -top-6"
                        >
                            ✕
                        </label>
                        <h1 className="md:text-3xl text-2xl text-center font-semibold">
                            Schedule Meeting for Later
                        </h1>
                        <form
                            onSubmit={handleSubmit(onSubmit)}
                            className="flex flex-col gap-3"
                        >
                            <div className="text-center my-6">
                                <input
                                    id="date"
                                    type="datetime-local"
                                    className="input text-black bg-white border border-gray-300 rounded p-2 w-full"
                                    {...register("date", { required: true })}
                                />
                                {errors.date && (
                                    <p className="text-red-500">This field is required</p>
                                )}
                            </div>
                            <div className="flex gap-3">
                                <button
                                    type="submit"
                                    className="btn btn-error btn-block bg-[#1e3799] text-white"
                                >
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ScheduleMeetingModal;
