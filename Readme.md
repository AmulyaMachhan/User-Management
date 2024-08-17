# User Management

This project is a user management web application. The application consists of two main pages: a Dashboard page and a People Directory page.

## Features

### 1. Dashboard Page
- **Navigation**: Includes a navbar and a sidebar for easy access.
- **Welcome Message**: Displays a welcome message for the user.

### 2. People Directory Page
- **Fully Featured Table**: 
  - **Sortable Columns**: Columns can be sorted in three states: Initial, Ascending, and Descending order.
  - **Row Details**: Each row is clickable, and clicking on it opens a side pane with more details about that person.
  - **Edit Functionality**: Each row has an edit button that opens a form. The form uses `react-hook-form` along with `zod` for form controls and validation.
  - **Filtering**: The table can be filtered based on Role or Team.
  - **Search Bar**: Implements a global search filter with substring matching on any of the fields present in the table.
  - **Add Member**: A form to add a new entry to the table.
  - **Delete Functionality**: The delete button removes the entry from the table.

- **State Management**: 
  - The state is reflected in the URL for search, filter, and row selection. For example, when searching for a name like 'Olivia', the URL reflects it as `app.people.com/people?query=Olivia`.

## Tech Stack
- **Frontend**:
  - React
  - TanStack Table for table interactions
  - Tailwind CSS for styling
  - react-hook-form and zod for form handling and validation

- **Backend**:
  - Fake data generation using Faker.js

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/user-management.git
    ```

2. Navigate to the project directory:

    ```bash
    cd user-management
    ```
    
Install the dependencies:
bash
Copy code
npm install
Start the development server:
bash
Copy code
npm run dev
## Usage

- Visit the Dashboard page upon opening the web app.
- Navigate to the People Directory to view, edit, add, and delete user entries.

## Screenshots

_Screenshots of the application can be added here._

## Contributing

If you wish to contribute, please fork the repository and submit a pull request. For major changes, please open an issue first to discuss what you would like to change.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

For any inquiries or feedback, feel free to contact me at [your-email@example.com](mailto:your-email@example.com).
