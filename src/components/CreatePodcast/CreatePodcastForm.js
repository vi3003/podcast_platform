import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import InputComponent from '../common/input';
import Button from '../common/Button';
import { toast } from 'react-toastify';
import FileInput from '../common/input/FileInput';
import { auth, db, storage } from '../../firebase';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { addDoc, collection } from 'firebase/firestore';

const CreatePodcastForm = () => {
    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const [displayImg, setDisplayImg] = useState();
    const [bannerImg, setBannerImg] = useState();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const displayImgHandleFunc = (file) => {
      setDisplayImg(file);
    }

    const bannerImgHandleFunc = (file) => {
      setBannerImg(file);
    }

    const handleSubmit = async () => {
      setLoading(true);
      if (title && desc && displayImg && bannerImg) {
        // 1. upload files -> get downloadable links
        try {
          // display image
          const displayImgRef = ref(
            storage, 
            `podcasts/${auth.currentUser.uid}/${Date.now()}`
          );
          await uploadBytes(displayImgRef, displayImg);
          console.log('uploaded')
            
          const displayImgUrl = await getDownloadURL(displayImgRef);
          console.log("display Image", displayImgUrl);
          
          // banner image
          const bannerImgRef = ref(
            storage, 
            `podcasts/${auth.currentUser.uid}/${Date.now()}`
          );
          await uploadBytes(bannerImgRef, bannerImg);
          console.log('uploaded')
            
          const bannerImgUrl = await getDownloadURL(bannerImgRef);
          const podcastData = {
            title: title,
            description: desc,
            displayImg:displayImgUrl,
            bannerImg:bannerImgUrl,
            createdBy: auth.currentUser.uid,
            // profilPic: fileURL,
          };
          const docRef = await addDoc(collection(db, 'podcasts'),podcastData);
          setTitle('');
          setDesc('');
          setDisplayImg(null);
          setBannerImg(null);
          
          toast.success('Podcast created!');
          setLoading(false);
        } catch (e) {
          toast.error(e.message);
          setLoading(false);
        }
        
        // 2. create new doc in new collection called podcasts
        // 3. save the new podcast episodes in the podcasts
      } else {
        toast.error('Please fill all fields');
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
        accept={'image/*'}
        id='display-image-input'
        fileHandleFunc={displayImgHandleFunc}
        text = {'Upload Display Image'}
      />
      <FileInput
        accept={'image/*'}
        id='banner-image-input'
        fileHandleFunc={bannerImgHandleFunc}
        text = {'Upload Banner Image'}
      />
      <Button
       text={loading ? 'Loading...' : 'Create Podcast'} 
       disabled={loading} 
       onClick={handleSubmit}/>
      </>
  )
}

export default CreatePodcastForm