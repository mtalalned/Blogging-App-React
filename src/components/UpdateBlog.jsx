import React, { useRef } from 'react'

const UpdateBlog = ({onUpdate , upDateCancel , itemid , index}) => {
  
    const title = useRef()
    const blog = useRef()
  
  
  
    return (
    <div>
    <dialog open className="modal">
      <div className="modal-box">
        <h3 className="font-bold text-lg">Please Update Title and Blog</h3>
        <div className="modal-action">
          <form onSubmit={(event)=>onUpdate(itemid , index , title.current.value , blog.current.value , event)} className='flex flex-col justify-center items-center gap-4 border'>
            <input type="text" placeholder="Title" className="input input-bordered" minLength={5} maxLength={50} ref={title}/>
            <textarea className="textarea textarea-bordered" placeholder="Post your blog" minLength={100} maxLength={3000} ref={blog}></textarea>
            <button type='submit' className="btn btn-primary">Update Values</button>
            </form>
            <button className="btn" onClick={upDateCancel}>Cancel</button>
        </div>
      </div>
    </dialog>
    </div>
  )
}

export default UpdateBlog
