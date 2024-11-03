# MeetUp - Video Calling Web Application

MeetUp is a feature-rich video-calling application designed to enhance virtual collaboration across sectors like education, healthcare, corporate businesses, and community organizations. Built with high-definition video and interactive tools, MeetUp aims to make online meetings productive and seamless.

[Explore MeetUp](https://meetup-d48c4.web.app)

## Features
- **HD Video & Audio Streaming**
- **Screen Sharing & Real-Time Chat**
- **Interactive Whiteboard** for collaborative visuals
- **Role-Based Access Control** for secure meeting management
- **To-Do Lists** and **Meeting History** for improved meeting follow-ups
- **Real-Time Support** for smooth meeting experiences

## Installation Guide

1. **Clone the repository:**
    ```bash
    git clone https://github.com/takbirgazi/meetup-client.git
    ```

2. **Go to the project folder:**
    ```bash
    cd meetup-client 
    ```

3. **Install all packages:**
    ```bash
    npm install 
    ```

4. **Create a `.env.local` file** in the root directory and add the following environment variables:
    ```plaintext
    VITE_apiKey=your_api_key
    VITE_authDomain=your_auth_domain
    VITE_projectId=your_project_id
    VITE_storageBucket=your_storage_bucket
    VITE_messagingSenderId=your_messaging_sender_id
    VITE_appId=your_app_id
    VITE_API_URL=your_backend_api_url
    VITE_GEMENI_API_KEY=your_gemini_api_key
    ```

5. **Run the application:**
    ```bash
    npm run dev
    ```

## Backend Information
- **Backend GitHub Repository:** [MeetUp Server](https://github.com/takbirgazi/meetup-server)
- **Server API Base URL:** [MeetUp Server API](https://meetup-server-nine.vercel.app/)

## Frameworks and Tools Used
- **Tailwind CSS** - For styling and responsive design

## NPM Packages Used

- **react-helmet-async** - For managing document head
- **prop-types** - Typechecking for props
- **react-icons** - Icon components
- **rippleui** - Ripple UI for styling
- **moment** - Date manipulation library
- **sweetalert2** - For beautiful alerts and notifications
- **uuid** - Unique ID generation
- **react-hook-form** - Easy form validation and handling
- **axios** - HTTP client for making API requests
- **react-hot-toast** - Notifications
- **swiper** - Smooth slider for carousels
- **keen-slider** - Lightweight touch slider
- **@zegocloud/zego-uikit-prebuilt** - Zegocloud UI kit for video calling
- **Tidio** - Customer service chat integration
- **Emailjs** - For sending emails from the client
- **lucide-react** - Icon library
- **react-query** - For data fetching and caching

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.