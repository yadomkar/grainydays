
# GrainyDays

GrainyDays is an interactive web application designed for movie enthusiasts. Leveraging The Movie Database (TMDb) API, it offers an engaging platform to search, explore, and learn more about their favorite movies. With features like detailed movie information, users can immerse themselves in the world of cinema like never before.

## Features

- **Search Functionality**: Easily find movies with a user-friendly search interface.
- **Movie Details**: Click on any movie card to view extended movie details in a modal.

## Getting Started

Follow these instructions to get a copy of GrainyDays up and running on your local machine for development and testing purposes.

### Prerequisites

- Docker

### Installation

GrainyDays can be run using Docker, making setup and execution straightforward. Here's how to get it running:

1. **Clone the Repository**

   Start by cloning the repository to your local machine:

   ```sh
   git clone [https://github.com/yourusername/grainydays.git](https://github.com/yadomkar/grainydays.git)
   cd grainydays
   ```

2. **Environment Variables**

   Set up your `.env` file with the necessary environment variables, including your TMDb API key:

   ```plaintext
   TMDB_API_KEY=your_api_key_here
   ```

3. **Using Docker**

   To start the project with Docker, ensure you have Docker installed and running on your machine. 

   Run the following command in the directory where the `docker-compose.yml` file is located to build and start the container:

   ```sh
   docker-compose up --build
   ```

   Once the build is complete and the server is running, visit `http://localhost:3000` in your web browser to start exploring movies with GrainyDays.

## Contributing

We welcome contributions to GrainyDays! If you have suggestions for improvements or bug fixes, feel free to make a pull request or open an issue.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- The Movie Database (TMDb) for providing the API used in this project.
