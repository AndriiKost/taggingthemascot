import React, { Component } from 'react';
import { buckies } from './data'

class BuckyCheckList extends Component {
render () {

    return (
        <div>
        <ol>
        {buckies.features.map(el => ( 
            <li>
                {el.properties.name} at {el.properties.address}
            </li>
         ))}
        </ol>
        </div>
    )
}
}

  export default BuckyCheckList;