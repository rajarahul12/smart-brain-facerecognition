import React from 'react';
import './FaceRecognition.css';
const FaceRecognition = ({imageUrl,box}) => {
	return(
		<div className='center ma'>
			<div className='absolute mt2'>
				<img id="inputimage" src={`${imageUrl}`} alt="" width='500px' height='auto' />
				
				{Array.apply(null,Array(box.length)).map((item,i)=>{
					return(
						<div key={i} className='bounding-box' 
						style={{top:box[i].topRow, right:box[i].rightCol, bottom:box[i].bottomRow , left:box[i].leftCol}}>
						</div>
						);
				},this)}


				{
					/*
				<div className='bounding-box' 
				style={{top:box[0].topRow, right:box[0].rightCol, bottom:box[0].bottomRow , left:box[0].leftCol}}>
				</div>
				<div className='bounding-box' 
				style={{top:box[1].topRow, right:box[1].rightCol, bottom:box[1].bottomRow , left:box[1].leftCol}}>
				</div>
					*/
				}
				
			</div>
		</div>
		)
}

export default FaceRecognition;