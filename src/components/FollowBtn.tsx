'use client'
import React from 'react'
import { toggleFollow } from '@/actions/followAction'
import { useOptimistic } from 'react'
import { useStore } from '@/store/useStore'

const FollowBtn = ({isFollowed, _id} : {isFollowed: boolean, _id: string}) => {
  const {setLoginModalOpen} = useStore((state) => state);

  const [optimisticState, setOptimisticState] = useOptimistic(
    { isFollowed },
    (optimisticState, newLikeState) => ({
      isFollowed: !optimisticState.isFollowed,
    })
  );


  const handleToggleFollow = async () => {
    setOptimisticState("");
    try {
      const res = await toggleFollow({user: _id})
      if(!res){
        setLoginModalOpen(true);
      }
    } catch (error) {
      setOptimisticState("");
      console.error("Error toggling Bookmark:", error);
    }
  };

  return (
    <button onClick={handleToggleFollow} className={`text-primary px-4 py-2 rounded-full ${optimisticState.isFollowed ? 'bg-secondaryDark/10 text-secondaryDark' : 'bg-secondaryDark '}`}>
      {optimisticState.isFollowed ? 'Following' : 'Follow'}
    </button>
  )
}

export default FollowBtn