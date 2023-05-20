import React from 'react'
import PromptCard from './PromptCard'

const Profile = ({name, desc, data, handleEdit, handleDelete }) => {
  return (
    <section className='w-full'>
        <h1 className='head_text text-left'>
          <span className='blue_gradient'>
            {name} Profile
          </span>
        </h1>
        <p className='desc text-left'>{desc}</p>

        <div className='w-full mt-12 space-y-6 sm:columns-2 sm:gap-3 xl:columns-3'>
          {
            data.map((post) => (
              <PromptCard 
                key={post._id} 
                post={post} 
                handleEdit={()=> handleEdit && handleEdit(post) }
                handleDelete={()=> handleDelete && handleDelete(post) }
                
                />
            ))
          }
        </div>

    </section>
  )
}

export default Profile
