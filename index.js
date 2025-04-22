<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Fibonacci with Web Workers</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        max-width: 800px;
        margin: 0 auto;
        padding: 20px;
      }
      .container {
        display: flex;
        flex-direction: column;
        gap: 20px;
      }
      .input-group {
        display: flex;
        align-items: center;
        gap: 10px;
      }
      button {
        padding: 8px 16px;
        background-color: #4CAF50;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
      }
      button:hover {
        background-color: #45a049;
      }
      input {
        padding: 8px;
        width: 100px;
      }
      .result {
        margin-top: 20px;
        padding: 15px;
        background-color: #f5f5f5;
        border-radius: 4px;
        min-height: 20px;
      }
      .status {
        font-style: italic;
        color: #666;
      }
      .comparison {
        display: flex;
        gap: 20px;
      }
      .column {
        flex: 1;
        padding: 15px;
        background-color: #f9f9f9;
        border-radius: 4px;
      }
    </style>
  </head>
  <body>
    <h1>Fibonacci Calculator with Web Workers</h1>
    <p>Calculate Fibonacci numbers with and without Web Workers to see the difference.</p>
    
    <div class="container">
      <div class="input-group">
        <label for="number">Enter a number (try 35-45):</label>
        <input id="number" type="number" value="35" min="1" max="50" />
      </div>
      
      <div class="comparison">
        <div class="column">
          <h2>With Web Worker</h2>
          <p>UI remains responsive while calculating</p>
          <button id="workerButton">Calculate with Worker</button>
          <div id="workerResult" class="result">Result will appear here</div>
          <p id="workerStatus" class="status"></p>
        </div>
        
        <div class="column">
          <h2>Without Web Worker</h2>
          <p>UI freezes while calculating</p>
          <button id="mainButton">Calculate on Main Thread</button>
          <div id="mainResult" class="result">Result will appear here</div>
          <p id="mainStatus" class="status"></p>
        </div>
      </div>
      
      <div>
        <h3>UI Responsiveness Test</h3>
        <p>Click this button repeatedly to test if the UI is responsive:</p>
        <button id="testButton">Click Me!</button>
        <span id="clickCount">0</span> clicks
      </div>
    </div>

    <script>
      let worker = null;
      let clickCount = 0;
      
      // Create worker with inline script to avoid local file access issues
      function createWorker() {
        const workerScript = `
          self.onmessage = function(e) {
            const num = parseInt(e.data);
            const startTime = performance.now();
            
            const result = fibonacci(num);
            const endTime = performance.now();
            
            self.postMessage({
              input: num,
              result: result,
              time: (endTime - startTime).toFixed(2)
            });
          };

          function fibonacci(n) {
            if (n <= 1) return n;
            return fibonacci(n - 1) + fibonacci(n - 2);
          }
        `;
        
        const blob = new Blob([workerScript], { type: 'application/javascript' });
        return new Worker(URL.createObjectURL(blob));
      }
      
      // Fibonacci function for main thread
      function fibonacci(n) {
        if (n <= 1) return n;
        return fibonacci(n - 1) + fibonacci(n - 2);
      }
      
      document.getElementById("workerButton").addEventListener("click", function() {
        const value = parseInt(document.getElementById("number").value);
        
 
        if (worker) {
          worker.terminate();
        }
        
   
        worker = createWorker();
        
   
        document.getElementById("workerStatus").textContent = "Calculating...";
        document.getElementById("workerResult").textContent = "Working...";
        

        const startTime = performance.now();
        

        worker.postMessage(value);
        
        // Handle worker response
        worker.onmessage = function(e) {
          const endTime = performance.now();
          const data = e.data;
          
          document.getElementById("workerResult").textContent = 
            `Fibonacci(${data.input}) = ${data.result}\nCalculation time: ${data.time} ms`;
          document.getElementById("workerStatus").textContent = "Done!";
        };
        
        worker.onerror = function(e) {
          document.getElementById("workerStatus").textContent = "Error: " + e.message;
        };
      });
      
      document.getElementById("mainButton").addEventListener("click", function() {
        const value = parseInt(document.getElementById("number").value);
        
    
        document.getElementById("mainStatus").textContent = "Calculating...";
        document.getElementById("mainResult").textContent = "Working...";
        

        setTimeout(() => {
          const startTime = performance.now();
          
   
          const result = fibonacci(value);
          
          const endTime = performance.now();
          const time = (endTime - startTime).toFixed(2);
          
          document.getElementById("mainResult").textContent = 
            `Fibonacci(${value}) = ${result}\nCalculation time: ${time} ms`;
          document.getElementById("mainStatus").textContent = "Done!";
        }, 10);
      });
      
      document.getElementById("testButton").addEventListener("click", function() {
        clickCount++;
        document.getElementById("clickCount").textContent = clickCount;
      });
    </script>
  </body>
</html>
