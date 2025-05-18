import { useState } from "react";

interface InputBoxesProps {
  onClose: () => void;
}

export const InputBoxes: React.FC<InputBoxesProps> = ({ onClose }) => {
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [companyName, setCompanyName] = useState("");

  async function sendEmail() {
    console.log("Entered into Testing API function of frontend");
    const payload: { fullName: string; email: string; companyName: string } = {
      email: email,
      fullName: fullName,
      companyName: companyName,
    };
    console.log("Payload before sending to backend is ", payload);
    try {
      const response = await fetch('http://localhost:8000/sendEmail', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      console.log("Response from backend is ", response);
    } catch (error) {
      console.error('Error:', error);
    }
  }

  return (
    <div className="p-6 max-w-md mx-auto">
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
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Send Email
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