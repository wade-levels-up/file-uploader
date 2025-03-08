# file-uploader

⛰️ Objective: The objective of this project was to create a cloud-based file upload and download service with secure user authentication. User are able to sign up, log in and then upload a file that they can download. The user is also able to create folders to store their files in and view file information such as size, type and upload date.

💪🏻 Challenges: The main technology and challenge I faced was working with Supabase for the first time to handle storing files, though also planning out how those files would be accessed and where a database fitted into the whole equation. In the end I realised that the database wouldn't hold files itself, but it would hold meta-data in the form of relative file URL paths. The relative file URL paths when combined with the Supabase storage API credentials would let users access their files via a Signed URL. As with the previous project on user auth it was imperative I was double checking I was implemeting things in a secure manner.

⚙️ Technologies Used: HTML, CSS, JavaScript, Node.js, Express, EJS, PostgreSQL, Passport, Express-Session, Supabase

A live version of the project can be found here. Hosted by Railway: file-uploader-production-30c7.up.railway.app 🚅
