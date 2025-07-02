import React from 'react'

const GenderCheckBox = () => {
  return (
    <div className="flex gap-4 items-center mt-3">
      <label className="label cursor-pointer">
        <input type="checkbox" className="checkbox checkbox-info" />
        <span className="label-text ml-2">Male</span>
      </label>
      <label className="label cursor-pointer">
        <input type="checkbox" className="checkbox checkbox-accent" />
        <span className="label-text ml-2">Female</span>
      </label>
    </div>
  )
}

export default GenderCheckBox
