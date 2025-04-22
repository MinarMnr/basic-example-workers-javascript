# JavaScript Web Workers Demo

This repository demonstrates the power of Web Workers in JavaScript for running CPU-intensive tasks without blocking the main UI thread.

## 🔍 What are Web Workers?

Web Workers provide a simple way to run scripts in background threads. The worker thread can perform tasks without interfering with the user interface. Web Workers are useful for performing processor-intensive calculations without freezing the UI.

## 🚀 Demo Features

- **Comparative Performance**: See the difference between calculations run on the main thread vs. Web Workers
- **UI Responsiveness Test**: Demonstrate how Web Workers keep the UI responsive
- **Time Measurement**: Compare execution times
- **Fibonacci Calculator**: Uses the recursive Fibonacci algorithm as a demonstration of CPU-intensive work

## 🖥️ How to Run

Due to security restrictions in modern browsers, Web Workers cannot be run directly from `file://` URLs. You'll need to serve the files through a web server:

### Option 1: Using Python's built-in server

```bash
# If you have Python 3:
python -m http.server 8000

# If you have Python 2:
python -m SimpleHTTPServer 8000
```

Then visit: http://localhost:8000

### Option 2: Using Node.js

First, install http-server globally:

```bash
npm install -g http-server
```

Then run:

```bash
http-server -p 8000
```

And visit: http://localhost:8000

### Option 3: Using VS Code Live Server

If you're using Visual Studio Code:
1. Install the "Live Server" extension
2. Right-click on `index.html`
3. Select "Open with Live Server"

## 📑 Code Structure

The demo consists of:

- **index.html**: Contains both the UI and the main JavaScript code
- **Web Worker**: Created inline using a Blob URL to avoid local file access issues
- **Fibonacci calculation**: Used as an example of a CPU-intensive task

## 🔧 How It Works

1. **Worker Creation**: The worker is created using a Blob URL to avoid cross-origin issues
2. **Message Passing**: Data is passed between the main thread and worker using `postMessage()`
3. **Calculation**: The same Fibonacci function runs either on the main thread or in the worker
4. **UI Updates**: The UI shows real-time status and results

## 🧪 Try It Yourself

1. Enter a number in the input field (try values between 35-45 for a noticeable effect)
2. Click "Calculate with Worker" to run the calculation in a Web Worker
3. Click "Calculate on Main Thread" to run the same calculation without a worker
4. Use the "Click Me!" button to test if the UI remains responsive

## 📚 Further Reading

- [MDN Web Docs: Web Workers API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API)
- [HTML Living Standard: Web Workers](https://html.spec.whatwg.org/multipage/workers.html)
- [JavaScript.info: Web Workers](https://javascript.info/web-workers)

## 📝 License

MIT
