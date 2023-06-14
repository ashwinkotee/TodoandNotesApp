import {useState,useEffect} from 'react';

export const Notes = () =>{

  const [userNotes,setUserNotes] = useState([])

  useEffect(() =>{
    const localNotes = JSON.parse(localStorage.getItem("notes"))
    setUserNotes(localNotes)
  },[])

  const notesOnchange = (e) =>{
    const currentNotes = localStorage.setItem("notes",JSON.stringify(e.target.value))
    setUserNotes(currentNotes)
  }
  
  return (
    <div style={{ gridColumn: "span 12" }}>
      <div className="container">
        <div className="mb-3">
          <textarea style={{ height: '300px' }} type="text" className="form-control" id="notesInput" placeholder="Take notes." onChange={(e) => notesOnchange(e)} />
        </div>
      </div>
    </div>
  )
}