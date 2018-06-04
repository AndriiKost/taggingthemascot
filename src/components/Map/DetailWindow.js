import React from 'react';



const DetailWindow = (buckyTitle, buckyAddress, buckyID, imgFileName) => {
        console.log(buckyTitle, buckyAddress, buckyID, imgFileName)

        let img = (imgFileName)
        ? `https://deliandigital.com/wp-content/uploads/2018/06/${imgFileName}`
        : null

    return(
        <div class='BuckyOnMap' style='display: grid; grid-template-columns: 1fr 1fr;width="300px"'>
            <div class='buckyImage'>
            <img
              src={img} width="30%" height="auto"/>
            </div>
              <div class='description'>
                <h1>{buckyTitle}</h1>
                <h2>{buckyAddress}</h2>
            </div>
        </div>
        )
}

export default DetailWindow;