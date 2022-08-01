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

//general css for each button variant
export const DO_STYLE : React.CSSProperties = {
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
export const GETINFO_STYLE : React.CSSProperties = {
    backgroundColor: '#861a48',
    opacity: '1',
    border: '2px solid #636363',
    fontFamily: 'sans-serif',
    fontSize: '16px',
    padding: '15px 15px',
    margin: '5px 5px',
    display: 'inline-block',
    textAlign: 'center',   
};
export const GETUSERINFO_STYLE : React.CSSProperties = {
    backgroundColor: '#3a8eca',
    opacity: '1',
    border: '2px solid #636363',
    fontFamily: 'sans-serif',
    fontSize: '16px',
    padding: '15px 15px',
    margin: '5px 5px',
    display: 'inline-block',
    textAlign: 'center',   
};
export const NAVIGATE_STYLE : React.CSSProperties = {
    backgroundColor: '#7fbc4d',
    opacity: '1',
    border: '2px solid #636363',
    fontFamily: 'sans-serif',
    fontSize: '16px',
    padding: '15px 15px',
    margin: '5px 5px',
    display: 'inline-block',
    textAlign: 'center',   
};
export const SORT_STYLE : React.CSSProperties = {
    backgroundColor: '#000000',
    opacity: '1',
    border: '2px solid #636363',
    fontFamily: 'sans-serif',
    fontSize: '16px',
    padding: '15px 15px',
    margin: '5px 5px',
    display: 'inline-block',
    textAlign: 'center',   
};
export const FIND_STYLE : React.CSSProperties = {
    backgroundColor: '#4a4a4a',
    opacity: '1',
    border: '2px solid #636363',
    fontFamily: 'sans-serif',
    fontSize: '16px',
    padding: '15px 15px',
    margin: '5px 5px',
    display: 'inline-block',
    textAlign: 'center',   
};
export const INSTALL_STYLE : React.CSSProperties = {
    backgroundColor: '#dc0e01',
    opacity: '1',
    border: '2px solid #636363',
    fontFamily: 'sans-serif',
    fontSize: '16px',
    padding: '15px 15px',
    margin: '5px 5px',
    display: 'inline-block',
    textAlign: 'center',   
};
export const COMMENT_STYLE : React.CSSProperties = {
    backgroundColor: '#094068',
    opacity: '1',
    border: '2px solid #636363',
    fontFamily: 'sans-serif',
    fontSize: '16px',
    padding: '15px 15px',
    margin: '5px 5px',
    display: 'inline-block',
    textAlign: 'center',   
};
export const GETHELP_STYLE : React.CSSProperties = {
    backgroundColor: '#e65f21',
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

export type VariantMap = "do"|"getInfo"|"getUserInfo"|"navigate"|"find"|"sort"|"install"|"comment"|"getHelp";
//map to connect variants with their respective CSS styles
export const variantMap = {
    "do": DO_STYLE, 
    "getInfo": GETINFO_STYLE, 
    "getUserInfo": GETUSERINFO_STYLE,
    "navigate": NAVIGATE_STYLE,
    "find": FIND_STYLE,
    "sort": SORT_STYLE,
    "install": INSTALL_STYLE,
    "comment": COMMENT_STYLE,
    "getHelp": GETHELP_STYLE,
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

//in default state, display empty p block by text
export const def = <p
                        style = {{display: 'inline-block', margin: '0px'}}
                    >
                    </p>;
//spinner for loading
export const loading = <motion.button
                        style={{
                            ...LOADING_STYLE,
                        }}
                        animate={{ rotate: 360 }}
                        transition={{ 
                            duration: 2,
                            repeat: Infinity
                        }}
                        />;
//draw check mark for success
export const success = <motion.svg
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
                        </motion.svg>;
//draw X for error
export const error = <motion.svg
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
                    </motion.svg>;
//warning symbol for warning
export const warning = <AiOutlineWarning />;
//waiving hand for helping
export const helping = <motion.p
                        style = {{ display: 'inline-block', margin: '0px' }}
                        animate={{ rotate: [45, -45, 45]}}
                        transition={{ 
                            duration: 2,
                            repeat: Infinity
                        }}
                    >
                    <MdBackHand />
                    </motion.p>;
//pulsing brain for hinting
export const hinting = <motion.p
                        style = {{ display: 'inline-block', margin: '0px' }}
                        animate={{ scale: [1.2, 0.8, 1.2]}}
                        transition={{ 
                            duration: 2,
                            repeat: Infinity
                        }}
                    >
                    <GiBrain />
                    </motion.p>;

//dictionary to for button state and associated symbol to be displayed next to text in button
export const buttonStateMap = {
        "default": def,
        "loading": loading,
        "error": error,
        "success": success,
        "warning": warning,
        "helping": helping,
        "hinting": hinting,
};

//delay funtion to set up the timing of drawing lines and shapes
export const delay = (ms: number | undefined) => new Promise(
    resolve => setTimeout(resolve, ms)
  );

export type ButtonProps = {
    style ? : React.CSSProperties;
    animate ? : any;
    onClick: () => Promise<any>; //takes in-line function
    variant?: VariantMap; 
    text: string;
};

export const Button : FC<ButtonProps>  = ({
    style,
    animate,
    onClick,
    variant = "do",
    text,
}) =>{
    //set initial button state to default
    const [buttonState, setButtonState] = useState<ButtonState>("default");
    //set the initial hovered state to false
    const [isHovered, setHovered] = useState(false);

   // use your factory
   const handleMouseEnter = mkHandleMouseEnter(setHovered);
   const handleMouseLeave = mkHandleMouseLeave(setHovered);

   const handleClickAsync = async ()=>{

    // set buttonState to loading
    setButtonState("loading");

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
    //return the proper button
    return (
        <button
        title = 'default'
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={BUTTON_CLASSNAMES}
        onClick={handleClickAsync}
        style={{
            ...variantMap[variant],
            ...style,
            ...!isHovered ? variantMap[variant] : {opacity: '0.8'}
            }}>
            {text + " "}
            {buttonStateMap[buttonState]}
        </button>
    )
    
};
