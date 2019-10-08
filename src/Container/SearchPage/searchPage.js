import React, {Component} from 'react';
import logo from './logo.png';
import classes from './searchPage.module.css';
import {IoMdSearch} from 'react-icons/io'
import { Link } from 'react-router-dom';
import Product from '../ProductList/product';


class searchPage extends Component {
    state = {
        searchValue : '',
        selection: ''
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
        
    render(){
        let value = this.state.searchValue;
        return(
            <html style={{backgroundImage:"linear-gradient(#7bb7f8ee, #ffffff)"}}>
            <div className={classes.search} >
                <img src={logo} width="20%" height="15%"/>
                <p >Build Product Selection Platform</p>
                <div className={classes.inline}>
                <select  name="Field" onChange={this.handleChangeSelect}>
                <option value="Mechanical">Mechanical</option>
                <option value="Civil">Civil</option>
                <option value="Electrical">Electrical</option>
                </select>
                <div className={classes.input}>
                    <input type="text" placeholder="search..." onChange={ this.handleChange } />
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