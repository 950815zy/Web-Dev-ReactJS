import React, {Component} from 'react';
import { connect } from 'react-redux';
import Product from '../ProductList/product'
import axios from 'axios';
import classes from './productSummary.module.css'
import logo from '../Auth/logo.png';
import word from './word.jpg'
import pdf from './pdf.jpeg'
import dwg from './dwg.jpg'
import rvt from './rvt.jpg'
import images from '../ProductList/images.jpeg'
import searchPage from '../SearchPage/searchPage'
import { Container, Row, Col, Table, tr, td } from 'react-bootstrap';
import {logout} from '../../Store/actions/auth'
import {Dropdown,DropdownButton,DropdownToggle} from 'react-bootstrap';

class ProductSummary extends Component {

    state = {
        data: [],
        userId:''
  
    };

    componentDidMount() {
    this.setState({userId:localStorage.userId});
        let token = "Bearer " + localStorage.token;
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
        .then((response) => {console.log(response);this.setState({data: response.data});console.log(this.state.data)})
        .catch((error) => {
            console.log(error)});
    }

    logOut = () => {
        logout();
        console.log(localStorage);
    }

    render() {
        return (
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
                 <div style={{ paddingLeft:"5px"}}>
                    <span style={{color: "rgb(35, 67, 148)", fontWeight:"bold", fontSize:"12px"}}>{this.props.match.params.selection} ></span>
                    <span style={{color: "rgb(35, 67, 148)", fontWeight:"bold", fontSize:"12px"}}>{this.props.match.params.searchVal} ></span>
                    <span style={{color: "grey", fontWeight:"bold", fontSize:"12px"}}>{this.state.data.model}</span>
                 </div>
                 <div  className={classes.secondPart}>
                    {/* <img src={require(`./${imageName}.jpg`)} width="50%" height="50%"/> */}
                    <span className={classes.title}>{this.state.data.manufacturer} / {this.state.data.series} / {this.state.data.model}</span>
                    <span style={{color: "red",padding: "10px 5px 5px 20px",fontSize:"12px"}}>Past specifications: {this.state.data.firm} firm / {this.state.data.glob} global</span>
                 </div>
                 <div className={classes.thirdPart}>
                     <button>Product Summary</button>
                     <button>Product Details</button>
                     <button>Product Documentation</button>
                     <button>Contact</button>
                 </div>
                 <div className={classes.fourthPart}>
                     <span className={classes.title}>Product Summary</span>
                 </div>
                 <Container className={classes.container} >
                     <Row>
                     <Col>
                        <Row>
                            <Table className={classes.table1}>
                                <tr>
                                <th>DESCRIPTION</th>
                                <td></td></tr>
                                <tr style={{border:"0px"}}>
                                    <td >Manufacturer</td>
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
                                <tr>
                                    <th>Technical Specifications</th>
                                    <td></td><td style={{backgroundColor: "white"}}></td><td></td><td style={{backgroundColor: "white"}}></td>
                                </tr>
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
                                    <td style={{backgroundColor: "white"}}></td><td></td><td style={{backgroundColor: "white"}}></td>
                                </tr>
                                <tr>
                                    <td>Sound at max speed(dBA)</td>
                                    <td>{this.state.data.soundMaxSpeed}</td>
                                    <td style={{backgroundColor: "white"}}></td><td></td><td style={{backgroundColor: "white"}}></td>
                                </tr>
                                <tr>
                                    <td>Fan sweep diameter(in)</td>
                                    <td>{this.state.data.fanSpeed}</td>
                                    <td style={{backgroundColor: "white"}}></td><td></td><td style={{backgroundColor: "white"}}></td>
                                </tr>
                                <tr>
                                    <td>Height(in)</td>
                                    <td style={{backgroundColor: "rgb(235, 232, 232)"}}>Min</td>
                                    <td style={{backgroundColor: "white",paddingRight: "5px"}}>{this.state.data.heightMin}</td>
                                    <td style={{backgroundColor: "rgb(235, 232, 232)"}}>Max</td>
                                    <td style={{backgroundColor: "white"}}>{this.state.data.heightMax}</td>
                                </tr>
                                <tr>
                                    <td>Weight(lbs)</td>
                                    <td>{this.state.data.weight}</td>
                                    <td style={{backgroundColor: "white"}}></td><td></td><td style={{backgroundColor: "white"}}></td>
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
                            <tr style={{fontSize:"13px", backgroundColor: "rgb(235, 232, 232)"}}>Airfoils - Moso bamboo - 60" diameter</tr>
                            <tr style={{fontSize:"13px"}}>Airfoils Finishes - Caramel Bamboo or Cocoa Bamboo</tr>
                            <tr style={{fontSize:"13px", backgroundColor: "rgb(235, 232, 232)"}}>Airfoils - Moso bamboo - 60" diameter</tr>
                            <tr style={{fontSize:"13px"}}>Airfoils Finishes - Caramel Bamboo or Cocoa Bamboo</tr>
                            <tr style={{fontSize:"13px", backgroundColor: "rgb(235, 232, 232)"}}>Airfoils - Moso bamboo - 60" diameter</tr>
                            <tr style={{fontSize:"13px"}}>Airfoils Finishes - Caramel Bamboo or Cocoa Bamboo</tr>
                            <tr style={{fontSize:"13px", backgroundColor: "rgb(235, 232, 232)"}}>Airfoils - Moso bamboo - 60" diameter</tr>
                            <tr style={{fontSize:"13px"}}>Airfoils Finishes - Caramel Bamboo or Cocoa Bamboo</tr>
                         </Table>
                     </Row>

                     <Row>
                        <span className={classes.title2}>Product Infomation</span>
                         <Table>
                            <img  className = {classes.logo} style={{marginRight: "1em"}} src={word} width="40px" height="40px" />
                             <span>CSI - Three Part Specifications(DOC)</span>
                             <img  className = {classes.logo} style={{marginRight: "1em",marginLeft:"20%"}} src={rvt} width="40px" height="40px" />
                             <span>BIM(RVT)</span> <br/><br/>
                             <img  className = {classes.logo} style={{marginRight: "1em"}} src={pdf} width="40px" height="40px" />
                             <span>Submittal(PDF)</span>
                             <img  className = {classes.logo} style={{marginRight: "1em",marginLeft:"34%"}} src={dwg} width="40px" height="40px" />
                             <span>Plan Views(DWG))</span><br/><br/>
                             <img  className = {classes.logo} style={{marginRight: "1em"}} src={pdf} width="40px" height="40px" />
                             <span>Control Options(PDF)</span>
                             <img  className = {classes.logo} style={{marginRight: "1em",marginLeft:"30%"}} src={dwg} width="40px" height="40px" />
                             <span>Elevation Views(DWG))</span>


                         </Table>
                     </Row>
                 </Container>
            </div>
        )
    }
}

export default ProductSummary;