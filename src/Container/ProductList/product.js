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
import {FaTrashAlt} from "react-icons/fa";
import styled from 'styled-components';
import {Dropdown,DropdownButton,DropdownToggle} from 'react-bootstrap';
import 'pure-react-carousel/dist/react-carousel.es.css';
import {logout} from '../../Store/actions/auth'
import { IoIosArrowForward, IoIosArrowDown} from "react-icons/io";


const StyledSlider = styled(ReactSlider)`
    width: 100%;
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
            filteredData: [],
            filter: [{title: 'Airflow(CFM)', defaultValue:[3000,7000], valueRange:[2000,10000]},
                    {title: 'Max Power(W)', defaultValue:[20,80], valueRange:[0,100]},
                    {title: 'Sound at max speed(dBA)', defaultValue:[20,80], valueRange:[0,100]},
                    {title: 'Fan sweep diameter(in)', defaultValue:[20,80], valueRange:[0,100]},
                    {title: 'Height(in)', defaultValue:[20,80], valueRange:[0,100]}],
            filter_copy: [{title: 'Airflow(CFM)', defaultValue:[3000,7000], valueRange:[2000,10000]},
                            {title: 'Max Power(W)', defaultValue:[20,80], valueRange:[0,100]},
                            {title: 'Sound at max speed(dBA)', defaultValue:[20,80], valueRange:[0,100]},
                            {title: 'Fan sweep diameter(in)', defaultValue:[20,80], valueRange:[0,100]},
                            {title: 'Height(in)', defaultValue:[20,80], valueRange:[0,100]}],
            filter2: [{title:'Firm', defaultValue:[0,10], valueRange:[0,10]},
                        {title:'Global', defaultValue:[0,1500], valueRange:[0,1500]}],  
            checkedBoxes: [],
            ModelYearMin : '',
            ModelYearMax : '',
            showComponent: 'productBox',
            project: [],
            bgColor:'',
            bgColor2:'',
            userId:'',
            collapse:false,
            collapse2:false,
            collapse3:false,
            collapse4:false,
            collapse5:false
  
        };

    componentDidMount() {
        this.setState({userId:localStorage.userId});
        let token = "Bearer " +  localStorage.token;
        let url = "/user/getAllProd";
        axios({
            url:url,
            token: token,
            method:'get',
            headers:{
                Authorization: token
            }
        })
        .then((response) => {this.setState({data: response.data});this.setState({filteredData: response.data}); console.log(response);})
        .catch((error) => {
            console.log(error)});
    }

    saveProject = () =>{
        let url2 = "user/add";
        let token = "Bearer " +  localStorage.token;
        for(var i in this.state.project.map(a=>a.link.manufacturer)) {
            
        axios({
            url:url2,
            token:token,
            method:"post",
            headers:{
                Authorization:token
            },
            data: [i, localStorage.userId]
        })}
    }


    handleChange = (value, index) => {
        const {filter} = this.state;
        this.setState({
            filter: [...filter.slice(0, index), {...filter[index], defaultValue: value}, ...filter.slice(index + 1)]
        })
      }

    handleChange2 = (value, index) => {
    const {filter2} = this.state;
    this.setState({
        filter2: [...filter2.slice(0, index), {...filter2[index], defaultValue: value}, ...filter2.slice(index + 1)]
    })
    }

    save = () => {
        // this.setState({filter : filter_copy});
        // this.setState({data: data_copy});
        console.log(this.state.data);
        const data = [ ...this.state.data ];
        const filteredData = data.filter(el=>
            el.airflow>=this.state.filter[0].defaultValue[0] &&
            el.airflow<=this.state.filter[0].defaultValue[1] &&
            el.powerMax>=this.state.filter[1].defaultValue[0] &&
            el.powerMax<=this.state.filter[1].defaultValue[1] &&
            el.soundMaxSpeed>=this.state.filter[2].defaultValue[0] &&
            el.soundMaxSpeed<=this.state.filter[2].defaultValue[1] &&
            el.fanSweep>=this.state.filter[3].defaultValue[0] &&
            el.fanSweep<=this.state.filter[3].defaultValue[1] &&
            el.modelYear>=this.state.ModelYearMin &&
            el.modelYear<=this.state.ModelYearMax &&
            el.firm>=this.state.filter2[0].defaultValue[0] &&
            el.firm<=this.state.filter2[0].defaultValue[1] &&
            el.glob>=this.state.filter2[1].defaultValue[0] &&
            el.glob<=this.state.filter2[1].defaultValue[1]
            );
        // console.log(filteredData);
        this.setState({filteredData})
    }

    clear = () => {
        const copy_filter = [...this.state.filter_copy];
        this.state.filteredData = this.state.data;
        this.setState({filter : copy_filter});
        this.setState({ModelYearMin:''});
        this.setState({ModelYearMax:''});
        console.log(this.state.filter[0].defaultValue)
    }

    

    handleModelYearMin = (e) => {
        this.setState({ModelYearMin:e.target.value});
    }

    handleModelYearMax = (e) => {
        this.setState({ModelYearMax:e.target.value});
    }

    handleCheckbox = (e, s) => {
        const checkedBox = [...this.state.checkedBoxes];
        if(e.target.checked) {
            checkedBox.push(s)
        } else {
          const index = checkedBox.findIndex((ch) => ch.manufacturer === s.manufacturer);
          checkedBox.splice(index, 1);
        }
        this.setState({checkedBoxes:checkedBox});
      }

    toggleDiv = (name) => {
    if(name === "product"){
            this.setState({
                showComponent: "productBox"
            });
            this.setState({
                bgColor: "rgb(5, 112, 233)"
            });
            this.setState({
                bgColor2: "white"
            });
        }else{
            this.setState({
                showComponent: "projectBox"
            });
            this.setState({
                bgColor2: "rgb(5, 112, 233)"
            });
            this.setState({
                bgColor: "white"
            });
    }
    }


    addProj = (prod) => {
        const projectList = [...this.state.project];
        projectList.push(prod);
        this.setState({project:projectList});
    }

    deleteProj = (prod) => {
        const projectList1 = [...this.state.project];
        projectList1.splice(projectList1.indexOf(prod), 1); 
        this.setState({project:projectList1});
    }

    logOut = () => {
        logout();
        console.log(localStorage);
    }

    changeCollapse = () => {this.setState({collapse: true})}
    changeCollapse2 = () => {this.setState({collapse: false})}
    changeCollapse3 = () => {this.setState({collapse2: true})}
    changeCollapse4 = () => {this.setState({collapse2: false})}
    changeCollapse5 = () => {this.setState({collapse3: true})}
    changeCollapse6 = () => {this.setState({collapse3: false})}
    changeCollapse7 = () => {this.setState({collapse4: true})}
    changeCollapse8 = () => {this.setState({collapse4: false})}
    changeCollapse9 = () => {this.setState({collapse5: true})}
    changeCollapse10 = () => {this.setState({collapse5: false})}

    render(){
    return(
        <div>
            <div className={classes.outer}>
                    <img  className = {classes.logo} src={logo} width="10%" height="5%" />
                    <input className = {classes.input} type="text" placeholder="search..."/>
                    <span style={{marginTop:"20px",fontSize:"18px"}}>Hello, {this.state.userId} </span> 
                    <DropdownButton className={classes.drop} style={{width:"5%",height:"4%",marginLeft:"20px",marginTop:"10px",marginRight:"10px"}}
                        title={<img src={images} style={{margin:"0 0 0 0",padding:"0 0 0 0"}} width="100%" height="100%" />}
                        size="sm"
                    >
                    <Dropdown.Item onClick={this.logOut}  style={{fontSize:"11px" , width:"5px"}}>Log Out</Dropdown.Item>
                    </DropdownButton>
                    {/* <img onClick={this.logOut} style={{marginLeft:"20px",marginTop:"10px",marginRight:"10px"}} src={images} width="5%" height="3%" /> */}
            </div>

            <div className={classes.inner}>
                <div className={classes.lefttable}>
                    <label className={classes.searchLabel}>Search: </label>
                    <button className={classes.button1} onClick={this.save}>Save</button>
                    <button className={classes.button1} onClick={this.clear}>Clear</button><br/>
                    <button className={classes.button2} style={{backgroundColor: this.state.bgColor}} onClick={(param) => this.toggleDiv("product")} >Product</button> 
                    <button className={classes.button2} style={{backgroundColor: this.state.bgColor2}} onClick={(param) => this.toggleDiv("project")}>Project</button>  
                    <p className={classes.title}>Product Type  {this.state.collapse === false ? 
                    <IoIosArrowForward onClick={this.changeCollapse} className={classes.collapse}/>
                    :<IoIosArrowDown onClick={this.changeCollapse2} className={classes.collapse}/>} </p> 
                        {this.state.collapse === true ? 
                        <p className={classes.smallFont}>Model year: <input onChange={this.handleModelYearMin} value={this.state.ModelYearMin} style={{width: "23%", height:"1.2em"}} type="text"/> - 
                        <input onChange={this.handleModelYearMax} value={this.state.ModelYearMax} style={{width: "23%", height:"1.2em"}} type="text"/></p>
                        : null}

                    <p className={classes.title}>Technical Specifications  {this.state.collapse2 === false ? 
                    <IoIosArrowForward onClick={this.changeCollapse3} className={classes.collapse}/>
                    :<IoIosArrowDown onClick={this.changeCollapse4} className={classes.collapse}/>} </p> 
                        {this.state.collapse2 === true ?                     
                    this.state.filter.map((link, index)=>(
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
                                    onChange={(value) => this.handleChange(value, index)}
                                    value={link.defaultValue}
                                    /></div>
                                <input className={classes.maxvalue} type="text" value={link.defaultValue[1]}/>

                            </div>
                        </div>
                    )) : null}
                    <p className={classes.title}>Brand  {this.state.collapse3 === false ? 
                        <IoIosArrowForward onClick={this.changeCollapse5} className={classes.collapse}/>
                        :<IoIosArrowDown onClick={this.changeCollapse6} className={classes.collapse}/>} </p>                     
                    <p className={classes.title}>Past Selections  {this.state.collapse4 === false ? 
                        <IoIosArrowForward onClick={this.changeCollapse7} className={classes.collapse}/>
                        :<IoIosArrowDown onClick={this.changeCollapse8} className={classes.collapse}/>} </p> 
                    {this.state.collapse4 === true ?  
                    this.state.filter2.map((link, index)=>(
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
                                        onChange={(value) => this.handleChange2(value, index)}
                                        value={link.defaulValue}
                                    /></div>
                                <input className={classes.maxvalue} type="text" value={link.defaultValue[1]}/>
                            </div>
                        </div>
                    )):null}
                    <p className={classes.title}>Configurations  {this.state.collapse5 === false ? 
                    <IoIosArrowForward onClick={this.changeCollapse9} className={classes.collapse}/>
                    :<IoIosArrowDown onClick={this.changeCollapse10} className={classes.collapse}/>} </p>                 </div>
                        {this.state.showComponent === "productBox" && (
                        <div  style={{maxWidth:"98%"}}>
                            <span style={{color: "rgb(35, 67, 148)", fontSize:"1em", fontWeight:"bold"}}>{this.props.match.params.selection} ></span>
                            <span style={{color:"grey", fontSize:"1em", fontWeight:"bold"}}>{this.props.match.params.searchVal}</span>
                
                    <Container  style={{maxWidth:"100%"}} className={classes.righttable}>
                        <Row>
                            {this.state.filteredData.map(link=>{
                            return(
                            <Col xs={3} className={classes.column}>
                                <div  key={link.manufacturer} id='cardItem' >
                                    <span style={{color:"blue", fontSize:"11px", float:"right"}}>verified {link.modelYear}</span>
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
                                        <input type="checkbox"
                                            checked={this.state.checkedBoxes.find((ch)=>ch.manufacturer === link.manufacturer)}
                                            onChange={(e) => this.handleCheckbox(e,link)}
                                            /> 
                                        <span >Compare</span>                                    
                                        <DropdownButton className={classes.dropdown}
                                            id={`dropdown-variants-Primary`}
                                            title="Add to"
                                            size="sm"
                                            >
                                            <Dropdown.Item onClick={(param) => this.addProj({link})} style={{fontSize:"13px" }}>Project</Dropdown.Item>
                                        </DropdownButton>
                                    </div>
                                </div>    
                            </Col>)})} 
                            <Col>
                                <Link to={{pathname:`/compare/${this.props.match.params.selection}/${this.props.match.params.searchVal}`, state: this.state.checkedBoxes}}>
                                <button>Compare</button></Link>
                            </Col>
                        </Row>
                    </Container>

                </div>)}
                {this.state.showComponent === "projectBox" && (
                    <div  style={{maxWidth:"98%"}}>
                    <span style={{color: "rgb(35, 67, 148)", fontSize:"1em", fontWeight:"bold"}}>{this.props.match.params.selection} ></span>
                    <span style={{color:"grey", fontSize:"1em", fontWeight:"bold"}}>{this.props.match.params.searchVal}</span>
                

                    <Container  className={classes.righttable}>
                        <Row>
                            {this.state.project.length === 0 ? 
                            <span style={{color: "red", marginLeft:"10px", fontSize:"16px"}}>You don't have any product in this project</span> :
                            this.state.project.map(link=>{
                            return(
                            <Col xs={3} className={classes.column}>
                                <div  key={link.link.manufacturer} id='cardItem' >
                                    <span style={{color:"blue", fontSize:"11px", float:"right"}}>verified {link.link.modelYear}</span>
                                    <Link to={`/productSummary/${this.props.match.params.selection}/${this.props.match.params.searchVal}/${link.link.pid}`}>
                                    <img className={classes.fan} src={require(`./${link.link.manufacturer}.jpg`)} width="50%" height="50%"/>
                                    </Link>
                                    <div className={classes.firstPart}>
                                        <span>{link.link.manufacturer}</span><br/>
                                        <span>{link.link.series}</span><br/>
                                        <span>{link.link.model}</span><br/>
                                        
                                    </div>
                                    <div className={classes.secondPart}> 
                                        <span>{link.link.airflow} CFM</span><br/>
                                        <span>{link.link.powerMax} W at max speed</span><br/>
                                        <span>{link.link.soundMaxSpeed} dBA ar max speed</span><br/>
                                        <span>{link.link.fanSweep} fan sweep diameter</span><br/>
                                    </div>
                                    <div className={classes.thirdPart}>
                                        <span>Past specifications:</span><br/>
                                        <span>{link.link.firm} firm / {link.link.glob} global</span>
                                    </div>
                                    <div className={classes.fourthPart}>
                                        <input type="checkbox"
                                            checked={this.state.checkedBoxes.find((ch)=>ch.manufacturer === link.link.manufacturer)}
                                            onChange={(e) => this.handleCheckbox(e,link)}
                                            /> 
                                        <span >Compare</span>
                                        <FaTrashAlt style={{float:"right",margin:"1.5em 1em 0.5em 0",width:"15px",height:"15px",color:"rgb(35, 67, 148)"}} onClick={(param) => this.deleteProj(`${link}`)}/>
                                    </div>
                                </div>    
                            </Col>)})} 
                        </Row>
                        <button style={{float:"right",color: "white", marginRight:"20%",backgroundColor: "rgb(35, 67, 148)"}} onClick={this.saveProject}>SAVE</button>
                    </Container>

                </div>
                     )}
            </div>
        </div>

    );
        
    }
}    

export default Product;

