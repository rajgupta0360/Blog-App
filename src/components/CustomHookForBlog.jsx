import { useState, useRef, useEffect, useReducer } from "react";


function blogReducer(state, action){
    // console.log(action);
    // switch(action.type){
    //     case 'ADD_BLOG':
    //         return [{title: action.blog.title, content: action.blog.content}, ...state];
    //     case 'DELETE_BLOG':
    //         return state.filter((_, index) => index !== action.index);
    //     default:
    //         return state;
    // }
    switch(action.type){
        case 'ADD_BLOG':
            return [action.blog, ...state];
        case 'DELETE_BLOG':
            return state.filter((_, index) => index !== action.index);
        default:
            return state;
    }
}

const CustomHookForBlog = () =>{
    const [blogs, dispatch] = useReducer(blogReducer, []);
    const titleRef = useRef(null);
    useEffect(() =>{
        titleRef.current.focus();
    })

    useEffect(() => {
        if (blogs.length > 0) {
            document.title = blogs[0].title;
        } else {
            document.title = "Blog App";
        }
    })

    return {
        blogs,
        dispatch,
        titleRef
    };
}

export default CustomHookForBlog;