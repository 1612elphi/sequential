class SequentialInterpreter {
  constructor() {
    this.registers = {};
    this.patterns = {};
    this.sequence = [];
    this.output = "";
  }

  interpret(code) {
    console.log("Interpreting code:", code);
    this.registers = {};
    this.patterns = {};
    this.sequence = [];
    this.output = "";

    const lines = code.split("\n");
    let currentPattern = null;
    let inSequence = false;

    for (let line of lines) {
      line = line.trim();
      if (line === "" || line.startsWith(";")) continue;

      const tokens = line.split(/\s+/);
      const instruction = tokens[0].toUpperCase();

      console.log("Processing instruction:", instruction);

      switch (instruction) {
        case "SEQD":
          if (!inSequence) {
            inSequence = true;
          } else {
            inSequence = false;
          }
          break;
        case "PTIN":
          currentPattern = tokens[1];
          this.patterns[currentPattern] = [];
          break;
        case "PEND":
          currentPattern = null;
          break;
        default:
          if (inSequence) {
            this.sequence.push(tokens[0]);
          } else if (currentPattern) {
            this.patterns[currentPattern].push(tokens);
          }
          break;
      }
    }

    console.log("Sequence:", this.sequence);
    console.log("Patterns:", this.patterns);

    this.executeSequence();
  }

  executeSequence() {
    for (let patternName of this.sequence) {
      console.log("Executing pattern:", patternName);
      if (this.patterns[patternName]) {
        this.executePattern(this.patterns[patternName]);
      } else {
        console.log("Pattern not found:", patternName);
      }
    }
  }

  executePattern(pattern) {
    for (let instruction of pattern) {
      this.executeInstruction(instruction);
    }
  }

  executeInstruction(instruction) {
    const [op, ...args] = instruction;
    console.log("Executing instruction:", op, args);

    switch (op) {
      case "INIT":
        this.registers[args[0]] = parseInt(args[1]) || 0;
        break;
      case "MOVE":
        if (args[0].startsWith('"')) {
          // It's a string literal
          let stringValue = args.join(" ");
          let lastQuoteIndex = stringValue.lastIndexOf('"');
          if (lastQuoteIndex > 0) {
            let value = stringValue.substring(1, lastQuoteIndex);
            let destination = args[args.length - 1];
            this.registers[destination] = value;
          } else {
            console.error("Malformed string literal in MOVE instruction");
          }
        } else {
          this.registers[args[1]] = this.getRegisterValue(args[0]);
        }
        break;
      case "LIFT":
        this.registers["PILE"] = this.registers["PILE"] || [];
        this.registers["PILE"].push(this.getRegisterValue(args[0]));
        break;
      case 'DROP':
          if (this.registers['PILE'] && this.registers['PILE'].length > 0) {
              const value = this.registers['PILE'].pop();
              if (args[0] === 'TTY0') {
                  this.output += value + '\n';
              } else {
                  this.registers[args[0]] = value;
              }
          }
          break;
      case "ADDV":
        this.registers[args[0]] += this.getRegisterValue(args[1]);
        break;
      case "SUBV":
        this.registers[args[0]] -= this.getRegisterValue(args[1]);
        break;
      case "MULT":
        this.registers[args[0]] *= this.getRegisterValue(args[1]);
        break;
      case "DIVV":
        this.registers[args[0]] = Math.floor(
          this.registers[args[0]] / this.getRegisterValue(args[1]),
        );
        break;
      case "INCR":
        this.registers[args[0]]++;
        break;
      case "DECR":
        this.registers[args[0]]--;
        break;
      case 'WAIT':
          this.output += `Waiting for input...\n`;
          break;
      default:
        this.output += `Unknown instruction: ${op}\n`;
    }
  }

  getRegisterValue(arg) {
    return this.registers[arg] !== undefined
      ? this.registers[arg]
      : isNaN(arg)
        ? arg
        : parseInt(arg);
  }
}

// UI Interaction
document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM fully loaded and parsed");
    const runButton = document.getElementById('runButton');
    const codeInput = document.getElementById('codeInput');
    const outputArea = document.getElementById('outputArea');
    const registerArea = document.getElementById('registerArea');

    runButton.addEventListener('click', () => {
        console.log("Run button clicked");
        const code = codeInput.value;
        const interpreter = new SequentialInterpreter();
        try {
            interpreter.interpret(code);

            // Display output
            console.log("Output:", interpreter.output);
            outputArea.textContent = interpreter.output || "No output generated.";

            // Display registers
            console.log("Registers:", interpreter.registers);
            registerArea.innerHTML = '';
            for (let [key, value] of Object.entries(interpreter.registers)) {
                const registerBox = document.createElement('div');
                registerBox.className = 'register-box';
                
                const registerName = document.createElement('div');
                registerName.className = 'register-name';
                registerName.textContent = key;
                
                const registerValue = document.createElement('div');
                registerValue.className = 'register-value';
                
                const registerType = document.createElement('div');
                registerType.className = 'register-type';
                
                if (key === 'PILE') {
                    registerValue.textContent = `[${value.join(', ')}]`;
                    registerType.textContent = 'Array';
                } else if (typeof value === 'number') {
                    registerValue.textContent = value;
                    registerType.textContent = 'Number';
                } else if (typeof value === 'string') {
                    registerValue.textContent = `"${value}"`;
                    registerType.textContent = 'String';
                } else {
                    registerValue.textContent = value;
                    registerType.textContent = 'Unknown';
                }
                
                registerBox.appendChild(registerName);
                registerBox.appendChild(registerValue);
                registerBox.appendChild(registerType);
                
                registerArea.appendChild(registerBox);
            }
            
            if (registerArea.children.length === 0) {
                registerArea.innerHTML = "No registers used.";
            }

        } catch (error) {
            console.error("Error during interpretation:", error);
            outputArea.textContent = `Error: ${error.message}`;
        }
    });
});
