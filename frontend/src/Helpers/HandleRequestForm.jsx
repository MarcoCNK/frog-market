import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const HandleRequestForm = async (responseHTTP) => {
    const [isOk, setIsOk] = useState(false);
    const [message, setMessage] = useState('')
    const navigate = useNavigate()

    try {
        // Handle the response
      const data = await responseHTTP.json();
      const messageFromData = data.response.message;
      // IsOk
      setIsOk(data.response.ok)

      setMessage(data.response.ok
        ? 'We have sent you an email to confirm your account.'
        : messageFromData)

      if (messageFromData == "Logged successfully!") {
        setTimeout(() => {
          navigate('/home');
        }, 2000);
      }
    } catch (error) {
      setMessage("An error occurred. Please try again later.");
    }
  return {isOk, message}
}

export default HandleRequestForm