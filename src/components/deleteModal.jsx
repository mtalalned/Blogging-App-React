import React from 'react'

const DeleteModal = ({onConfirm , onCancel , itemid , index}) => {
  return (
    <div>
    <dialog open className="modal backdrop-blur-sm">
      <div className="modal-box me-5 border border-[#7749f8] min-w-[150px]">
        <h3 className="font-bold text-lg">Are you sure you want to delete this blog?</h3>
        <div className="modal-action">
          <button className="bg-[#7749f8] text-white rounded-lg p-3" onClick={()=> onConfirm(itemid , index)}>Yes, Delete</button>
          <button className="bg-[#7749f8] text-white rounded-lg p-3" onClick={onCancel}>Cancel</button>
        </div>
      </div>
    </dialog>
    </div>
  )
}

export default DeleteModal
