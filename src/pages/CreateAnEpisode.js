import React from 'react'
import CreateAnEpisodeForm from '../components/CreateEpisode/CreateAnEpisodeForm'
import Header from '../components/common/Header'

const CreateAnEpisodePage = () => {
  return (
    <div>
        <Header />
        <div className='input-wrapper'>
        <h1>Create An Episode</h1>
        <CreateAnEpisodeForm />
        </div>
    </div>
  )
}

export default CreateAnEpisodePage