import React from 'react';
import NavBar from './NavBar'


function Layout(props){
    return (
        <React.Fragment>
            <NavBar />
                {props.children}
        </React.Fragment>
    );
}

export default Layout;

// EL PROPS ES LO QUE LE VAS A PASAR POR ARGUMENTO 
// BROWSEROUTER -> PUEDE TENER UN HIJO

/*
function Layout(props){
    return (
        <div>
            <NavBar />
                {props.children}
        </div>
    );
}

export default Layout;*/
// return solo puede retornar un solo componentes como es el caso de los div, para depurar el codigo y eliminar div
// utilizamos React.Fragment