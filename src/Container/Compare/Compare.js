import React, { Component } from 'react';
import logo from '../Auth/logo.png';
import classes from './Compare.module.css'
import images from '../ProductList/images.jpeg'
import { Link } from 'react-router-dom';
import {searchPage}  from '../SearchPage/searchPage'
import { Container, Row, Col } from 'react-bootstrap';
import styled from 'styled-components';

class Compare extends Component {
    render() {
        return(
            <div>
                <div className={classes.outer}>
                    <img  className = {classes.logo} src={logo} width="10%" height="5%" />
                    <input className = {classes.input} type="text" placeholder="search..."/>
                         Project
                    <img className = {classes.head} src={images} width="4%" height="1.5%" />
                </div>
                <div>
                    <span style={{color: "rgb(35, 67, 148)", fontWeight:"bold", fontSize:"12px"}}>{this.props.match.params.selection} ></span>
                    <span style={{color: "rgb(35, 67, 148)", fontWeight:"bold", fontSize:"12px"}}>{this.props.match.params.searchVal} ></span>
                </div>


            </div>
        )
    }
}

export default Compare;