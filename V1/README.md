# Personal Website - Data Scientist & Photographer

A minimal, elegant personal website showcasing data science work, photography, and blog posts.

## Project Structure 


## Setup Instructions

### Method 1: Direct File Opening (Simplest)

1. **Create the file structure** as shown above
2. **Save each file** in its appropriate location
3. **Open index.html** directly in your browser

### Method 2: Using a Local Server (Recommended)

#### Option A: Using Visual Studio Code with Live Server

1. **Install Visual Studio Code**: [https://code.visualstudio.com/](https://code.visualstudio.com/)
2. **Install the Live Server extension**:
   - Open VS Code
   - Go to Extensions (Ctrl+Shift+X)
   - Search for "Live Server" by Ritwick Dey
   - Click "Install"
3. **Open your website folder** in VS Code
4. **Start the server**:
   - Right-click on `index.html`
   - Select "Open with Live Server"
   - Your website will open at `http://127.0.0.1:5500/`

#### Option B: Using Python's built-in HTTP server

1. **Open a terminal/command prompt**
2. **Navigate to your website folder**:
   ```
   cd path/to/your/website/folder
   ```
3. **Start the server**:
   - For Python 3:
     ```
     python -m http.server
     ```
   - For Python 2:
     ```
     python -m SimpleHTTPServer
     ```
4. **Open your browser** and go to:
   ```
   http://localhost:8000
   ```

## Customization

1. **Personal Information**:
   - Replace "Your Name" with your actual name throughout the files
   - Update page titles and descriptions
   - Add your real social media links in the footer

2. **Content**:
   - Replace placeholder text with your actual content
   - Add your own images to the `images` folder

3. **Design**:
   - Modify colors in the CSS `:root` variables in `style.css`
   - Adjust fonts, spacing, or layout as needed

4. **Social Icons**:
   - The site uses Font Awesome for icons
   - Replace `your-code.js` in the script tag with your actual Font Awesome kit code
   - Get a free kit at [Font Awesome](https://fontawesome.com/)

## Browser Compatibility

This website is designed to work on modern browsers including:
- Chrome
- Firefox
- Safari
- Edge

## License

All rights reserved © 2023