const About = () => {
    return (
        <section className='max-w-7xl mx-auto'>
            <div>
                <h1 className='font-extrabold text-[#222328] text-[32px]'>
                    About
                </h1>
                <p className='mt-2 text-[#666e75] text-[16px] max-w-[600px]'>
                    This app was created by Atta Navaid using React (with Typescript), Express, Node, MongoDB, Vite, OpenAI, Cloudinary, and Tailwind CSS. 
                    <br/><br/>
                    The purpose of the project was to experiment on OpenAI's DALL-E, which is a new deep learning model and AI system that can create realistic images and art from a description (prompt) in natural language.
                </p>
            </div>
        </section>
    )
}

export default About