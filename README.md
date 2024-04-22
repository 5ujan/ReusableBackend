# Reusable backend for your CRUD apps
The default template to kickstart your projects 
- Originally for specific-purpose projects so some changes might be necessary
- Follows a good convention for backend. Simple, organized, understandble and structured.

## Google OAuth 2.0
Clone the ```main``` branch if you want to implement google oauth2.0 

```git clone https://github.com/5ujan/ReusableBackend``` 

and get started.
### Passport & JWT
- Uses passport strategy for authentication, after each creates a jwt to save sessions.
- jwt is sent back from the authwindow that opens up for logging in.
- message needs to be read from the main window (explained more in routes/auth.js)

### Image upload features
Advanced cloudinary image upload mechanism for achieving temporary links to modify images before finalizing upload
- upload images---> get image link for previewing and post after confirmation
- originally intended for a blog website so very useful to save space for temporary images that weren't used in the final post
- needs two folders in the cloudinary storage, temp and final, temp cleared after each post only transferring finalized images.

## Password-based Authentication
Check ```password-login``` branch for password based authentication 