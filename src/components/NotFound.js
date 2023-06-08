import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound(){
    return(
        <div>
            <img src='../404.svg'  alt='not-found' />
            <p style={{textAlign:"center"}}>
              <Link to="/">Go to Home </Link>
            </p>
        </div>
    )
}