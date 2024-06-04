import React from 'react'
import { useParams } from 'react-router-dom'

function CheckoutPage() {
  const {id} = useParams()
  console.log(id)
  return (
    <div>CheckoutPage</div>
  )
}

export default CheckoutPage