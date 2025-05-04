function InputBoxes() {
  return (
      <div
        className="right-sided-form"
        style={{
          border: '2px solid #1f2937', // Dark gray for a sleek look
          width: '30%',
          height: '60%',
          backgroundColor: '#f9fafb', 
          borderRadius: '8px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', // Subtle shadow for depth
          padding: '20px',
          gap: '15px', // Space between elements
        }}
      >
        <div className="full-name-label"
          style={{
            width: '80%',
            display: 'flex',
            alignItems: 'flex-start',
            fontSize: '16px',
            fontWeight: '600', // Bold for labels
            color: '#1f2937', // Dark gray text
          }}
        >
          Full Name
        </div>
        <input className="full-name-input"
          type="text"
          placeholder="Enter Full Name"
          style={{
            width: '80%',
            padding: '10px',
            border: '1px solid #d1d5db', // Light gray border
            borderRadius: '5px',
            fontSize: '14px',
            color: '#1f2937',
            backgroundColor: '#ffffff', // White background for inputs
            outline: 'none',
            transition: 'border-color 0.2s ease-in-out', // Smooth transition for hover/focus
          }}
          onMouseOver={(e) => (e.currentTarget.style.borderColor = '#3b82f6')} // Blue border on hover
          onMouseOut={(e) => (e.currentTarget.style.borderColor = '#d1d5db')} // Reset on mouse out
          onFocus={(e) => (e.currentTarget.style.borderColor = '#3b82f6')} // Blue border on focus
          onBlur={(e) => (e.currentTarget.style.borderColor = '#d1d5db')} // Reset on blur
        />
        <div className="email-label"
          style={{
            width: '80%',
            display: 'flex',
            alignItems: 'flex-start',
            fontSize: '16px',
            fontWeight: '600',
            color: '#1f2937',
          }}
        >
          Email
        </div>
        <input className="email-input"
          type="email"
          placeholder="Enter Email"
          style={{
            width: '80%',
            padding: '10px',
            border: '1px solid #d1d5db',
            borderRadius: '5px',
            fontSize: '14px',
            color: '#1f2937',
            backgroundColor: '#ffffff',
            outline: 'none',
            transition: 'border-color 0.2s ease-in-out',
          }}
          onMouseOver={(e) => (e.currentTarget.style.borderColor = '#3b82f6')}
          onMouseOut={(e) => (e.currentTarget.style.borderColor = '#d1d5db')}
          onFocus={(e) => (e.currentTarget.style.borderColor = '#3b82f6')}
          onBlur={(e) => (e.currentTarget.style.borderColor = '#d1d5db')}
        />
        <div className="company-name-label"
          style={{
            width: '80%',
            display: 'flex',
            alignItems: 'flex-start',
            fontSize: '16px',
            fontWeight: '600',
            color: '#1f2937',
          }}
        >
          Company Name
        </div>
        <input className="email-input"
          type="text"
          placeholder="Enter Company Name"
          style={{
            width: '80%',
            padding: '10px',
            border: '1px solid #d1d5db',
            borderRadius: '5px',
            fontSize: '14px',
            color: '#1f2937',
            backgroundColor: '#ffffff',
            outline: 'none',
            transition: 'border-color 0.2s ease-in-out',
          }}
          onMouseOver={(e) => (e.currentTarget.style.borderColor = '#3b82f6')}
          onMouseOut={(e) => (e.currentTarget.style.borderColor = '#d1d5db')}
          onFocus={(e) => (e.currentTarget.style.borderColor = '#3b82f6')}
          onBlur={(e) => (e.currentTarget.style.borderColor = '#d1d5db')}
        />
        <button className="submit-button"
          style={{
            width: '80%',
            padding: '10px',
            backgroundColor: '#3b82f6', // Blue background for the button
            color: '#ffffff', // White text
            border: 'none',
            borderRadius: '5px',
            fontSize: '16px',
            fontWeight: '500',
            cursor: 'pointer',
            transition: 'background-color 0.2s ease-in-out', // Smooth hover transition
          }}
          onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#2563eb')} // Darker blue on hover
          onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#3b82f6')} // Reset on mouse out
          onClick={() => console.log('Form submitted')}
        >
          Submit
        </button>
      </div>
  );
};

export default InputBoxes;