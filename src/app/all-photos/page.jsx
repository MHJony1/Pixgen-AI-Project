// import PhotoCard from '@/components/PhotoCard';
// import React from 'react';

// const AllPhotosPage = async () => {
//   const res = await fetch ("https://pixgen-ai-project.vercel.app/data.json");
//   const photos = await res.json();
//   return (
//     <div>
//       <h1 className="text-2xl font-bold m-4">All Photos</h1>

//       <div className="grid grid-cols-4 gap-5">
//                 {photos.map(photo=> <PhotoCard key={photo.id} photo={photo}/>)}
//             </div>
//     </div>
//   );
// };

// export default AllPhotosPage;


import PhotoCard from '@/components/PhotoCard';
import React from 'react';

export const dynamic = 'force-dynamic'; // এটা মাস্ট!

const AllPhotosPage = async () => {
  let photos = []; // ডেটা রাখার জন্য একটি ভেরিয়েবল
  let errorMessage = "";

  try {
    const res = await fetch("https://pixgen-ai-project.vercel.app/data.json", {
      cache: 'no-store'
    });

    if (!res.ok) throw new Error("Failed to fetch");

    photos = await res.json();
  } catch (error) {
    errorMessage = error.message;
  }

  // try/catch এর বাইরে return করুন, তাহলে আর লাল দাগ আসবে না
  if (errorMessage) {
    return <div className="p-10 text-center">Error: {errorMessage}</div>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold m-4">All Photos</h1>
      <div className="grid grid-cols-4 gap-5">
        {photos.map(photo => (
          <PhotoCard key={photo.id} photo={photo} />
        ))}
      </div>
    </div>
  );
};

export default AllPhotosPage;