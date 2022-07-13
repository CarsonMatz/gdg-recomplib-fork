import React, {FC, useState, useEffect, useReducer} from 'react';
import { motion } from "framer-motion";
import { to } from "await-to-js"

export const BUTTON_CLASSNAMES : string = 
    "";

// factories
export const mkHandleMouseEnter = (setHovered : (isHovered : boolean)=>void) => () => {
    setHovered(true);
};
export const mkHandleMouseLeave = (setHovered : (isHovered : boolean)=>void) => () => {
    setHovered(false);
};

//global declaration of button states
export type ButtonState = "default" | "loading" | "err" | "success";

//general css for button, can be altered or spoofed up
export const BUTTON_STYLE : React.CSSProperties = {
    backgroundColor: '#33b863',
    opacity: '1',
    border: '2px solid #636363',
    fontFamily: 'sans-serif',
    fontSize: '16px',
    padding: '15px 15px',
    margin: '5px 5px',
    display: 'inline-block',
    textAlign: 'center',   
};

//css style for loading spinner
export const LOADING_STYLE : React.CSSProperties = {
    backgroundColor: '#ffffff',
    border: '10px solid #f3f3f3',
    borderTop: '10px solid #3498db',
    borderRadius: '50%',
    width: '80px',
    height: '80px',
    display: 'inline-block',
};

//css for success check mark
export const SUCCESS_STYLE : React.CSSProperties = {
    backgroundColor: '#ffffff',
    border: '0px solid #ffffff',
    width: '80px',
    height: '80px',
    fontFamily: 'sans-serif',
    fontSize: '48px',
    color: '#33b863',
};

//css for an error message
export const ERROR_STYLE : React.CSSProperties = {
    backgroundColor: '#e3242b',
    opacity: '1',
    border: '2px solid #636363',
    fontFamily: 'sans-serif',
    fontSize: '16px',
    padding: '15px 15px',
    margin: '5px 5px',
    display: 'inline-block',
    textAlign: 'center',   
};

export type ButtonProps = {
    style ? : React.CSSProperties;
    animate ? : any;
    onClick: () => Promise<any>; //takes in-line function
    variant?: string; // default, submit, continue, info, exit ...
    size?: string; // sm, md, lg ...
    text: string;
};

export const Button : FC<ButtonProps>  = ({
    style,
    animate,
    onClick,
    variant = 'default',
    size = 'md',
    text,
}) =>{

    const [buttonState, setButtonState] = useState<ButtonState>("default");
/*     const [myTimeout, setMyTimeout] = useReducer<(state: NodeJS.Timeout|undefined, newState : NodeJS.Timeout|undefined)=>NodeJS.Timeout|undefined)>((oldTimeout: NodeJS.Timeout, timeout : NodeJS.Timeout)=>{
        clearTimeout(oldTimeout);
        return timeout;
  }, undefined); */

    const [isHovered, setHovered] = useState(false);

   // use your factory
   const handleMouseEnter = mkHandleMouseEnter(setHovered);
   const handleMouseLeave = mkHandleMouseLeave(setHovered);

   const handleClickAsync = async ()=>{
       //delay function I made just for testing purposes so I can slow down the transitions between states for visual testing
    /* const delay = (ms: number | undefined) => new Promise(
        resolve => setTimeout(resolve, ms)
      ); */

    // set buttonState to loading, log it in the console, and delay in this state to view spinner
    setButtonState("loading");
    //console.log("loading");

    // dispatch the onclick
    const [err] = await to(onClick());

    // if there's an error dispatch update to button state
    // that shows error
    //otherwise update to state that shows success
    if(err){
        setButtonState("err");
        //console.log("error");
    } else if(!err){
        setButtonState("success");
        //console.log("success");
    }

    const timeout = setTimeout(()=>{
        // set the dispatch back to default
        clearTimeout(timeout);
        setButtonState("default");
        //console.log("default");
    }, 1000);

}
    //return general button when in default state
    if(buttonState === 'default'){
        return (
            <button
            title = 'default'
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className={BUTTON_CLASSNAMES}
            onClick={handleClickAsync}
            style={{
                ...BUTTON_STYLE,
                ...style,
                ...!isHovered ? BUTTON_STYLE : {opacity: '0.8'}
                }}>
                {text}
            </button>
        )
    }
    //return loading spinner when in loading state
    if(buttonState === 'loading'){
        return (
            <motion.button
            className={BUTTON_CLASSNAMES}
            style={{
                ...LOADING_STYLE,
                ...style,
            }}
            animate={{ rotate: 360 }}
            transition={{ 
                duration: 2,
                repeat: Infinity
            }}
            />
        )
    }

    //return green check when loading completes successfully
    if(buttonState === 'success'){
        return (
            <button
            className={BUTTON_CLASSNAMES}
            style={{
                ...SUCCESS_STYLE,
                ...style,
            }}
            >
                ✓
            </button>
        )
    }

    //if button state is not default, loading, or success then it is either err or some other error has occured
    //regardles, return an error message
    return (
        <button
        className={BUTTON_CLASSNAMES}
        onClick={handleClickAsync}
        style={{
            ...ERROR_STYLE,
            ...style,
            }}>
            Error
        </button>
    )
};
