import { useCallback, useState, useRef } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import './App.css';

function App() {
  const fileRef = useRef()
  
  const [profileImg, setProfileImg] = useState(() => fileRef?.current?.files?.[0], [fileRef])
  const [profileImgUrl, setProfileImgUrl] = useState(null)

  const handleImageChange = useCallback((event) => {
    if(!event.target?.files?.[0])
      return

    let reader = new FileReader()
    
    reader.onload = (e) => {
      setProfileImg(e.target.result)
    }

    reader.readAsDataURL(event.target.files[0]);
  }, [])

  const handleUpload = useCallback(async(event) => {
    try {
      event.preventDefault()
      const formData = new FormData()
      formData.append('file', fileRef?.current?.files?.[0])

      const response = 
      await fetch('http://localhost:3333/upload',{ method: 'post', body: formData })

      const parsedResponse = await response.json()

      setProfileImgUrl(parsedResponse.url)

      return toast.success('Foto de perfil atualizada com sucesso')
    } 
    catch (error) {
      return toast.error(
        'Erro ao atualizar foto de perfil... Tente novamente mais tarde'
      ) 
    }
  },[])

  return (
    <div className="App">
      <ToastContainer />

      <form onSubmit={handleUpload}>
        <h2>Minha imagem de perfil</h2>

        <input type="file" hidden ref={fileRef} onChange={handleImageChange}/>

        <button 
          onClick={() => fileRef?.current.click()}
          type="button"
          className="profile-picker"
        >
          {profileImg ?
          (<img src={profileImg} alt="Imagem de perfil" />) : 
          (<div className="profile-placeholder"></div>)}
        </button>

        <div className="actions">
          <button
            type="button"
            onClick={() => fileRef?.current.click()}
          >Escolher imagem
          </button>

          <button type="submit" disabled={!profileImg}>Enviar</button>
        </div>

      </form>
      
      <div className="upload-result">
      {profileImgUrl && (
        <>
          <h2>Sua nova imagem está disponível em:</h2>
          <a href={profileImgUrl} target="_blank">{profileImgUrl}</a>
        </>
      )}
      </div>
    </div>
  );
}

export default App;
