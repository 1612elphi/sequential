# sequential

Esolang based on pattern manipulation with a TIS-100 inspired syntax.

Sequential is a dynamic, hybrid programming language designed for the noir sci-fi world of Onyx Black - a far future that's really just the 1960s in space. It's the in-universe language used to program Semi-Linear Computers (SLCs), capable of running in both analog and digital modes. Features include:

- Pattern-based programming with sequence manipulation
- Hybrid analog/digital data processing capabilities
- Register-based architecture with special 'PILE' stack operations
- Unique 'magnetic autotape' inspired memory model
- Designed to bridge the gap between analog and digital computing

This project provides a web-based interpreter for Sequential, allowing users to write, execute, and visualise basic Sequential code in a browser environment.

## Key Concepts

1. **Patterns**: The basic unit of code in Sequential. Each pattern is a named sequence of instructions.
2. **Sequences**: Defined collections of patterns that determine the order of execution.
3. **Registers**: Storage locations for data. Sequential uses a register-based architecture.
4. **PILE**: A stack-like structure for temporary data storage. Think a FILO clipboard.
5. **Magnetic Autotape**: The conceptual model for memory in Sequential, inspired by analog tape storage.

## Supported Operations

Sequential supports a variety of operations, including:

### Pattern and Sequence Control

- `SEQD`: Define a sequence of patterns
- `PTIN`: Initialize a new pattern
- `PEND`: End a pattern definition
- `PSTR`: Start executing patterns from the sequence definition

### Data Manipulation

- `INIT`: Initialize a register with a value
- `MOVE`: Move data between registers or from a literal to a register
- `LIFT`: Push a value onto the PILE
- `DROP`: Pop a value from the PILE into a register or to output (TTY0)

### Arithmetic Operations

- `ADDV`: Add values
- `SUBV`: Subtract values
- `MULT`: Multiply values
- `DIVV`: Divide values (integer division)
- `INCR`: Increment a value
- `DECR`: Decrement a value

### Control Flow

- `WAIT`: Pause execution, simulating waiting for input
- `PJMP`: Jump to a specific pattern

## Example Program

```
SEQD
    INITSEQ
    CALCSEQ
    OUTPUTSEQ
SEQD

PTIN INITSEQ
    INIT X 5
    INIT Y 3
    MOVE "Hello, Sequential!" ECHO
    LIFT ECHO
PEND

PTIN CALCSEQ
    ADDV X Y
    MULT X Y
    INCR X
    DECR Y
PEND

PTIN OUTPUTSEQ
    DROP TTY0
    MOVE X ECHO
    LIFT ECHO
    MOVE Y ECHO
    LIFT ECHO
    WAIT
PEND
```

This program initializes two registers, performs some calculations, outputs a message, and then outputs the final values of the registers.

## Using the Interpreter

1. Enter your Sequential code in the provided text area.
2. Click the "Run Code" button to execute the program.
3. The output will be displayed in the "Output" section.
4. The final state of all registers will be shown in individual boxes in the "Registers" section.
5. Check the browser's log for more details on control flow and state.

## Technical Details

This interpreter is implemented in JavaScript and runs entirely in the browser. It provides a simplified simulation of a Semi-Linear Computer, focusing on the core concepts of Sequential without implementing the full complexity of analog/digital hybrid computation. It does not support mode switching or +/- operation prefixing, but I aim to include these in future releases.

### Limitations

- This interpreter operates in a purely digital mode and does not simulate analog operations.
- Some advanced features of Sequential, such as interrupt handling, are not implemented.
- The interpreter does not implement a true magnetic autotape system; instead, it uses JavaScript objects to simulate memory.
- Conditional operations using the TEST and +/- instructions are not implemented.

## Contributing

Contributions to improve the interpreter, add new features, or expand the Sequential language specification are welcome. Please feel free to submit issues or pull requests.

## License

GPL3

## Acknowledgements

Onyx Black is a fictional world created by Ruby Morgan Voigt. If you'd like to read more about Onyx Black, check out Last Edited, an encyclopaedic thriller made to expand and explain the world in greater detail. Find Last Edited at https://almanet.cc/.
