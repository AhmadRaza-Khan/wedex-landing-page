import RegisterForm from "./RegisterForm";

const RegisterFormDialog = () => {

  return (
    <div className="my-2">
      <button className="btn bg-[#fc9432] text-black lg:text-lg md:text-md text-center text-sm mb-2 rounded-md" onClick={() => {
        const modal = document.getElementById('form-modal') as HTMLDialogElement | null;
        modal?.showModal();
      }}>Register Your Interest</button>
      <dialog
        id="form-modal"
        className="modal"
      >
        <div className="modal-box bg-white">
          <RegisterForm />
        </div>
      </dialog>

    </div>
  )
}

export default RegisterFormDialog