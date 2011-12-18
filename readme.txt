Mission Statement
To create a faster, easier to use livehelp/livechat software

Todo (in no particular order)
- Add more detailed information about the user
- Improve front end experiance
	- Get rid of alert and replace with form (name, email);
	- remove fixed position div, and make a better dragable/closable window that can be manipulated
- Add audible notification of incoming messaage (html5 audio) agent/client
- Add agent authentication
- Add support issues (sales/service/billing, etc) to client form
	- make support issues user defineable
	- maybe segregate by department (sales/service/billing/ etc.)
- make admin area
- Save chats to db
- If client types before agent opens the window, store it in a db, and load it when the window is opened
- If client has chatted before, load those chat sessions as well (or possibility of getting access to them)
- Logged in agent detection
- Automatically log agents out if they are inactive (redis for agent data maybe)
- Improve ease of integration
- Notification if another agent has answered a client (possibly lock it so other agents can't answer it?)

_______________________________________________________________
Non-opensource plans for a possible premium version

- Real-time Analytics

- Mobile friendly version of the agent section (maybe some kind of touchUI library)
	OR
- Mobile app with push notifications

________________________________________________________________
Non-opensource wishlist for a possible premium version
- Features that olark has that I might like to integrate
	- API to send chat logs to and recieve user information from a CRM
	- Integration with IM clients