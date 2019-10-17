import React, { Component } from 'react';
import logo from '../Auth/logo.png';
import classes from './Compare.module.css'
import images from '../ProductList/images.jpeg'
import { Link } from 'react-router-dom';
import {searchPage}  from '../SearchPage/searchPage'
import { Container, Row, Col, Table } from 'react-bootstrap';
import styled from 'styled-components';
import {logout} from '../../Store/actions/auth'
import {Dropdown,DropdownButton,DropdownToggle} from 'react-bootstrap';

class Compare extends Component {
    state={
        compareData : this.props.location.state,
        userId:''
  
    };

componentDidMount() {
    this.setState({userId:localStorage.userId});}

logOut = () => {
    logout();
    console.log(localStorage);
}

    render() {
        return(
            <div>
                <div className={classes.outer}>
                    <img  className = {classes.logo} src={logo} width="10%" height="5%" />
                    <input className = {classes.input} type="text" placeholder="search..."/>
                    <span style={{marginTop:"20px",fontSize:"18px"}}>Hello, {this.state.userId}</span>
                    <DropdownButton className={classes.drop} style={{width:"5%",height:"4%",marginLeft:"20px",marginTop:"10px",marginRight:"10px",padding:"0 0 0 0"}}
                        title={<img src={images} style={{margin:"0 0 0 0",padding:"0 0 0 0"}} width="100%" height="100%" />}
                                            size="sm"
                    >
                    <Dropdown.Item onClick={this.logOut}  style={{fontSize:"11px" , width:"5px"}}>Log Out</Dropdown.Item>
                    </DropdownButton>             
                </div>
                <div style={{margin:"10px 0 10px 20px"}}>
                    <span style={{color: "rgb(35, 67, 148)", fontSize:"1em", fontWeight:"bold"}}>{this.props.match.params.selection} ></span>
                    <span style={{color: "rgb(35, 67, 148)", fontSize:"1em", fontWeight:"bold"}}> {this.props.match.params.searchVal} ></span>
                    <span style={{color: "grey", fontSize:"1em",fontWeight:"bold"}}> Compare</span>
                </div>
                
                <Container>
                    <Row className={classes.table}>
                        <Col xs={3} className={classes.index}>
                                <th style={{height: "80px"}}></th>
                                <tr style={{fontSize:"3em", fontWeight:"bold"}}>DESCRIPTION</tr>
                                <tr style={{backgroundColor: "rgb(230, 224, 224)"}}>
                                <tr>Manufacturer</tr>
                                <tr>Series</tr>
                                <tr>Model</tr>
                                </tr>
                                <tr style={{fontSize:"3em", fontWeight:"bold"}}>TYPE</tr>
                                <tr style={{backgroundColor: "rgb(230, 224, 224)"}}>
                                <tr>Use Type</tr>
                                <tr>Application</tr>
                                <tr>Mounting Location</tr>
                                <tr>Accessories</tr>
                                <tr>Model Year</tr>
                                </tr>
                                <tr style={{fontSize:"3em", fontWeight:"bold"}}>TECHNICAL SPECIFICATIONS</tr>
                                <tr style={{backgroundColor: "rgb(230, 224, 224)"}}>
                                <tr>Airflow(CFM)</tr>
                                <tr>Power(W)</tr>
                                <tr>Operating Voltage(VAC)</tr>
                                <tr>Fan Speed(RFM)</tr>
                                </tr>
                           
                        </Col>
                        {this.state.compareData.map(link=>{
                        return(
                        <Col xs={3}  style={{textAlign:"center"}} className={classes.content}>
                            <th >
                            <span style={{color:"blue", fontSize:"11px", fontWeight:"normal", float:"right"}}>verified {link.modelYear}</span>
                            <img className={classes.fan}  src={require(`../ProductList/${link.manufacturer}.jpg`)} width="80px" height="80px"/>
                            </th>
                            <tr>&nbsp;</tr>
                            <tr>{link.manufacturer}</tr>
                            <tr>{link.series}</tr>
                            <tr>{link.model}</tr>
                            <tr>&nbsp;</tr>
                            <tr>{link.use_type}</tr>
                            <tr>{link.application}</tr>
                            <tr>{link.mountingLocation}</tr>
                            <tr>{link.accessories}</tr>
                            <tr>{link.modelYear}</tr>
                            <tr>&nbsp;</tr>
                            <tr>{link.airflow}</tr>
                            <tr><span style={{paddingRight:"1em",backgroundColor: "rgb(236, 231, 231)", marginRight: "1em"}}>Min</span> {link.powerMin} <span style={{paddingRight:"1em", backgroundColor: "rgb(236, 231, 231)", marginLeft: "1em"}}>Max</span> {link.powerMax}</tr>
                            <tr><span style={{paddingRight:"1em", backgroundColor: "rgb(236, 231, 231)", marginRight: "1em"}}>Min</span> {link.pvMin} <span style={{paddingRight:"1em", backgroundColor: "rgb(236, 231, 231)", marginLeft: "1em"}}>Max</span> {link.pvMax}</tr>
                            <tr><span style={{paddingRight:"1em", backgroundColor: "rgb(236, 231, 231)", marginRight: "1em"}}>Min</span> {link.rpmMin} <span style={{paddingRight:"1em", backgroundColor: "rgb(236, 231, 231)", marginLeft: "1em"}}>Max</span> {link.rpmMax}</tr>
                        </Col>
                            )})}    
                    </Row>
                </Container>
            </div>
        )
    }
}

export default Compare;