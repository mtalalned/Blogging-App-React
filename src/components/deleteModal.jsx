import React from 'react'

const DeleteModal = ({onConfirm , onCancel , itemid , index}) => {
  return (
    <div>
    <dialog open className="modal">
      <div className="modal-box">
        <h3 className="font-bold text-lg">Are you sure you want to delete this blog?</h3>
        <div className="modal-action">
          <button className="btn" onClick={()=> onConfirm(itemid , index)}>Yes, Delete</button>
          <button className="btn" onClick={onCancel}>Cancel</button>
        </div>
      </div>
    </dialog>
    </div>
  )
}

export default DeleteModal
