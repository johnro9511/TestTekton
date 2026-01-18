# TestTekton
Leave Management

Main features
•	User login (Employee or Manager)
•	Create vacation requests
•	View own requests (Employee)
•	View and manage all requests (Manager)
•	Approve/Reject requests
•	Business validations:
	o	Approved vacations that overlap are not allowed
	o	Requests for more than 15 consecutive days are automatically rejected
•	Responsive interface with Tailwind CSS
________________________________________

General architecture
/backend → ASP.NET Core Web API
/frontend → React + TypeScript (Vite)
Frontend and backend are decoupled and communicate via HTTP (Axios).
________________________________________

Backend (.NET)

Technologies used
•	.NET 8 – ASP.NET Core Web API
•	Entity Framework Core
•	SQLite (local database)
•	Swagger (API documentation)
________________________________________
Backend structure

backend/
├── Controllers/
├── Data/
├── Models/
├── DTOs/
├── Services/
├── Program.cs
└── appsettings.json
________________________________________

How to run the backend
Requirements
•	.NET SDK 8+

Steps:
cd backend/LeaveManagement
dotnet restore
dotnet ef database update
dotnet run

The backend runs by default at:
https://localhost:5001
________________________________________

Seed users (preloaded:

Role		Email					ID
Employee	juan01@gmail.com		1
Manager		rodri02@gmail.com		2
Employee	beydi03@gmail.com		3

________________________________________

Authentication (design decision)
JWT and ASP.NET Identity are not used.
Instead:
•	Simple login by email
•	The backend returns the user data
•	The frontend sends the X-User-Id header in each request
________________________________________

Business rules implemented
•	An employee cannot have approved vacations that overlap
•	Requests for more than 15 consecutive days are automatically rejected
•	Only managers can approve or reject
•	An employee can only delete pending and their own requests
These rules live in the service layer, not in the controllers.
________________________________________

Frontend (React)

Technologies used
•	React 18
•	TypeScript
•	Vite
•	Axios
•	Tailwind CSS
•	React Context API (auth)

________________________________________

Frontend structure:

frontend/
├── src/
│ ├── api/
│ ├── context/
│ ├── pages/
│ ├── types/
│ ├── App.tsx
│   └── main.tsx
└── index.css
________________________________________

How to run the frontend

Requirements:
•	Node.js 18+
Steps:

cd frontend
npm install
npm run dev

The application will be available at:
http://localhost:5173
________________________________________

Communication with the backend
•	Centralized Axios (src/api/axios.ts)
•	The X-User-Id header is automatically added after login
•	Error handling displayed directly in the UI
________________________________________

Frontend role management:
•	Employee
	o	Create requests
	o	View only your requests
•	Manager
	o	View all requests
	o	Approve / Reject
The UI adapts dynamically according to the user's role.
________________________________________

UI/UX
•	Tailwind CSS for responsive design
•	Simple, clear, and accessible components
•	Visual feedback for statuses and errors
________________________________________

Testing: 
•	At least one frontend test is included (form validation)
•	The structure allows for easy scaling to more tests

Seed users (preloaded):

Role		Email					ID
Employee	juan01@gmail.com		1
Manager		rodri02@gmail.com		2
Employee	beydi03@gmail.com		3


