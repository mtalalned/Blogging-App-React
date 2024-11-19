import React from 'react'

const ErrorFetchingData = () => {
  return (
    <div>
    <dialog open className="modal backdrop-blur-sm">
      <div className="modal-box me-5 border border-[#7749f8] min-w-[150px]">
        <h3 className="font-bold text-lg">Error in fetching data, Check your Interner Connection !</h3>
        <div className="modal-action">
          <button className="bg-[#7749f8] text-white rounded-lg p-3">Cancel</button>
        </div>
      </div>
    </dialog>
    </div>
  )
}

export default ErrorFetchingData
