import React,{useContext,useState} from 'react'
import noteContext from '../context/notes/noteContext';
const AddNote=(props)=> {
    const context=useContext(noteContext);
    const {addNote}=context;

    const [note,setNote]=useState({title:"",description:"",tag:"default"})
    const handleClick=(e)=> {
    e.preventDefault();
    addNote(note.title,note.description,note.tag);
    setNote({title:"",description:"",tag:""})
    props.showAlert("Added note sucessfully","success")
    }

    
    
    const onChange=(e)=> {
       setNote({...note,[e.target.name]:e.target.value});
       console.log(note);
    }
    
    
  return (
    <>
    <div>
    <div className="container my-3">
    <h2>Add a Note</h2>
    <form className="my-3">
    <div className="mb-3">
    <label htmlFor="title" className="form-label">Title</label>
    <input type="text" className="form-control" id="title" name="title" aria-describedby="emailHelp"  value={note.title} onChange={onChange} minLength={5} required/>
   
    </div>
    <div className="mb-3">
        <label htmlFor="description" className="form-label">Description</label>
        <input type="text" className="form-control" id="description" name="description" value={note.description} onChange={onChange} minLength={5} required/>
        </div>
        <div className="mb-3">
        <label htmlFor="tag" className="form-label">Tag</label>
        <input type="text" className="form-control" id="tag" name="tag" onChange={onChange}/>
        </div>
        
        <button type="submit" className="btn btn-primary" onClick={handleClick}>Add Note
        </button>
        </form>
        </div>
        
    
    </div>
    </>
  )
}

export default AddNote
