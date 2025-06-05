import { useState, useRef, useEffect, useReducer, StrictMode } from "react";
import { db } from "../firebase.init";
import { collection, addDoc, doc, setDoc, getDocs, onSnapshot, deleteDoc } from "firebase/firestore";

function blogReducer(state, action){
    // console.log(action);
    // console.log("State",state);
    switch(action.type){
        case 'SET_BLOGS':
            return action.blogs;
        default:
            return state;
    }
}

export default function Blog(){
    const [blogs, dispatch] = useReducer(blogReducer, []);
    const titleRef = useRef(null);
    useEffect(() =>{
        titleRef.current.focus();
    }, []);

    useEffect(()=>{

        const mount = onSnapshot(collection(db, "blogs"), (snapshot)=>{
            const blogs = snapshot.docs.map((doc) => {
                return{
                    id: doc.id,
                    ...doc.data()
                }
            })
            
            dispatch({type: "SET_BLOGS", blogs: blogs});
        })

        return mount; // Cleanup function to unsubscribe from the snapshot listener
    }, []);

    useEffect(() => {
        if (blogs.length > 0) {
            document.title = blogs[0].title;
        } else {
            document.title = "Blog App";
        }
    });




    const handleSubmit =  async(e) =>{
        e.preventDefault();
        const title = e.target[0].value;
        const content = e.target[1].value;
        if(title && content){     
            const docRef = doc(collection(db, "blogs"));
            await setDoc(docRef, {
                title: title,
                content: content,
                createdOn: new Date(),
            });
            // console.log("Document written with ID: ", docRef.id);

            e.target.reset();
        } else {
            alert("Please fill in all fields");
            titleRef.current.focus();
        }

        // There is other way to do this, because it is not a good practice to set the document title here, because react seperate the concerns, better way to do this in useEffect.
        // document.title = title;;

        titleRef.current.focus();
    }

    const handleDelete = async(id) => {
        await deleteDoc(doc(db, "blogs", id));
    }
    return(
        <>
            <div className="container d-flex justify-content-center mx-auto my-1 row">
                <div className="col-12 col-md-11 col-lg-9">
                    <h1 className="text-center mb-4">Write a Blog!</h1>
                    <div className="bg-danger border p-2 px-3 rounded-3">
                        <form onSubmit={handleSubmit}> 
                            <div className="mb-3 d-flex flex-column align-items-center">
                                <label className="form-label text text-center text-light w-100 fw-bolder fs-5">Title</label>
                                <input type="text" className="form-control w-75" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter the title here..." ref={titleRef}/>
                                <div className="border mt-3 w-100"></div>
                            </div>
                            <div className="mb-3 d-flex flex-column align-items-center my-1">
                                <label className="form-label text text-center text-light fw-bolder fs-5">Content</label>
                                <input type="text" className="form-control w-75" id="exampleInputPassword1" placeholder="Content goes here..."/>
                                <div className="border mt-3 w-100"></div>
                            </div>
                            <div className="mb-3 d-flex flex-column align-items-center my-0">
                                <button type="submit" className="btn btn-primary fw-bolder px-4">ADD</button> 
                            </div>
                        </form>
                    </div>
                </div>
                <div className="col-12 col-md-11 col-lg-9 mt-3">
                    <h2 className="text-center m-0">Blogs</h2>
                    {blogs.map((blog, index)=>(
                        <div className="bg-info border p-3 rounded-3 m-3 d-flex flex-column" key={index}>
                            <h4 className="fs-5 mb-0">{blog.title}</h4>
                            <hr/>
                            <p className="m-0">{blog.content}</p>
                            <button className="btn btn-danger fs-6 p-1 align-self-end" onClick={()=>handleDelete(blog.id)}>Delete</button>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}