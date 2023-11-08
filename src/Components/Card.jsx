import React from 'react'

function Card(props) {
  return (
    <div className='Whole CArd'>
    <div className='Card'>
    <h2 className='Content-h2'>{props.title}</h2>
     <div className='Content1'>

         <p className='Content-p'>{props.Para}</p>

        </div>
        <div className='Content2'>
         <img className="Content-img" src={props.images} alt='Inner File Missing'/>
     </div>
    </div>
    </div>
  )
}

export default Card