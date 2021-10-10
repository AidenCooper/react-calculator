import React from 'react'

import { useState } from 'react'

const Calculator = () => {
    const [output, setOutput] = useState('')
    const [result, setResult] = useState('')
    const [color, setColor] = useState('#49ff53')

    const isNumber = (character) => {
        return character >= '0' && character <= '9'
    }

    const containsOperator = (expression) => {
        return expression.includes('+') || expression.includes('-') || expression.includes('*') || expression.includes('/')
    }

    const clickNumber = (number) => {
        if(!isNumber(output.slice(-1))) {
            setColor('white')
        }

        const value = output.concat(number)
        setOutput(value)

        if(containsOperator(value)) {
            // Risky : still represents eval()
            setResult(Function('"use strict";return ' + value)().toString());
        }
    }

    const clickOperator = (operator) => {
        if(!isNumber(output.slice(-1))) {
            return
        }
        
        if(operator === '='){
            if(result.length === 0) {
                setColor('#49ff53')
            } else {
                setOutput(result)
                setResult('')
                setColor('#49ff53')
            }
        } else {
            if(operator === '×'){
                operator = '*'
            } else if (operator === '÷') {
                operator = '/'
            }

            setOutput(output.concat(operator))
            setResult('')

            if(color !== 'white') {
                setColor('white')
            }
        }
    }

    const clickClear = () => {
        setOutput('')
        setResult('')
        setColor('#49ff53')
    }

    return (
        <div className='calculator'>
            <input className='calculator-output' type='text' value={output} style={{ height: '11%', color: color }} disabled={true} />
            <input className='calculator-output calculator-result' type='text' value={result} style={{ height: '11%' }} disabled={true} />

            <div className='calculator-btns'>
                <button className='calculator-btn calculator-number' onClick={ () => clickNumber('7') }>7</button>
                <button className='calculator-btn calculator-number' onClick={ () => clickNumber('8') }>8</button>
                <button className='calculator-btn calculator-number' onClick={ () => clickNumber('9') }>9</button>
                <button className='calculator-btn calculator-operator' onClick={ () => clickOperator('÷') }>÷</button>

                <button className='calculator-btn calculator-number' onClick={ () => clickNumber('4') }>4</button>
                <button className='calculator-btn calculator-number' onClick={ () => clickNumber('5') }>5</button>
                <button className='calculator-btn calculator-number' onClick={ () => clickNumber('6') }>6</button>
                <button className='calculator-btn calculator-operator' onClick={ () => clickOperator('×') }>×</button>

                <button className='calculator-btn calculator-number' onClick={ () => clickNumber('1') }>1</button>
                <button className='calculator-btn calculator-number' onClick={ () => clickNumber('2') }>2</button>
                <button className='calculator-btn calculator-number' onClick={ () => clickNumber('3') }>3</button>
                <button className='calculator-btn calculator-operator' onClick={ () => clickOperator('-') }>-</button>
                
                <button className='calculator-btn calculator-clear' onClick={ () => clickClear() }>C</button>
                <button className='calculator-btn calculator-number' onClick={ () => clickNumber('0') }>0</button>
                <button className='calculator-btn calculator-operator' onClick={ () => clickOperator('=') } style={{ backgroundColor: '#009708', color: 'white' }}>=</button>
                <button className='calculator-btn calculator-operator' onClick={ () => clickOperator('+') } >+</button>
            </div>
        </div>
    )
}

export default Calculator
