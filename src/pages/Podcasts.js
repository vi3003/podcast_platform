import React, { useEffect, useState } from 'react'
import Header from '../components/common/Header'
import { collection, onSnapshot, query } from 'firebase/firestore'
import { db } from '../firebase'
import { setPodcasts } from '../slices/podcastSlice'
import { useDispatch, useSelector } from 'react-redux'
import PodcastCard from '../components/Podcasts/PodcastsCard'
import InputComponent from '../components/common/input';

const PodcastsPage = () => {

  const dispatch = useDispatch();
  const [search, setSearch] = useState('');
  const podcasts = useSelector((state) => state.podcasts.podcasts)

  useEffect(()=> {
    const unsubscribe = onSnapshot(
      query(collection(db,'podcasts')),
      (querySnapshot) => {
        const podcastsData = [];
        querySnapshot.forEach((doc) => {
          podcastsData.push({ id: doc.id, ...doc.data() });
        });
        dispatch(setPodcasts(podcastsData));
      },
      (error) => {
        console.error('Error fetching podcasts:', error);
      }
    );
    return() => {
      unsubscribe()
    }
  },[dispatch]);

  var filteredPodcasts = podcasts
  .filter((item)=>item.title.trim()
  .toLowerCase()
  .includes(search.trim().toLowerCase()))

  return (
    <div>
        <Header />
        <div className='input-wrapper' style={{marginTop:'0rem'}}>
          <h1>Discover Podcasts</h1>
          <InputComponent
            state={search} 
            setState={setSearch}
            placeholder='Search By Title'
            type='text'
          />
          {filteredPodcasts.length > 0 ? (
           <div className='podcasts-flex' style={{marginTop: '1.5rem'}}>
            {filteredPodcasts.map((item) =>{
              return(
                <PodcastCard
                  key={item.id}
                  id={item.id} 
                  title={item.title}
                  displayImg={item.displayImg}
                />
              );
            })}
           </div>
          ):(
            <p>{search ? 'Podcasts Not Found' : 'No current podcasts'}</p>
          )}
        </div>
        
    </div>
  )
}

export default PodcastsPage;