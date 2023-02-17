import React from 'react'

type FormFieldProps = {
  labelName: string;
  type: string;
  name: string;
  placeholder: string;
  value: string;
  handleChange?: React.ChangeEventHandler<HTMLInputElement>;
  isRandomize?: boolean;
  handleRandomize?: () => void;
}

const FormField = ({ 
  labelName, 
  type, 
  name, 
  placeholder, 
  value, 
  handleChange, 
  isRandomize, 
  handleRandomize
}: FormFieldProps): JSX.Element => {
  return (
    <div>
      <div className='flex items-center gasp-2 mb-2'>
        <label
          htmlFor={name}
          className='black text-sm font-medium text-gray-900'
        >
          {labelName}
        </label>

        {isRandomize && (
          <button
            type='button'
            className='font-semibold text-xs bg-[#EcECF1] py-1 px-2 mx-2 rounded-[5px] text-black hover:bg-gray-400 transition ease-in-out' 
            onClick={handleRandomize}
          >
            Randomize
          </button>
        )}
      </div>

      <input
        type={type}
        id={name}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        required
        className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#6469ff] focus:border-[#4649ff] outline-none block w-full p-3'
      />
    </div>
  )
}

export default FormField