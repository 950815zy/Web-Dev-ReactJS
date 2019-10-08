import React, {Component} from 'react';
import { connect } from 'react-redux';
import Product from '../ProductList/product'
import axios from 'axios';
import classes from './productSummary.module.css'
import logo from '../Auth/logo.png';
import images from '../ProductList/images.jpeg'
// import fan from '../ProductList/fan.jpg'
import searchPage from '../SearchPage/searchPage'
import { Container, Row, Col, Table, tr, td } from 'react-bootstrap';

class ProductSummary extends Component {

    state = {
        data: []
    }

    componentDidMount() {
        console.log(localStorage);
        let token = "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJra2siLCJleHAiOjE1NzA1ODEzMTQsImlhdCI6MTU3MDU0NTMxNH0.SlPoRQVUxqJsf7OkLfQEMSqb5MBZOMm1LglDM9qYD5r_Lt3bv58twpVLV1tw2PIDv1dbXjS4_Wp96mPjdugo0g";
        let pid = this.props.match.params.model;
        let url = `/user/getProd/${pid}`;
        axios({
            url:url,
            token: token,
            method:'get',
            headers:{
                Authorization: token
            }
        })
        .then((response) => {this.setState({data: response.data});console.log(this.state.data)})
        .catch((error) => {
            console.log(error)});
    }


    render() {
        return (
            <div>
                 <div className={classes.outer}>
                    <img  className = {classes.logo} src={logo} width="10%" height="5%" />
                    <input className = {classes.input} type="text" placeholder="search..."/>
                         Project
                    <img className = {classes.head} src={images} width="4%" height="1.5%" />
                 </div>
                 <div style={{borderBottom:"1px solid rgb(235, 232, 232)", paddingLeft:"5px"}}>
                    <span style={{color: "rgb(35, 67, 148)", fontWeight:"bold", fontSize:"12px"}}>{this.props.match.params.selection} ></span>
                    <span style={{color: "rgb(35, 67, 148)", fontWeight:"bold", fontSize:"12px"}}>{this.props.match.params.searchVal} ></span>
                    <span style={{color: "grey", fontWeight:"bold", fontSize:"12px"}}>{this.state.data.model}</span>
                 </div>
                 <div style={{borderBottom:"2px solid rgb(235, 232, 232)"}} className={classes.secondPart}>
                    {/* <img src={require(`./${this.state.data.manufacturer}.jpg`)} width="50%" height="50%"/> */}
                    <span className={classes.title}>{this.state.data.manufacturer} / {this.state.data.series} / {this.state.data.model}</span>
                    <span style={{color: "red",padding: "10px 5px 5px 20px",fontSize:"12px"}}>Past specifications: {this.state.data.firm} firm / {this.state.data.glob} global</span>
                 </div>
                 <div style={{borderBottom:"2px solid rgb(235, 232, 232)"}} className={classes.thirdPart}>
                     <button>Product Summary</button>
                     <button>Product Details</button>
                     <button>Product Documentation</button>
                     <button>Contact</button>
                 </div>
                 <div className={classes.fourthPart}>
                     <span className={classes.title}>Product Summary</span>
                 </div>
                 <Container className={classes.container} style={{borderBottom:"1px solid grey"}}>
                     <Row>
                     <Col>
                        <Row>
                            <Table className={classes.table1}>
                                <tr>
                                <th>DESCRIPTION</th></tr>
                                <tr>
                                    <td>Manufacturer</td>
                                    <td>{this.state.data.manufacturer}</td>
                                </tr>
                                <tr>
                                    <td>Series</td>
                                    <td>{this.state.data.series}</td>
                                </tr>
                                <tr>
                                    <td>Model</td>
                                    <td>{this.state.data.model}</td>
                                </tr>
    
                                <th>TYPE</th>
                                <tr>
                                    <td>Use Type</td>
                                    <td>{this.state.data.use_type}</td>
                                </tr>
                                <tr>
                                    <td>Application</td>
                                    <td>{this.state.data.application}</td>
                                </tr>
                                <tr>
                                    <td>Mounting Location</td>
                                    <td>{this.state.data.mountingLocation}</td>
                                </tr>
                                <tr>
                                    <td>Accessories</td>
                                    <td>{this.state.data.accessories}</td>
                                </tr>
                                <tr>
                                    <td>Model Year</td>
                                    <td>{this.state.data.modelYear}</td>
                                </tr>
                        </Table>        
                        </Row>
                     </Col>
                     <Col>
                            <Table>
                                <th>Technical Specifications</th>
                                <tr>
                                    <td>Airflow(CFM)</td>
                                    <td>{this.state.data.airflow}</td>
                                </tr>
                                <tr>
                                    <td>Power(W)</td>
                                    <td style={{backgroundColor: "rgb(235, 232, 232)"}}>Min</td>
                                    <td style={{backgroundColor: "white"}}>{this.state.data.powerMin}</td>
                                    <td style={{backgroundColor: "rgb(235, 232, 232)"}}>Max</td>
                                    <td style={{backgroundColor: "white"}}>{this.state.data.powerMax}</td>
                                </tr>
                                <tr>
                                    <td>Operating voltage(VAC)</td>
                                    <td style={{backgroundColor: "rgb(235, 232, 232)"}}>Min</td>
                                    <td style={{backgroundColor: "white"}}>{this.state.data.pvMin}</td>
                                    <td style={{backgroundColor: "rgb(235, 232, 232)"}}>Max</td>
                                    <td style={{backgroundColor: "white"}}>{this.state.data.pvMax}</td>
                                </tr>
                                <tr>
                                    <td>Fan speed(RPM)</td>
                                    <td style={{backgroundColor: "rgb(235, 232, 232)"}}>Min</td>
                                    <td style={{backgroundColor: "white"}}>{this.state.data.rpmMin}</td>
                                    <td style={{backgroundColor: "rgb(235, 232, 232)"}}>Max</td>
                                    <td style={{backgroundColor: "white"}}>{this.state.data.rpmMax}</td>
                                </tr>
                                <tr>
                                    <td>Number of fan speeds</td>
                                    <td>{this.state.data.fanSpeed}</td>
                                </tr>
                                <tr>
                                    <td>Sound at max speed(dBA)</td>
                                    <td>{this.state.data.soundMaxSpeed}</td>
                                </tr>
                                <tr>
                                    <td>Fan sweep diameter(in)</td>
                                    <td>{this.state.data.fanSpeed}</td>
                                </tr>
                                <tr>
                                    <td>Height(in)</td>
                                    <td style={{backgroundColor: "rgb(235, 232, 232)"}}>Min</td>
                                    <td style={{backgroundColor: "white"}}>{this.state.data.heightMin}</td>
                                    <td style={{backgroundColor: "rgb(235, 232, 232)"}}>Max</td>
                                    <td style={{backgroundColor: "white"}}>{this.state.data.heightMax}</td>
                                </tr>
                                <tr>
                                    <td>Weight(lbs)</td>
                                    <td>{this.state.data.weight}</td>
                                </tr>
                            </Table>
                        
                     </Col>
                     </Row>
                     <Row>
                        <span className={classes.title2}>Product Details</span>
                         <Table>
                            <th>SERIES INFOMATION</th>
                            <tr style={{fontSize:"13px", backgroundColor: "rgb(235, 232, 232)"}}>Airfoils - Moso bamboo - 60" diameter</tr>
                            <tr style={{fontSize:"13px"}}>Airfoils Finishes - Caramel Bamboo or Cocoa Bamboo</tr>
                         </Table>
                     </Row>
                 </Container>
            </div>
        )
    }
}

export default ProductSummary;