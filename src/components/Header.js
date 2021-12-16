import React from 'react'
import PropTypes from 'prop-types'
import Button from './Button'
const Header = (props) => {
    // const onClick = () =>{
    //     console.log('click');
    // }
    return(
        <header className='header'>
            <h1>{props.title}</h1>
            { !props.showEditTask && <Button color={props.showAddTask? 'red':'green'} text={props.showAddTask? 'Close':'Add'} onClick={props.onAdd}/>}
            { props.showEditTask && <Button color='black' text='Back' onClick={props.onBack}/>}
        </header>
    )
}

Header.defaultProps ={
    title: 'default name',
}

Header.propTypes={
    title: PropTypes.string.isRequired,
}

// const headingStyles = {
//     color:'red',
//     backgroundColor: 'green'
// }


export default Header

// import react from "react"

// class Header extends react.Component{
//     render(){
//         return <h1>test {this.props.name}</h1>
//     }
// }

// export default Header