# Govee Lights Control Web Interface

![Govee Lights Control](./preview.png)

This repository contains a web interface built with Vite that allows you to control Govee lights using the Govee API. With this interface, you can easily change colors, adjust brightness, and manage various settings for your Govee lights. This application is not affialiated with Govee.

## Getting Started

Follow these steps to set up the project on your local machine.

### Prerequisites

- Node.js and npm installed on your machine.

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/GregLtrnr/govee-web-interface.git
   ```

2. Navigate to the project directory:

   ```bash
   cd govee-web-interface
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

### Configuration

1. Obtain your Govee API key by following the [official Govee API documentation](https://developer.govee.com/).

2. Create a `.env` file in the project root and add your Govee API key:

   ```env
   VITE_GOVEE_API_KEY=your-govee-api-key
   ```

### Development

Run the development server:

```bash
npm run dev
```

Visit `http://localhost:3000` in your browser to access the Govee Lights Control web interface.

### Build

Build the project for production:

```bash
npm run build
```

The production-ready files will be available in the `dist` directory.

## Features

- Change colors dynamically.
- Adjust brightness levels.
- Manage various settings for your Govee lights.

## Contributing

If you would like to contribute to this project, please follow the guidelines in [CONTRIBUTING.md](CONTRIBUTING.md).

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## Acknowledgments

- Thanks to Govee for providing the API that makes this project possible.
- Inspiration for this project came from the desire to have a simple web interface for controlling Govee lights.

## Contact

For any inquiries or issues, please create an [issue](https://github.com/GregLtrnr/govee-web-interface/issues).

Happy lighting! 🌈💡
