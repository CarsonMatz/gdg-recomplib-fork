import React, {FC, useState, useEffect, useReducer} from 'react';
import { motion } from "framer-motion";
import { to } from "await-to-js"
import { isVisible } from '@testing-library/user-event/dist/utils';
import { AiOutlineWarning } from "react-icons/ai";
import { MdBackHand } from "react-icons/md"
import { GiBrain } from "react-icons/gi"

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
export type ButtonState = "default" | "loading" | "error" | "success" | "warning" | "helping" | "hinting";

export const Variants = ["do", "get info", "get user info", "navigate", "find", "sort", "install", "comment", "get help"];
export const VARIANT_STYLES = ["BUTTON_STYLE", "GETINFO_STYLE", "GETUSERINFO_STYLE", "NAVIGATE_STYLE", "FIND_STYLE", 
    "SORT_STYLE", "INSTALL_STYLE", "COMMENT_STYLE", "GETHELP_STYLE"];
export const variantMap = Variants.map((Variant) => VARIANT_STYLES);
    

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
    border: '3px solid #f3f3f3',
    borderTop: '3px solid #3498db',
    borderRadius: '50%',
    width: '20px',
    height: '20px',
    display: 'inline-block',
};

//function for drawing lines/shapes (such as check, x) with framer motion
export const draw = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: (i : number) => {
      const delay = 1 + i * 0.5;
      return {
        pathLength: 1,
        opacity: 1,
        transition: {
          pathLength: { delay, type: "spring", duration: 1.5, bounce: 0 },
          opacity: { delay, duration: 0.01 }
        }
      };
    }
};

//delay funtion to set up the timing of drawing lines and shapes
export const delay = (ms: number | undefined) => new Promise(
    resolve => setTimeout(resolve, ms)
  );

export type ButtonProps = {
    style ? : React.CSSProperties;
    animate ? : any;
    onClick: () => Promise<any>; //takes in-line function
    variant?: string; 
    text: string;
};

export const Button : FC<ButtonProps>  = ({
    style,
    animate,
    onClick,
    variant = 'do',
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
        setButtonState("error");
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

    //return loading spinner when in loading state
    if(buttonState === 'loading'){
        return (
            <button
            title = 'default'
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className={BUTTON_CLASSNAMES}
            onClick={handleClickAsync}
            style={{
                ...{variantMap[variant]},
                ...style,
                ...!isHovered ? BUTTON_STYLE : {opacity: '0.8'}
                }}>
                {text + " "}
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
            </button>
        )
    }
    //return green check when loading completes successfully
    if(buttonState === 'success'){
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
                {text + " "}
                <motion.svg
                    width="10"
                    height="10"
                    viewBox="0 0 10 10"
                    initial="hidden"
                    animate="visible"
                >
                    <motion.line
                        x1="0"
                        y1="6"
                        x2="4"
                        y2="10"
                        stroke="#000000"
                        variants={draw}
                    />
                    <motion.line
                        x1="4"
                        y1="10"
                        x2="10"
                        y2="0"
                        stroke="#000000"
                        variants={draw}
                    />
                </motion.svg>
            </button>
        )
    }

    //return button with red X for error
    if(buttonState === "error"){
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
                    {text + " "}
                    <motion.svg
                        width="10"
                        height="10"
                        viewBox="0 0 10 10"
                        initial="hidden"
                        animate="visible"
                    >
                        <motion.line
                            x1="0"
                            y1="0"
                            x2="10"
                            y2="10"
                            stroke="#e3242b"
                            variants={draw}
                        />
                        <motion.line
                            x1="10"
                            y1="0"
                            x2="0"
                            y2="10"
                            stroke="#e3242b"
                            variants={draw}
                        />
                    </motion.svg>
                </button>
        )
    }

    //return button with attached warning symbol for warning
    if(buttonState === 'warning'){
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
                {text + " "}
                <AiOutlineWarning />
            </button>
        )
    }

    //return button with waving hand for helping
    if(buttonState === 'helping'){
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
                {text + " "}
                <motion.p
                    className={BUTTON_CLASSNAMES}
                    style = {{ display: 'inline-block', margin: '0px' }}
                    animate={{ rotate: [45, -45, 45]}}
                    transition={{ 
                        duration: 2,
                        repeat: Infinity
                    }}
                >
                <MdBackHand />
                </motion.p>
            </button>
        )
    }

    //button with pulsing brain for helping
    if(buttonState === 'hinting'){
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
                {text + " "}
                <motion.p
                    className={BUTTON_CLASSNAMES}
                    style = {{ display: 'inline-block', margin: '0px' }}
                    animate={{ scale: [1.2, 0.8, 1.2]}}
                    transition={{ 
                        duration: 2,
                        repeat: Infinity
                    }}
                >
                <GiBrain />
                </motion.p>
            </button>
        )
    }

    //unless otherwise tagged, return the default button
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
    
};
