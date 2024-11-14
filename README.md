# Routine-Vue
Build with Vue3. <a href="https://routine-lemon.vercel.app/">Deployed on Vercel</a>. Used Firebase-auth.

<a href="https://github.com/SayedTahsin/Routine-Hono">Back-end Repo</a>

### Feature
- Firebase user authentication
- JWT token based session manange
- Add Task with Different Pre-defined(weekdays) and custom categories.
- Edit/Delete tasks
- Resets Tasks Based on Schedule
- Calculate Consistency Percentage

### Run Locally
```sh
$ git clone git@github.com:SayedTahsin/Routine-Vue.git
$ cd Routine-Vue
```
- create a .env file and fill the value from your firebase project
```
VITE_APIKEY=
VITE_AUTHDOMAIN=
VITE_PROJECTID=
VITE_STORAGEBUCKET=
VITE_MESSAGINGSENDERID=
VITE_APPID=
VITE_MEASUREMENTID=
VITE_API_URL=https://routine.mail-tahsin99.workers.dev/
```
```sh
$ npm i
$ npm run dev
```

## TODO's
- [x] Make Todo Component with Add button
- [x] Make Grobal Add button Button
- [x] Firebase Integration (Vuefire)
- [x] User Api Integration
- [x] Pinia Setup for User
- [x] Session Management
- [x] Task Api Integration
- [x] reset text
- [x] Disable Other Weekdays
- [x] Category List
- [x] fix reload when add task from navbar
- [x] consistancy feature
- [x] loader
- [x] catchAll route
- [x] Proper CSS with dark mode w primary/secondary color
- [x] Deploy on vercel
- [x] fix CORS Error
- [ ] fix cookies issue
