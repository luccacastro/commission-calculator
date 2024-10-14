# Commission Calculator Widget

This project is a React application that provides a Commission Calculator Widget. The widget allows users to calculate their commission based on a given revenue amount using either mock data or data fetched from an API.

## Features

- **Toggle Data Source**: Switch between using mock data or live API data for calculations.
- **Commission Calculation**: Calculates commission based on various revenue brackets.
- **Loading State**: Displays loading states while waiting for API responses.
- **Breakdown Display**: Shows a detailed breakdown of the commission earned in each revenue band.

## How It Works

The Commission Calculator Widget allows users to calculate their commission based on a given revenue amount. Users can select either a mock data source or fetch data from an API to see the results. The widget consists of various components like inputs, buttons, and tables that together provide an interactive experience for the user. When you enter a revenue amount and click "Calculate", the widget processes the data according to different commission schemes and displays the total commission along with a detailed breakdown for each revenue band.

The widget shows a loading state while the calculation is being performed, enhancing the user experience by indicating when data is being fetched or processed.

## Setup Instructions

### Prerequisites

To run the project locally, you need the following installed:

- [Node.js](https://nodejs.org/) (version 14 or higher)
- [npm](https://www.npmjs.com/) or [Yarn](https://yarnpkg.com/)
- [Cypress](https://www.cypress.io/) for testing (optional)

### Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/your-username/commission-calculator-widget.git
   cd commission-calculator-widget
   ```

2. Install the dependencies:

   ```sh
   npm install
   ```

   or, if using Yarn:

   ```sh
   yarn install
   ```

### Running the Project

To run the project in development mode:

```sh
npm run dev
```

or, if using Yarn:

```sh
yarn dev
```

By default, the project runs on [http://localhost:5173](http://localhost:5173).

### Running Cypress Tests

To run the Cypress end-to-end tests:

1. Start the development server:

   ```sh
   npm run dev
   ```

2. Open Cypress:

   ```sh
   npx cypress open
   ```

3. Run the tests from the Cypress Test Runner.

## Usage

Once the application is running, you can:

- Enter a revenue amount.
- Choose between different commission schemes.
- Click "Calculate" to see the commission results and the breakdown.
- Toggle between using mock data and fetching real data from the API.

## Technologies Used

- **React** with **TypeScript** for building the UI components.
- **Axios** for making API requests.
- **Tailwind CSS** for styling.
- **Cypress** for end-to-end testing.

