import { PreJoin } from "@livekit/components-react";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { axiosCommon } from "../../hooks/useAxiosCommon";
import "./MyPrejoin.css";

const MyPreJoin = ({ children }) => {
    const [token, setToken] = useState(null);
    const [formData, setFormData] = useState(null);
    const navigate = useNavigate();
    const roomName = location.pathname.split("/")[2];
    const { user: participantName } = useAuth();

    useEffect(() => {
        const inputTag = document.getElementById("username");
        participantName && (inputTag.value = participantName?.displayName);
        inputTag.nextSibling.disabled = false;
    }, [participantName])
    // This function handles the form submission
    const handleSubmit = async (data) => {
        try {
            const response = await axiosCommon.post("/getToken", {
                roomName,
                participantName: participantName?.displayName,
            });

            if (response.status !== 200) {
                throw new Error("Failed to fetch token");
            }

            setToken(response.data.token);  // Save the token to state
        } catch (error) {
            console.error("Error fetching token:", error);
        }

        // console.log("Form data submitted:", data);
        setFormData(data);
    };

    // If token is found, redirect to the room
    useEffect(() => {
        if (token) {
            navigate(`/room/${roomName}`);
        }
    }, [token, roomName, navigate]);

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-600">
            {/* Conditionally render PreJoin or children */}
            {token ? (
                React.cloneElement(children, { token, formData })  // Pass token as a prop to children
            ) : (
                <PreJoin onSubmit={handleSubmit} userLabel="Enter Your Username" />
            )}
        </div>
    );
};

export default MyPreJoin;
