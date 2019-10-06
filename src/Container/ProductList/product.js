import React, { Component } from 'react';
import axios from 'axios';
import logo from '../Auth/logo.png';
import classes from './product.module.css'
import images from './images.jpeg'
import fan from './fan.jpg'
// import { Button, Container } from 'semantic-ui-react'
// import {Slider} from 'primereact/slider';
// import {InputText} from 'primereact/inputtext';
// import 'jquery/src/jquery';
import ReactSlider from 'react-slider';


class product extends Component {
    state = {
            data: [],

        };

    componentDidMount() {
        let token = "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJra2siLCJleHAiOjE1NzAzOTQyMzgsImlhdCI6MTU3MDM5MDYzOH0.Q3pd7AjTw8eniNKnPEt0P8ek4I8AkPgVjV4hQYwexwZh9LEP4y6KvAEEAKTEliAeALh9WPR-a_AzIqi05ZMRtw";
        let url = "/user/getAllProd";
        axios({
            url:url,
            token: token,
            method:'get',
            headers:{
                Authorization: token
            }
        })
        .then((response) => {this.setState({data: response.data}); console.log(response);})
        .catch((error) => {
            console.log(error)});
    }
    render(){
    return(
        
    
            <div>
                <div><ReactSlider
    className="horizontal-slider"
    thumbClassName="example-thumb"
    trackClassName="example-track"
    defaultValue={[0, 100]}
    ariaLabel={['Lower thumb', 'Upper thumb']}
    ariaValuetext={state => `Thumb value ${state.valueNow}`}
    renderThumb={(props, state) => <div {...props}>{state.valueNow}</div>}
    pearling
    minDistance={10}
/></div>
            <div className={classes.outer}>
                    <img  className = {classes.logo} src={logo} width="8%" height="5%" />
                    <input className = {classes.input} type="text" placeholder="search..."/>
                         Project
                    <img className = {classes.head} src={images} width="5%" height="3%" />
            </div>

            <div className={classes.inner}>
                <div className={classes.lefttable}>
                    <label className={classes.searchLabel}>Search: </label>
                    <button className={classes.button1}>Save</button>
                    <button className={classes.button1}>Clear</button><br/>
                    <button className={classes.button2} >Product</button>  
                    <button className={classes.button2} >Project</button>  
                    <p className={classes.title}>  Product Type</p>
                    <p className={classes.smallFont}>Model year: <input type="text"/> - <input type="text"/></p>
                    <p className={classes.title}>Technical Specification</p>
                    <p className={classes.smallFont}>Airflow (CFM)</p>
                    <div><ReactSlider
    className="horizontal-slider"
    thumbClassName="example-thumb"
    trackClassName="example-track"
    defaultValue={[0, 100]}
    ariaLabel={['Lower thumb', 'Upper thumb']}
    ariaValuetext={state => `Thumb value ${state.valueNow}`}
    renderThumb={(props, state) => <div {...props}>{state.valueNow}</div>}
    pearling
    minDistance={10}
/></div>

                </div>

                <div className="container">
                <div className="row">
                    {this.state.data.map(link=>(
                    <div key={link.manufacturer} id='cardItem' className="col">
                        <img className={classes.fan} src={fan} width="50%" height="50%" /><br/>
                        <div className={classes.firstPart}>
                            <span>{link.manufacturer}</span><br/>
                            <span>{link.series}</span><br/>
                            <span>{link.model}</span><br/>
                            
                        </div>
                        <div className={classes.secondPart}> 
                            <span>{link.airflow} CFM</span><br/>
                            <span>{link.powerMax} W at max speed</span><br/>
                            <span>{link.soundMaxSpeed} dBA ar max speed</span><br/>
                            <span>{link.fanSweep} fan sweep diameter</span><br/>
                        </div>

                    </div>
                    ))}
                </div>
                </div>
            </div>
            </div>

    );
        
    }
}    

export default product;

