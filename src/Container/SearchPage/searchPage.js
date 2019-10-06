import React, {Component} from 'react';
import logo from './logo.png';
import classes from './searchPage.module.css';
class searchPage extends Component {

    render(){
        return(
            <html style={{backgroundImage:"linear-gradient(#7bb7f8ee, #ffffff)"}}>
            <div className={classes.search}>
    
                <img src={logo} width="20%" height="15%"/>
                <h2 >Build Product Selection Platform</h2>
                <div className={classes.inline}>
                <select style={{float: "left"}} name="Field">
                <option value="Mechanical">Mechanical</option>
                <option value="Civil">Civil</option>
                <option value="Electrical">Electrical</option>
                </select>
                <input type="text" placeholder="search..." />
                </div>
            </div>
            </html>
        )
    }
}

export default searchPage;