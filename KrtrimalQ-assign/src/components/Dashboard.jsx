import React, { useState, useEffect, useMemo } from 'react';
import { LogOut } from 'lucide-react';
import {

  signOut,
} from 'firebase/auth';
import auth from '../firebase';
import profile from '../assets/profile.png';
import axios from 'axios';
import TableComp from './TableComp';
import { cardDetails } from '../util';


const DashboardPage = ({ user }) => {
  const [usersList, setUsersList] = useState({});
  const [usersDetails, setUsersDetails] = useState({});


  useEffect(() => {
    const fetchUsers = async () => {
      const url = 'https://7q3k6vhat1.execute-api.ap-south-1.amazonaws.com/dev/profile';
      const requestBody = {
        count: 150,
        country_code: 'en_IN',
        aadhar: true,
        dl: true,
        credit: true,
        debit: true,
        pan: true,
        passport: true,
        ssn: false
      };
      try {
        const response = await axios.post(url, requestBody);
        setUsersList(response?.data);
      } catch (error) {
        console.error("Failed to fetch users", error);
      }
    };
    const fetchDetails = async () => {
      const url = 'https://7q3k6vhat1.execute-api.ap-south-1.amazonaws.com/dev/card/credit';
      const requestBody = {
        count: 250,
        country_code: 'en_IN',
      };
      try {
        const response = await axios.post(url, requestBody);
        setUsersDetails({columns: cardDetails, data: response?.data?.data})
      } catch (error) {
        console.error("Failed to fetch users", error);
      }
    };

    fetchUsers();
    fetchDetails()
  }, []);

  console.log(usersDetails)

  const handleLogout = () => {
    localStorage.removeItem('userData');
    localStorage.removeItem('userToken');
    signOut(auth);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            <img
              src={profile}
              alt="Profile"
              className="w-10 h-10 rounded-full mr-3"
            />
            <div>
              <h1 className="text-xl font-semibold">{user?.displayName}</h1>
              <p className="text-gray-600 text-sm">{user?.email}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-300"
          >
            <LogOut className="mr-2" />
            Logout
          </button>
        </div>
        <div className='flex text-center text-xl text-white px-4 py-2 fw-md rounded bg-red-600 transition duration-300'>
          Welcome to Dashboard
        </div>
        <TableComp users={usersList} title="User Details"/>
        <TableComp users={usersDetails}  title="Card Details"/>

      </div>
    </div>
  );
};

export default DashboardPage