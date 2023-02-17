import React, { useState, useEffect } from 'react'
import { Card, FormField, Loader } from '../components'

type RenderCardProps = {
    data: any;
    title: string;
};

type PhotoInfo = {
    _id: number;
    name: string;
    prompt: string;
    photo: string;
};

const RenderCards = ({ data, title }: RenderCardProps): JSX.Element => {
    if (data?.length > 0) {
        return (
            data.map((post: PhotoInfo) =>
                <Card key={post._id} {...post}/>
            )
        )
    }

    return (
        <h2 className='mt-5 font-bold text-[#6469ff] text-xl uppercase'>
            {title}
        </h2>
    )
}

const Home = () => {
    const [loading, setLoading] = useState<boolean>(false)
    const [allPosts, setallPosts] = useState<PhotoInfo[]>([])
    const [searchText, setSearchText] = useState<string>('')
    const [searchedResults, setSearchedResults] = useState<PhotoInfo[]>([])
    const [searchTimeout, setSearchTimeout] = useState<number>(0)

    const fetchPosts =  async () => {
        setLoading(true)

        try {
            const response = await fetch('https://api.render.com/deploy/srv-cfnd244gqg415e1t16fg?key=FZc2nMWQb9Q/api/v1/post', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            
            if (response.ok) {
                const result = await response.json()
                setallPosts(result.data.reverse())
            }
        }
    
        catch (error) {
            alert(error)
            console.log(error)
        }

        finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchPosts()
    }, [])

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        clearTimeout(searchTimeout)
        setSearchText(event.target.value)

        setSearchTimeout(
            setTimeout(() => {
              const searchResult = allPosts.filter((item: PhotoInfo) => item.name.toLowerCase().includes(searchText.toLowerCase()) || item.prompt.toLowerCase().includes(searchText.toLowerCase()))
              setSearchedResults(searchResult)
            }, 500)
        )
    }

    return (
        <section className='max-w-7xl mx-auto'>
            <div>
                <h1 className='font-extrabold text-[#222328] text-[32px]'>
                    Generated Images Showcase
                </h1>
                <p className='mt-2 text-[#666e75] text-[16px] max-w-[600px]'>
                    Browse through images that were generated by Open AI's DALL-E.
                    Click "Create" on the top right to start generating images yourself!
                    Share your generatred images to have them be displayed on the home page.
                </p>
            </div>

            <div className='mt-16'>
                <FormField
                    labelName='Search'
                    type='text'
                    name='search'
                    placeholder='Water'
                    value={searchText}
                    handleChange={handleSearchChange}
                />
            </div>

            <div className='mt-10'>
                {loading ? (
                    <div className='flex justify-center items-center'>
                        <Loader/>
                    </div>    
                ) : (
                    <>
                        {searchText && (
                            <h2 className='font-medium text-[#666e75] text-xl mb-3'>
                                Showing Results for <span className='text-[#222328]'>{searchText}</span>
                            </h2>
                        )}

                        <div className='grid lg:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-3'>
                            {searchText ? (
                                <RenderCards
                                    data={searchedResults}
                                    title='No search results found'
                                />
                            ) : (
                                <RenderCards
                                    data={allPosts}
                                    title='No posts found'
                                />   
                            )}
                        </div>
                    </>
                )}
            </div>
        </section>
    )
}

export default Home