import React from 'react'

const List = ({list,deleteItem,editItem}) => {
  
  return (
    <div>
      {list.map((item) => {
        const { id, title } = item;
        return (
          <article className='grocery-item' key={id}>
            
            <div className='list'>
            <p className='title'>{title}</p>

              <span><button onClick={()=>{
                deleteItem(id)
              }} className='btn-delete'>delete</button>|<button onClick={()=>{
                editItem(id)
              }} className='btn-edit'>edit</button></span>
            </div>

          </article>  

);
})}
    </div>
  )
}

export default List