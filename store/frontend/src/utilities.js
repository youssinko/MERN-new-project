import React from 'react'

function getError(error) {
  return (
    
        error.response && error.response.data.message
        ? error.response.data.message
        //return message defined in the backend (server.js)(message:page not found)
        : error.message
    
  )
}

export default getError