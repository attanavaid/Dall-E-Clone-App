import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { preview } from '../assets'
import { FormField, Loader } from '../components'
import { getRandomPrompt } from '../utils'

const CreatePost = () => {
    const navigate = useNavigate();
    const [generatingImage, setGeneratingImage] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false)
    const [form, setForm] = useState<any>({
        name: '',
        prompt: '',
        photo: '',
    })   
    
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [event.target.name]: event.target.value })
    }

    const handleRandomize = () => {
        const randomPrompt = getRandomPrompt(form.prompt)
        setForm({ ...form, prompt: randomPrompt })
    }

    const generateImage = async () => {
        if (form.prompt) {
            try {
                setGeneratingImage(true)
                
                const response = await fetch('http://localhost:8080/api/v1/dalle', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ prompt: form.prompt, })
                })
                
                const data = await response.json()
                setForm({ ...form, photo: `data:image/jpeg;base64,${data.photo}`})
            }
        
            catch (error) {
                alert(error)
                console.log(error)
            }

            finally {
                setGeneratingImage(false)
            }
        }

        else {
            alert('Please enter a prompt.')
        }
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        if (form.prompt && form.photo) {
            setLoading(true)

            try {
                setGeneratingImage(true)
                
                const response = await fetch('http://localhost:8080/api/v1/post', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(form)
                })
                
                await response.json()
                navigate('/')
            }
        
            catch (error) {
                alert(error)
                console.log(error)
            }

            finally {
                setLoading(false)
            }
        }

        else {
            alert('Please enter a prompt and generate an image.')
        }
    }

    return (
        <section className='max-w-7xl mx-auto'>
            <div>
                <h1 className='font-extrabold text-[#222328] text-[32px]'>
                    Create
                </h1>
                <p className='mt-2 text-[#666e75] text-[16px] max-w-[600px]'>
                    Generate an image using DALL-E AI and share it with us!
                    <br/>
                    Enter a valid name and prompt. For the prompt, you can enter your own ideas or choose one from a random list.
                </p>
            </div>

            <form className='mt-16 max-w-3xl' onSubmit={handleSubmit}>
                <div className='flex flex-col gap-5'>
                    <FormField
                        labelName='Your name'
                        type='text'
                        name='name'
                        placeholder='John Doe'
                        value={form.name}
                        handleChange={handleChange}
                    />

                    <FormField
                        labelName='Prompt'
                        type='text'
                        name='prompt'
                        placeholder='A personal computer with rgb lights placed next to a grey wall'
                        value={form.prompt}
                        handleChange={handleChange}
                        isRandomize={true}
                        handleRandomize={handleRandomize}
                    />

                    <div className='relative bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-64 p-3 h-64 flex justify-center items-center'>
                        {form.photo ? (
                            <img 
                                src={form.photo}
                                alt={form.prompt}
                                className='w-full h-full object-contain'
                            />
                        ) : (
                            <img
                                src={preview}
                                alt='preview'
                                className='w-9/12 h-9/12 object-contain opacity-40'
                            />
                        )}

                        {generatingImage && (
                            <div className='absolute inset-0 z-0 flex justify-center items-center bg-[rgba(0,0,0,0.5)] rounded-lg'>
                                <Loader/>
                            </div>
                        )}
                    </div>
                </div>

                <div className='mt-5 flex gap-5'>
                    <button
                        type='button'
                        onClick={generateImage}
                        className='text-white bg-blue-500 font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center transition ease-in-out hover:bg-blue-900'
                    >
                        {generatingImage ? 'Generating...' : 'Generate'}
                    </button>
                </div>

                <div className='mt-10'>
                    <p className='mt-2 text-[#666e75] text-[14px]'>
                        We highly encourage you to share your generated images!
                    </p>

                    <button
                        type='submit'
                        className='mt-3 text-white bg-[#6469ff] font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center transition ease-in-out hover:bg-[#4549bb]'
                    >
                        {loading ? 'Sharing...' : 'Share'}
                    </button>
                </div>
            </form>
        </section>
    )
}

export default CreatePost