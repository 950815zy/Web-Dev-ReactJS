import React, { Component } from 'react';
import logo from '../Auth/logo.png';
import classes from './Compare.module.css'
import images from '../ProductList/images.jpeg'
import { Link } from 'react-router-dom';
import {searchPage}  from '../SearchPage/searchPage'
import { Container, Row, Col, Table } from 'react-bootstrap';
import styled from 'styled-components';

class Compare extends Component {
    state={
        compareData : this.props.location.state
    }

    render() {
        console.log(this.state.compareData)
        return(
            <div>
                <div className={classes.outer}>
                    <img  className = {classes.logo} src={logo} width="10%" height="5%" />
                    <input className = {classes.input} type="text" placeholder="search..."/>
                    <span style={{marginTop:"20px"}}>Projects</span>
                    <img style={{marginLeft:"10px",marginTop:"10px",marginRight:"10px"}} src={images} width="5%" height="3%" />
                </div>
                
                <div>
                    <span style={{color: "rgb(35, 67, 148)", fontWeight:"bold", fontSize:"12px"}}>{this.props.match.params.selection} ></span>
                    <span style={{color: "rgb(35, 67, 148)", fontWeight:"bold", fontSize:"12px"}}>{this.props.match.params.searchVal} ></span>
                </div>
                
                <Container>
                    <Row className={classes.table}>
                        <Col xs={3} className={classes.index}>
                                <th style={{height: "80px"}}></th>
                                <tr style={{fontSize:"3em", fontWeight:"bold"}}>DESCRIPTION</tr>
                                <tr>Manufacturer</tr>
                                <tr>Series</tr>
                                <tr>Model</tr>
                                <tr className={classes.border} style={{fontSize:"3em", fontWeight:"bold"}}>TYPE</tr>
                                <tr>Use Type</tr>
                                <tr>Application</tr>
                                <tr>Mounting Location</tr>
                                <tr>Accessories</tr>
                                <tr>Model Year</tr>
                                <tr style={{fontSize:"3em", fontWeight:"bold"}}>TECHNICAL SPECIFICATIONS</tr>
                                <tr>Airflow(CFM)</tr>
                                <tr>Power(W)</tr>
                                <tr>Operating Voltage(VAC)</tr>
                                <tr>Fan Speed(RFM)</tr>
                           
                        </Col>
                        {this.state.compareData.map(link=>{
                        return(
                        <Col xs={3}  className={classes.content}>
                            <th >
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