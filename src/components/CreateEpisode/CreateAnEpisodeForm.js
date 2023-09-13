import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import InputComponent from '../common/input';
import FileInput from '../common/input/FileInput';
import Button from '../common/Button';
import { auth, db, storage } from '../../firebase';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { addDoc, collection } from 'firebase/firestore';

const CreateAnEpisodeForm = () => {

  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [audioFile, setAudioFile] = useState('');

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const audioFileHandle = (file) => {
    setAudioFile(file);
  }

  const handleSubmit = async() => {
    setLoading(true);
    if(title, desc, audioFile, id){
        try{
            const audioRef = ref(
                storage,
                `podcast-episodes/${auth.currentUser.uid}/${Date.now()}`
            );
            await uploadBytes(audioRef, audioFile);

            const audioURL = await getDownloadURL(audioRef);
            const episodeData = {
                title : title,
                description : desc,
                audioFile: audioURL,
            };

            await addDoc(
                collection(db, 'podcasts', id, 'episodes'),
                episodeData
            );
            toast.success('Episode created successfully');
            setLoading(false);
            navigate(`/podcast/${id}`);
            setTitle('');
            setDesc('');
            setAudioFile('');
        }
        catch(e){
            toast.error(e.message);
            setLoading(false);
        }
    }
    else{
        toast.error('Please Fill All The Fields!');
        setLoading(false);
    }
  }

  return (
    <>
        <InputComponent
            state={title} 
            setState={setTitle}
            placeholder='Title'
            type='text'
            required={true}
        />
        <InputComponent
            state={desc} 
            setState={setDesc}
            placeholder='Description'
            type='text'
            required={true}
        />
        <FileInput
            accept={'audio/*'}
            id='audio-file-input'
            fileHandleFunc={audioFileHandle}
            text = {'Upload Audio File'}
        />
        <Button
            text={loading ? 'Loading...' : 'Create Episode'} 
            disabled={loading} 
            onClick={handleSubmit}
        />
    </>
  )
}

export default CreateAnEpisodeForm