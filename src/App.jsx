import { useState,useEffect } from 'react'
import List from './List'
import Alert from './Alert'


const getLocalStorage = () => {
  let list = localStorage.getItem('list');
  if (list) {
    return (list = JSON.parse(localStorage.getItem('list')));
  } else {
    return [];
  }
};


function App() {
  const [name, setName] = useState("")
  const [list,setList]=useState(getLocalStorage())
  const[isEditing,setIsEditing]=useState(false)
  const[editId,setEditId]=useState(null)
  const[alert,setAlert]=useState({show:false,type:'',message:''})

  const itemLength=list.length>0
  
  const deleteItem=(id)=>{
    const newList=list.filter((newItemList)=>{
     return newItemList.id !==id
    })
    popAlert(true,"danger","Item deleted")
    setList(newList)
  }
  const handleSubmit=(e)=>{
    e.preventDefault()
    if (!name) {
      popAlert(true,"danger","Please enter value")
      
    }
    else if (name&&isEditing) {
      setList(
        list.map((item) => {
          if (item.id === editId) {
            return { ...item, title: name };
          }
          return item;
        })
      );
      setName('');
      setEditId(null);
      setIsEditing(false);
      popAlert(true, 'success', 'value changed');

      
    }
    else{

      const newItem={id:new Date().getTime().toString(),title:name}
      setList([...list,newItem])
      popAlert(true,"success","Item added")
      setName("")
    }
  }
  const popAlert=(show=false,type="",message="")=>{
    setAlert({show,type,message})
  }

  const editItem = (id) => {
    const specificItem = list.find((item) => item.id === id);
    setIsEditing(true);
    setEditId(id);
    setName(specificItem.title);
  };
  useEffect(() => {
  
    localStorage.setItem('list', JSON.stringify(list));
  }, [list]);
  
  return (
    <>
     
    
     <main className="container">
     
      <div className="content-form">
      <Alert alert={alert} popAlert={popAlert} />
        <form action="" onSubmit={handleSubmit}>
          <input className='input' type="text" value={name} onChange={(e)=>setName(e.target.value)} />
          <button type="submit">{isEditing?"edit":"submit"}</button>
        </form>
        
        <List list={list} editItem={editItem} deleteItem={deleteItem} />
        

        <button className='clear-items-btn' onClick={()=>{
          setList([])
        }}>{itemLength?"clear items":"List is Empty"}</button>

      </div>
     </main>
    </>
  )
}

export default App
