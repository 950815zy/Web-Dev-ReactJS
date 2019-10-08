import React, { Component } from 'react';
import axios from 'axios';
import logo from '../Auth/logo.png';
import classes from './product.module.css'
import images from './images.jpeg'
import { Link } from 'react-router-dom';
import {searchPage}  from '../SearchPage/searchPage'
import ReactSlider from 'react-slider';
import { Container, Row, Col } from 'react-bootstrap';
import url from 'url';
import styled from 'styled-components';

const StyledSlider = styled(ReactSlider)`
    width: 95%;
    height: 5px;
    
`;

const StyledThumb = styled.div`
    height: 8px;
    line-height: 10px;
    width: 8px;
    font-size:0px;
    text-align: center;
    background-color: rgb(158, 155, 155);
    color: blue;
    border-radius: 50%;
    cursor: grab;
`;

const Thumb = (props, state) => <StyledThumb {...props}>{state.valueNow}</StyledThumb>;

const StyledTrack = styled.div`
    top: 0;
    bottom: 0;
    background: ${props => props.index === 2 ? 'rgb(231, 230, 230)' : props.index === 1 ? 'rgb(158, 155, 155)' : 'rgb(231, 230, 230)'};
    border-radius: 999px;
`;
const Track = (props, state) => <StyledTrack {...props} index={state.index} />;

class Product extends Component {
    
    state = {
            data: [],
            filter: [{title: 'Airflow(CFM)', defaultValue:[3000,7000], valueRange:[2000,10000]},
                    {title: 'Max Power(W)', defaultValue:[20,80], valueRange:[0,100]},
                    {title: 'Sound at max speed(dBA)', defaultValue:[20,80], valueRange:[0,100]},
                    {title: 'Fan sweep diameter(in)', defaultValue:[20,80], valueRange:[0,100]},
                    {title: 'Height(in)', defaultValue:[20,80], valueRange:[0,100]}],
            filter2: [{title:'Firm', defaultValue:[0,10], valueRange:[0,10]},
                        {title:'Global', defaultValue:[0,1500], valueRange:[0,1500]}],    
            checked : []
        };

    componentDidMount() {
        let token = "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJra2siLCJleHAiOjE1NzA1ODEzMTQsImlhdCI6MTU3MDU0NTMxNH0.SlPoRQVUxqJsf7OkLfQEMSqb5MBZOMm1LglDM9qYD5r_Lt3bv58twpVLV1tw2PIDv1dbXjS4_Wp96mPjdugo0g";
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

    handleChange = (value) => {
        this.setState({value:this.state.filter.defaulValue});
        // console.log(event);
      }

    save = () => {
        // this.setState({filter : filter_copy});
        // this.setState({data: data_copy});
        console.log(this.state.data)
        this.setState({data : this.state.data.filter(el=>
            el.airflow>=this.state.filter[0].defaultValue[0] &&
            el.airflow<=this.state.filter[0].defaultValue[1] &&
            el.powerMax>=this.state.filter[1].defaultValue[0] &&
            el.powerMax<=this.state.filter[1].defaultValue[1] &&
            el.soundMaxSpeed>=this.state.filter[2].defaultValue[0] &&
            el.soundMaxSpeed<=this.state.filter[2].defaultValue[1] &&
            el.fanSweep>=this.state.filter[3].defaultValue[0] &&
            el.fanSweep<=this.state.filter[3].defaultValue[1] 
            )})
    }

    handleCheckClick = () => {
        this.setState({ checked: !this.state.checked });
      }

    render(){
    return(
        <div>
            <div className={classes.outer}>
                    <img  className = {classes.logo} src={logo} width="10%" height="5%" />
                    <input className = {classes.input} type="text" placeholder="search..."/>
                         Project
                    <img className = {classes.head} src={images} width="4%" height="1.5%" />
            </div>

            <div className={classes.inner}>
                <div className={classes.lefttable}>
                    <label className={classes.searchLabel}>Search: </label>
                    <button className={classes.button1} onClick={this.save}>Save</button>
                    <button className={classes.button1}>Clear</button><br/>
                    <button className={classes.button2} >Product</button>  
                    <button className={classes.button2} >Project</button>  
                    <p className={classes.title}>  Product Type</p>
                    <p className={classes.smallFont}>Model year: <input type="text"/> - <input type="text"/></p>
                    <p className={classes.title}>Technical Specification</p>
                    
                    {this.state.filter.map(link=>(
                        <div>
                            <p className={classes.smallFont}>{link.title}</p>
                            <div className={classes.selector}>
                                <input className={classes.minvalue} type="text" value={link.defaultValue[0]}/>
                                <div className={classes.slider}>
                                <StyledSlider
                                    defaultValue={link.defaultValue}
                                    renderTrack={Track}
                                    renderThumb={Thumb}
                                    min={link.valueRange[0]}
                                    max={link.valueRange[1]}
                                    onChange={this.handleChange}
                                    value={link.defaulValue}
                                    /></div>
                                <input className={classes.maxvalue} type="text" value={link.defaultValue[1]}/>

                            </div>
                        </div>
                    ))}
                    <p className={classes.title}>Brand</p>
                    <p className={classes.title}>Past Selections</p>

                    {this.state.filter2.map(link=>(
                    <div>
                        <p className={classes.smallFont}>{link.title}</p>
                            <div className={classes.selector}>
                                <input className={classes.minvalue} type="text" value={link.defaultValue[0]}/>
                                    <div className={classes.slider}>
                                    <StyledSlider
                                        defaultValue={link.defaultValue}
                                        renderTrack={Track}
                                        renderThumb={Thumb}
                                        min={link.valueRange[0]}
                                        max={link.valueRange[1]}
                                        onChange={this.handleChange}
                                        value={link.defaulValue}
                                    /></div>
                                <input className={classes.maxvalue} type="text" value={link.defaultValue[1]}/>
                            </div>
                        </div>
                    ))}
                    <p className={classes.title}>Configurations</p>
                </div>
                <div  className="container">
                    <span style={{color: "rgb(35, 67, 148)", fontSize:"1em", fontWeight:"bold"}}>{this.props.match.params.selection} ></span>
                    <span>{this.props.match.params.searchVal}</span>

                    <Container className="container">
                        <Row>
                            {this.state.data.map(link=>{
                            return(
                            <Col xs={3} className={classes.column}>
                                <div  key={link.manufacturer} id='cardItem' >
                                    <Link to={`/productSummary/${this.props.match.params.selection}/${this.props.match.params.searchVal}/${link.pid}`}>
                                    <img className={classes.fan} src={require(`./${link.manufacturer}.jpg`)} width="50%" height="50%"/>
                                    
                                    </Link>
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
                                    <div className={classes.thirdPart}>
                                        <span>Past specifications:</span><br/>
                                        <span>{link.firm} firm / {link.glob} global</span>
                                    </div>
                                    <div className={classes.fourthPart}>
                                        <input type="checkbox" /> 
                                        <span>Compare</span>
                                    </div>
                                </div>    
                            </Col>)})} 
                        </Row>
                    </Container>
                </div>
            </div>
        </div>

    );
        
    }
}    

export default Product;

