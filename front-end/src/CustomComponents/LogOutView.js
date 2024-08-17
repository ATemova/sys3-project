import React, { useEffect } from 'react';
import axios from 'axios';
import { API_URL } from "../Utils/Configuration";

const LogOutView = ({ onLogoutSuccess }) => {
  useEffect(() => {
    const logOut = async () => {
      try {
        const response = await axios.post(`${API_URL}/logout`, {}, { withCredentials: true });
        if (response.data.status && response.data.status.success) {
          onLogoutSuccess();
        } else {
          console.error("Logout failed:", response.data);
          onLogoutSuccess(); // Redirect even if logout fails
        }
      } catch (error) {
        console.error("Error logging out:", error);
        onLogoutSuccess(); // Redirect even if there's an error
      }
    };

    logOut();
  }, [onLogoutSuccess]);

  return null; // Return nothing to not show any text or UI
};

export default LogOutView;