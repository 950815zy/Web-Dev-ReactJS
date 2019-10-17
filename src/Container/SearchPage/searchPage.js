import React, {Component} from 'react';
import logo from './logo.png';
import classes from './searchPage.module.css';
import {IoMdSearch} from 'react-icons/io'
import { Link } from 'react-router-dom';
import Product from '../ProductList/product';
import images from '../ProductList/images.jpeg'
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import * as actions from '../../Store/actions/index';
import {logout} from '../../Store/actions/auth'
import {Dropdown,DropdownButton,DropdownToggle} from 'react-bootstrap';

class searchPage extends Component {
    state = {
        searchValue : '',
        selection: '',
        redirect: false,
        userId:''
  
    };

    componentDidMount() {
        this.setState({userId:localStorage.userId});}

    handleChange = (e) => {
        this.setState({searchValue : e.target.value});
    }

    handleChangeSelect = (e) => {
        this.setState({selection : e.target.value});
    }

    handleClick = () => {
         console.log(this.state.searchValue);
    };

    handleKeyPress =(e) => {
        if(e.key === 'Enter'){
            this.setState({redirect: true})

        }
    }

    logOut = () => {
        logout();
        console.log(localStorage);
    }
        
    render(){
        if (this.state.redirect) {
            return (<Redirect push to={`/product/${this.state.selection}/${this.state.searchValue}`} />)
          }
        let value = this.state.searchValue;
        return(
            <html style={{backgroundImage:"linear-gradient(#7bb7f8ee, #ffffff)"}}>
            <div style={{float:"right",width: "20%", display: "flex"}}>
                <span  style={{marginTop:"2em",fontSize:"18px"}}>Hello, {this.state.userId}</span>
                <DropdownButton className={classes.drop} style={{width:"25%",height:"20%",marginLeft:"20px",marginTop:"10px",marginRight:"10px",padding:"0 0 0 0"}}
                        title={<img src={images} style={{margin:"0 0 0 0",padding:"0 0 0 0"}} width="100%" height="100%" />}
                                            size="sm"
                    >
                    <Dropdown.Item onClick={this.logOut}  style={{fontSize:"11px" , width:"5px"}}>Log Out</Dropdown.Item>
                    </DropdownButton>   
            </div>
            <div className={classes.search} >
                <img src={logo} />
                <p >Build Product Selection Platform</p>
                <div className={classes.inline}>
                <select  name="Field" onChange={this.handleChangeSelect}>
                <option value="Mechanical">Mechanical</option>
                <option value="Civil">Civil</option>
                <option value="Electrical">Electrical</option>
                </select>
                <div className={classes.input}>
                    <input type="text" onKeyPress={this.handleKeyPress} placeholder="search..." onChange={ this.handleChange } />
                    <Link to={`/product/${this.state.selection}/${this.state.searchValue}`}>

                    <IoMdSearch /></Link>
                    

                </div>
                </div>
            </div>
            </html>
        )
    }
}

export default searchPage;