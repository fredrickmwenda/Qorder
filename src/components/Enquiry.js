import { useState } from 'react'
import { addDoc, collection, doc, getDocs, setDoc } from 'firebase/firestore';
import { db } from '../Firebase/auth';
import Emoji from './Emoji';




export default function Enquiry() {
  

  const [message, setMessage] = useState('');
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [selectedEmoji, setSelectedEmoji] = useState('');

  const handleEmojiSelect = (label) => {
    setSelectedEmoji({label});
  };
  

  const handleSubmit = async (event) => {
    event.preventDefault();
    try{ 
      const { symbol, label } = selectedEmoji;
      console.log(label)
      const formData = {
        message: message,
        reaction: label,
        rating: rating,
      };
       console.log(formData)  
    
      const enquiryRef = collection(db, 'enquiry');
      const enquirySnapshot = await getDocs(enquiryRef);
      if(enquirySnapshot.size === 0){
        console.log('no existing enquiry')
        await addDoc(enquiryRef,{dummy:true})
        console.log('Enquiry created successfully')
      }
      const newEnquiry = {
        message: formData.message,
        reaction: formData.reaction,
        rating: formData.rating,
      };

      await setDoc(doc(enquiryRef), newEnquiry);
      
      // Reset form fields
      setMessage('');
      setRating(0);
      setSelectedEmoji('');
    }
    catch(error){
      console.log(error)
    }
  };

  return (
    // sm:py-32
    <div className="isolate bg-white px-6 py-24  lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">FeedBack</h2>
        <p className="mt-2 text-lg leading-8 text-gray-600">
          Provide Feedback on the Restaurant, Menu and any Additional Info you would like added to the site
        </p>
      </div>
      <form onSubmit={handleSubmit} method="POST" className="mx-auto mt-16 max-w-xl sm:mt-20">
        <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label htmlFor="message" className="block text-sm font-semibold leading-6 text-gray-900">
              Reaction
            </label>
            <div className="">
              <Emoji
                symbol="😊"
                label="smiley-face"
                onSelect={() => handleEmojiSelect("smiley-face")}
                selected={selectedEmoji.label === "smiley-face"}
              />
              <Emoji
                symbol="😎"
                label="appreciative-face"
                onSelect={() => handleEmojiSelect("appreciative-face")}
                selected={selectedEmoji.label === "appreciative-face"}
              />
              <Emoji
                symbol="😃"
                label="grinning-face"
                onSelect={() => handleEmojiSelect("grinning-face")}
                selected={selectedEmoji.label === "grinning-face"}
              />
              <Emoji
                symbol="😞"
                label="disappointed-face"
                onSelect={() => handleEmojiSelect("disappointed-face")}
                selected={selectedEmoji.label === "disappointed-face"}
              />
              <Emoji
                symbol="😔"
                label="pensive-face"
                onSelect={() => handleEmojiSelect("pensive-face")}
                selected={selectedEmoji.label === "pensive-face"}
              />
            </div>
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="message" className="block text-sm font-semibold leading-6 text-gray-900">
              Rating
            </label>
            <div className="star-rating">
              {[...Array(5)].map((star, index) => {
                index += 1;
                return (
                  <button
                    type="button"
                    key={index}
                    className={index <= (hover || rating) ? "on" : "off"}
                    onClick={() => setRating(index)}
                    onMouseEnter={() => setHover(index)}
                    onMouseLeave={() => setHover(rating)}
                    style={{ fontSize: "24px", padding: "10px", color: index <= (hover || rating) ? "yellow" : "black", }}
                  >
                    <span className="star">&#9733;</span>
                  </button>
                );
              })}
            </div>
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="message" className="block text-sm font-semibold leading-6 text-gray-900">
              Message
            </label>
            <div className="mt-2.5">
              <textarea
                name="message"
                id="message"
                rows={4}
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              required/>
            </div>
          </div>


        </div>
        <div className="mt-10">
          <button
            type="submit"
            className="bg-transparent hover:bg-blue-500 text-blue-700 w-full cursor-pointer rounded-md border  py-3 px-5 text-base  font-semibold hover:text-white border-blue-500"
          >
            Leave Feedback
          </button>
        </div>
      </form>
    </div>
  )
}
