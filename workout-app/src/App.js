import './App.css';
import { useEffect, useState } from "react";

function App() {
  const [user, setUser] = useState(null); // Store user info

  const handleCallbackResponse = (response) => {    
    // Decode the JWT token to get user details
    const userObject = JSON.parse(atob(response.credential.split(".")[1]));
    setUser(userObject);
  };

  useEffect(() => {
    if (window.google) {
      window.google.accounts.id.initialize({
        client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
        callback: handleCallbackResponse,
      });

      window.google.accounts.id.renderButton(
        document.getElementById("sign-in-div"),
        { theme: "outline", size: "large" } 
      );
    }
  }, []);

  return (
    <div className="App">
      <div id="sign-in-div"></div>

      {user && (
        <div>
          <div>
            <h3>Welcome, {user.name}!</h3>
          </div>
          <div>
            <img src={user.picture} alt="profile-picture"/>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
