# Build a Simple To-Do List Application

Create a basic To-Do List application that allows users to perform CRUD (Create, Read, Update, Delete) operations on their tasks.

### Task Requirements:
    1. Database - Create "tasks" table with the following fields:
        - id (Primary Key)
        - title (String)
        - description (Text, nullable)
        - is_completed (Boolean, default: false)
        - created_at (Timestamp)
        - updated_at (Timestamp)
    2. Routes
        - Getting all tasks (GET /tasks)
        - Creating a new task (POST /task)
        - Deleting a task (DELETE /tasks/{id})
    3. View (ReactJs / VueJs)
        - Listing all tasks with options to edit and delete each task.
        - A form to create or edit tasks.
    4. Bonus (Optional)
        - Form validation: ensure that the "title" field is required and has a maximum length of 255 characters.
        - use [SWR](https://swr.vercel.app/docs/api) for lazy loading tasks.

## Additional Criteria
    1. Code readability and organization.
    2. MVC Structure

# Stack
- The backend must be implemented using the Laravel(PHP) framework, NodeJS (Express) or Go(Fiber).
- Use a MySQL, SQLite or PostgreSQL database.
- The frontend must be implemented in React (you can use InertiaJS for Laravel) or Vue. Typescript is not necessary. 
- You can use TailwindCSS if you prefer for styling the frontend.

## Additional Information
- Automated tests are NOT required.
- The frontend does not have to look pretty, but it should be usable.
- Overall Timeline: 2 to 4 hours
- Please make sure we can easily run the project locally. Include a README file that briefly explains all necessary steps, that differ from a standard setup.
- Push your final solution to a public Git repository and share the link.
- Please complete the task and submit your solution by Monday at 18:00.