import { useState } from "react";
import { Notification } from "./Notification";  
interface InputBoxesProps {
  onClose: () => void;
}

export const InputBoxes: React.FC<InputBoxesProps> = ({ onClose }) => {
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [showNotification, setShowNotification] = useState(false);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Add a notification for success or failure, 
  // Don't close the modal
  // But reset the input fields
  function hitNotification(response: any) {
    console.log("Response from backend after sending mail is", response);
    // If everythng is fine, reset the input fields and Don't close the modal
    setShowNotification(true);
    if (response.success) {
      // onClose();
      // Give a success notification on right top
      setEmail("");
      setFullName("");
      setCompanyName("");
      setMessage("Email sent successfully to " + email);
    } 
    else {
      // Give a failure notification on right top
      setMessage("Failed to send email to {" + email + " }");
    }
  }

  async function sendEmail() {
    // console.log("Entered into Testing API function of frontend");
    const payload: { fullName: string; email: string; companyName: string } = {
      email: email,
      fullName: fullName,
      companyName: companyName,
    };
    // console.log("Payload before sending to backend is ", payload);
    try {
      setIsLoading(true);
      const response = await fetch('http://localhost:8000/sendEmail', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),  
      });
      const data = await response.json();
      console.log("Response data from backend is", data);
      hitNotification(data);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="p-6 max-w-md mx-auto">
      {showNotification && (
        <Notification
          success={success}
          message={message}
        />
      )}
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Recruiter's Full Name</label>
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="mt-1 pl-2 block w-full h-12 rounded-lg border-2 border-gray-200 bg-gray-50 focus:border-blue-500 focus:ring-blue-500 focus:ring-2 focus:ring-offset-2 focus:outline-none focus:shadow-lg focus:shadow-blue-200 transition-all duration-200"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Recruiter's Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 pl-2 block w-full h-12 rounded-lg border-2 border-gray-200 bg-gray-50 focus:border-blue-500 focus:ring-blue-500 focus:ring-2 focus:ring-offset-2 focus:outline-none focus:shadow-lg focus:shadow-blue-200 transition-all duration-200"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Company Name</label>
          <input
            type="text"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            className="mt-1 pl-2 block w-full h-12 rounded-lg border-2 border-gray-200 bg-gray-50 focus:border-blue-500 focus:ring-blue-500 focus:ring-2 focus:ring-offset-2 focus:outline-none focus:shadow-lg focus:shadow-blue-200 transition-all duration-200"
          />
        </div>
      </div>

      <div className="flex justify-center gap-4 mt-6">
        <button
          onClick={sendEmail}
          disabled={isLoading}
          className={`w-full flex items-center justify-center gap-2 py-2 px-4 rounded ${
            isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 text-white hover:bg-blue-600'
          }`}
        >
          {isLoading ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              <span>Sending...</span>
            </>
          ) : (
            'Send Email'
          )}
        </button>
        <button
          onClick={onClose}
          className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default InputBoxes;