import React, {Component} from 'react';
import logo from './logo.png';
import classes from './searchPage.module.css';
import {IoMdSearch} from 'react-icons/io'
import { Link } from 'react-router-dom';
import Product from '../ProductList/product';
import images from '../ProductList/images.jpeg'
import { Redirect } from 'react-router';

class searchPage extends Component {
    state = {
        searchValue : '',
        selection: '',
        redirect: false
    };

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
        
    render(){
        if (this.state.redirect) {
            return (<Redirect push to={`/product/${this.state.selection}/${this.state.searchValue}`} />)
          }
        let value = this.state.searchValue;
        return(
            <html style={{backgroundImage:"linear-gradient(#7bb7f8ee, #ffffff)"}}>
            <div style={{float:"right",width: "15%", display: "flex"}}>
                    <span style={{marginTop:"10%"}}>Projects</span>
                    <img style={{marginLeft:"10px",marginRight:"20px"}} src={images} width="25%" height="20%" />
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