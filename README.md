# Feature Flicks The-Cinema

## Run Application

1. Type 'npm install' in the terminal.
2. Type 'npm run dev' in the terminal to run the application.

## Application Description:

Feature Flicks The-Cinema is a web application focuses on the frontend part of the development. It allows users to browse, select, and book movie tickets. Users can filter movies them by genre, and sort them in alphabetic order. The application provides an interface for selecting seats and booking tickets for upcoming screenings. After the booking, users will receive instant confirmation along with a unique booking number. The app also generates a receipt with details of the movie name, screening time, selected seats, and total price for reference. React, React Bootstrap and CSS have been used for this project.

### App.jsx:

- Main component is where the overall functionality of the application takes place.
- Fetches movie data from an API and manages state related to selected categories and sorting options.
- Renders the navigation bar and displays a list of movies based on selected filters.

### Main.jsx:

- Entry point of the application, rendering the root component within a React StrictMode.
- Sets up routing using React Router for different paths corresponding to various components like Bookmovie, ChooseSeats, and Receipt.

## Components Description

### MyNavbar Component:

- Represents the navigation bar of the application.
- Includes dropdowns for selecting movie categories and sorting options.
- Allows users to filter movies by category and sort them based on title.

### PopupWindow Component:

- Displays a popup window when the user attempts to proceed without selecting seats.
- Prompts the user to choose seats before continuing with the booking process.

### Receipt Component:

- Displays the booking receipt after successful booking.
- Shows details such as movie title, screening time, selected seats, total price, and booking number.
- Provides information about payment requirements and a farewell message.

### SortingMovies Component:

- Provides options to sort movies displayed in the application.
- Users can choose to sort movies alphabetically (A-Z or Z-A) based on their titles.

### TicketDropdown Component:

- Allows users to select the number of tickets for different age groups (child, senior, adult).
- Displays dropdowns for each ticket type with options to choose the quantity.
- Calculates and displays the total price based on the selected tickets.

### BookMovie Component:

- Handles the booking process for a selected movie.
- Retrieves movie details, screenings, and auditorium information from APIs.
- Displays movie information, including title, categories, duration, and available screenings.
- Allows users to choose a screening and proceed to select seats for booking.

### CategoryFilter Component:

- Provides a filter for movies based on categories.
- Displays a list of categories derived from the available movies.
- Allows users to select a category to filter movies accordingly.

### ChooseSeats Component:

- Provides the seat selection process for booking.
- Retrieves seat information and occupancy status from APIs.
- Displays available seats in the auditorium layout, allowing users to select seats.
- Provides options to choose the number of tickets for different age groups and calculates the total price.

### GenerateBookingNumber Function:

- Generates a random booking number for each successful booking.
- Creates a unique alphanumeric string of a specified length.

### Movie Component:

- Represents a movie card displayed in the movie list.
- Displays movie title, poster image, categories, and length.
- Allows users to click on the movie card to view details and book tickets.
