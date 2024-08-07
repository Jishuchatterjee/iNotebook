import { useState } from "react";
import NoteContext from "./noteContext";
const NoteState=(props)=> {
   const host="http://127.0.0.1:5000"
   const notesInitial= []

     const [notes,setNotes]=useState(notesInitial)
     const getNotes=async()=> {
      const response=await fetch(`${host}/api/notes/fetchallnotes`,{
        method:'GET',
        headers: {
        "auth-token": localStorage.getItem('token')
        
        }
        
      });
      const json =await response.json();
      setNotes(json)
     }





     
   
     //Add a Note
     const addNote=async(title,description,tag)=> {
      const response=await fetch(`${host}/api/notes/addnote`,{
        method:'POST',
        headers: {
          "auth-token": localStorage.getItem('token'),
          'Content-Type': 'application/json'
          
          
        
        },
        body:JSON.stringify({title,description,tag})
        
      });
      // const note= {
        
      //     "user": "64fd9212f59b8b878e244549",
      //     "title": title,
      //     "description": description,
      //     "tag": tag,
      //     "_id": "6502bed29efh113a5af69f9164",
      //     "date": "2023-09-14T08:05:38.559Z",
      //     "__v": 0
        
      // };
      const note=await response.json();
      setNotes(notes.concat(note));
    }

      //Delete a note
      const deleteNote=async(id)=> {
        const response=await fetch(`${host}/api/notes/deletenote/${id}`,{
          method:'DELETE',
          headers: {
          "auth-token": localStorage.getItem('token'),
          'Content-Type': 'application/json'
          }
          
        });
        const json=response.json();
        const newNotes=notes.filter((note)=> {
        return(note._id!==id)
        })
        setNotes(newNotes)
      }

      

      //Edit a Note
      const editNote=async(id,title,description,tag)=> {
        const response=await fetch(`${host}/api/notes/updatenote/${id}`,{
          method:'PUT',
          headers: {
          "auth-token": localStorage.getItem('token'),
          'Content-Type': 'application/json'
          },
          body:JSON.stringify({id,title,description,tag})
          
        });
        const json = await response.json();
        let newNotes=JSON.parse(JSON.stringify(notes))
        for(let i=0;i<newNotes.length;i++) {
          const element=newNotes[i]
          if(element._id===id) {
            newNotes[i].title=title;
            newNotes[i].description=description;
            newNotes[i].tag=tag;
            break;
          }
          
        }
        setNotes(newNotes)

      }
    return(
    <NoteContext.Provider value={{notes,addNote,deleteNote,editNote,getNotes}}>
        {props.children}
    </NoteContext.Provider>
    )
}

export default NoteState;
