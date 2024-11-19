import React, { useRef } from 'react'

const UpdateBlog = ({onUpdate , upDateCancel , itemid , index}) => {
  
    const title = useRef()
    const blog = useRef()
  
  
  
    return (
    <div>
    <dialog open className="modal backdrop-blur-sm me-10">
      <div className="modal-box flex flex-col me-5 min-w-[150px]">
        <h3 className="font-bold text-lg text-[#7749f8] text-center">Please Update Title and Blog</h3>
        <div className="modal-action">
          <form onSubmit={(event)=>onUpdate(itemid , index , title.current.value , blog.current.value , event)} className='flex flex-col justify-center items-center w-full gap-4'>
            <input type="text" placeholder="Title" className="w-full input input-bordered focus:ring-2 focus:ring-[#7749f8] focus:ring-offset-1 focus:ring-offset-[#f8f9fa]" minLength={5} maxLength={50} required ref={title}/>
            <textarea className="textarea textarea-bordered w-full focus:ring-2 focus:ring-[#7749f8] focus:ring-offset-1 focus:ring-offset-[#f8f9fa]" placeholder="Update your blog" minLength={100} maxLength={3000} required ref={blog}></textarea>
            <div className='flex gap-5'>
            <button type='submit' className="bg-[#7749f8] text-white rounded-lg p-3">Update Values</button>
            <button className="bg-[#7749f8] text-white rounded-lg p-3" onClick={upDateCancel}>Cancel</button>
            </div>
          </form>
        </div>
      </div>
    </dialog>
    </div>
  )
}

export default UpdateBlog
