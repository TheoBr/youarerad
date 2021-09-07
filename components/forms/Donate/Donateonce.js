import React, { useState } from 'react'
import Ctahover from '../../lotties/cta.js'
import { fetchPostJSON } from '../../utils/api-helpers.js'
import { getStripe } from '../../utils/Get-stripe.js'

export default function Donateonce() {
  const [loading, setLoading] = useState(false)
  const [input, setInput] = useState()

  const handleInputChange = (e) => {
    const value = e.target.value
    setInput({
      ...input,
      value: Math.round(value * 100),
    })
  }

  console.log(input)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    const response = await fetchPostJSON('/api/checkout_sessions', {
      amount: input,
    })

    if (response.statusCode === 500) {
      console.error(response.message)
      return
    }

    const stripe = await getStripe()
    const { error } = await stripe.redirectToCheckout({
      sessionId: response.id,
    })
    console.warn(error.message)
    setLoading(false)
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="relative p-10 border rounded-xl bg-gray-50">
        <div
          role="group"
          aria-labelledby="donation-amount"
          className="grid items-center grid-cols-3 gap-5 min-w-max"
        >
          <div className="relative">
            <input type="radio" name="donation" value="30" id="300" onChange={handleInputChange} />
            <label className="relative radio-label" htmlFor="300">
              $30{' '}
            </label>
          </div>
          <input type="radio" name="donation" value="60" id="600" onChange={handleInputChange} />
          <label className="relative radio-label" htmlFor="600">
            $60
          </label>
          <input type="radio" name="donation" value="120" id="1200" onChange={handleInputChange} />
          <label className="relative radio-label" htmlFor="1200">
            $120
          </label>
          <input type="radio" name="donation" value="300" id="3000" onChange={handleInputChange} />
          <label className="relative radio-label" htmlFor="3000">
            $300
          </label>
          <div className="col-span-2">
            <label
              className="block text-sm font-medium text-gray-700 "
              onChange={handleInputChange}
            >
              Donate Other
            </label>
            <div className="mt-1 border-b border-gray-300 ">
              <input
                type="number"
                name="donation"
                id="donateother"
                className="block w-full px-3 py-2 border-transparent rounded-xl sm:text-sm"
                placeholder="300"
                onChange={handleInputChange}
              />
            </div>
          </div>
        </div>

        <button
          disabled={loading}
          type="submit"
          className="relative w-full col-span-3 p-2 mx-auto mt-20 overflow-hidden text-xl transition-all duration-300 ease-linear bg-white border-2 border-black fitems-center lg:mx-0 rounded-xl shadow-primary hover:shadow-none hover:bg-black hover:text-white"
        >
          <span className="relative z-10 w-full font-bold text-center">Donate</span>
          <div className="absolute top-0 z-0">
            <Ctahover />
          </div>
        </button>
      </form>
    </div>
  )
}
