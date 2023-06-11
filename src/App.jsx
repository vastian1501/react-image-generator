import { useState } from 'react'
import { Configuration, OpenAIApi } from 'openai'
import BounceLoader from "react-spinners/BounceLoader";
import FileSaver from 'file-saver';

function App() {

  const [prompt, setPrompt] = useState("")
  const [image, setImage] = useState("")
  const [loading, setLoading] = useState(false);

  const configuration = new Configuration({
    organization: import.meta.env.VITE_API_ORGANIZATION,
    apiKey: import.meta.env.VITE_API_KEY
  })

  const openai = new OpenAIApi(configuration)

  const fetchData = async () => {
    try {
      setLoading(true)
      const response = await openai.createImage({
        prompt: prompt,
        n: 1,
        size: '512x512'
      })

      setImage(response.data.data[0].url)
      setLoading(false)

    } catch (error) {
      setLoading(false)
      console.log(error)
    }
  }

  const handleDownloadImage = () => {
    FileSaver.saveAs(image, 'image.png')
  }

  // if (2 == 2) {
  //   buttonSubmit = <button type="button" onClick={fetchData} className="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 shadow-lg shadow-cyan-500/50 dark:shadow-lg font-medium rounded-lg text-sm px-5 py-2.5 text-center">GENERAR</button>;
  // } else {
  //   buttonSubmit = <button disabled type="button" onClick={fetchData} className="text-white bg-gradient-to-r from-cyan-200 via-cyan-300 to-cyan-400 hover:bg-gradient-to-br focus:ring-4 shadow-lg shadow-cyan-300/50 dark:shadow-lg font-medium rounded-lg text-sm px-5 py-2.5 text-center cursor-default">GENERAR</button>;
  // }

  return (
    <>
      <div className='flex flex-col justify-center items-center min-h-screen'>


        {
          image ?
            <div className="neumorphism bg-white max-w-lg p-6 border border-gray-200 rounded-lg shadow ">
              <img src={image} alt="" srcset="" className='w-full' />
              <p className="my-3 font-normal text-gray-700 dark:text-gray-400">{prompt}</p>
              <button onClick={handleDownloadImage} className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white">
                <span className="relative flex px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                  Descargar
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="mx-2 w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                  </svg>
                </span>

              </button>

            </div> :
            <>
              <div className='neumorphism py-8 px-6 my-8 w-1/3 flex items-center justify-center'>
                <input className='p-2 mx-4 w-full rounded-md focus:border-gray-200 focus:ring-gray-300 border-gray-200' onChange={(e) => setPrompt(e.target.value)} type="text" placeholder='Escribe aquí lo que deseas generar' autoFocus />
                <button type="button" onClick={fetchData} className="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 shadow-lg shadow-cyan-500/50 dark:shadow-lg font-medium rounded-lg text-sm px-5 py-2.5 text-center">GENERAR</button>
              </div>
            </>
        }

        {loading ?
          <div className='flex flex-col items-center my-8'>
            <p>Generando imagen...</p>
            <BounceLoader />
          </div>
          :
          <div></div>
        }


        {image ? "" :
          <svg className='absolute bottom-0 -z-10' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
            <path fill="#f3f4f5" fill-opacity="0.5" d="M0,160L30,170.7C60,181,120,203,180,186.7C240,171,300,117,360,122.7C420,128,480,192,540,213.3C600,235,660,213,720,224C780,235,840,277,900,266.7C960,256,1020,192,1080,160C1140,128,1200,128,1260,154.7C1320,181,1380,235,1410,261.3L1440,288L1440,320L1410,320C1380,320,1320,320,1260,320C1200,320,1140,320,1080,320C1020,320,960,320,900,320C840,320,780,320,720,320C660,320,600,320,540,320C480,320,420,320,360,320C300,320,240,320,180,320C120,320,60,320,30,320L0,320Z"></path>
          </svg>
        }
      </div>
    </>
  )
}

export default App
