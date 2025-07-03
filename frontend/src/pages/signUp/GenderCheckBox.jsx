import React from 'react'

const GenderCheckBox = ({onCheckboxChange, selectedGender}) => {
  return (
    <div className="flex gap-4 items-center mt-3">
      <label className={`label cursor-pointer ${selectedGender === "male" ? "selected" : ""}`}>
        <input type="checkbox" className="checkbox checkbox-info" 
          checked={selectedGender === "male"}
          onChange={() => onCheckboxChange("male")}
        />
        <span className="label-text ml-2">Male</span>
      </label>
      <label className={`label cursor-pointer ${selectedGender === "female" ? "selected" : ""}`}>
        <input type="checkbox" className="checkbox checkbox-accent" 
          checked={selectedGender === "female"}
          onChange={() => onCheckboxChange("female")}
        />
        <span className="label-text ml-2">Female</span>
      </label>
    </div>
  )
}

export default GenderCheckBox
