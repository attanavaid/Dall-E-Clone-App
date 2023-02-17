import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import { logo } from './assets'
import { Home, CreatePost, About, Help } from './pages'

const App = () => {
  return (
    <BrowserRouter>
      <header className='w-full flex gap-2 items-center bg-white sm:px-8 px-4 py-4 border-b border-b-[#e6ebf4]'>
        <Link to="/">
          <img src={logo} alt={logo} className='left-0 w-44 object-contain'/>
        </Link>
        <div className='flex gap-2 right-[10px] absolute'>
          <Link to="/about" className='font-inter font-medium text-grey-800 px-5 py-2 rounded-md transition ease-in-out hover:bg-[#d6d6d6]'>
            About
          </Link>
          <Link to="/help" className='font-inter font-medium text-grey-800 px-5 py-2 rounded-md transition ease-in-out hover:bg-[#d6d6d6]'>
            Help
          </Link>
          <Link to="/create-post" className='font-inter font-medium bg-[#6469ff] text-white px-5 py-2 rounded-md transition ease-in-out hover:bg-[#4549bb]'>
            Create
          </Link>          
        </div>

      </header>

      <main className='sm:p-8 px-4 py-8 w-full bg-[#f9fafe] min-h-[calc(100vh-73px)]'>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/create-post' element={<CreatePost/>}/>
          <Route path='/about' element={<About/>}/>
          <Route path='/help' element={<Help/>}/>
        </Routes>
      </main>
    </BrowserRouter>
  )
}

export default App