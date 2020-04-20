import React from 'react'
import { Link } from 'react-router-dom'


function user(){
    return(
        <div>
            <Link to="/statusTicket" className="btn btn-primary"> Status Ticket </Link>
            <Link to="/badges/new" className="btn btn-primary"> New Ticket</Link>
        </div>

    );
}

export default user;


