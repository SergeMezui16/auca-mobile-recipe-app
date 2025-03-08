import React, { useState } from 'react';
import { View } from 'react-native';

import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';

export default function Calculator() {
  const [currentOperation, setCurrentOperation] = useState('');
  const [display, setDisplay] = useState('0');
  const [firstNumber, setFirstNumber] = useState('');
  const [operation, setOperation] = useState('');
  const [newNumber, setNewNumber] = useState(false);

  const handleNumber = (num: string) => {
    if (display === '0' || newNumber) {
      setDisplay(num);
      setNewNumber(false);
    } else {
      setDisplay(display + num);
    }

    if (operation) {
      setCurrentOperation(`${firstNumber} ${operation} ${newNumber ? num : display + num}`);
    }
  };

  const handleOperation = (op: string) => {
    if (operation && !newNumber) {
      calculate();
      return;
    }
    setFirstNumber(display);
    setOperation(op);
    setNewNumber(true);
    setCurrentOperation(`${display} ${op}`);
  };

  const calculate = () => {
    if (!operation || !firstNumber) return;

    const num1 = parseFloat(firstNumber);
    const num2 = parseFloat(display);
    let result = 0;

    switch (operation) {
      case '+':
        result = num1 + num2;
        break;
      case '-':
        result = num1 - num2;
        break;
      case '×':
        result = num1 * num2;
        break;
      case '÷':
        result = num2 !== 0 ? num1 / num2 : 0;
        break;
      case '%':
        result = (num1 * num2) / 100;
        break;
    }

    const finalResult = result.toString();
    setDisplay(finalResult);
    setCurrentOperation(`${firstNumber} ${operation} ${display} =`);
    setOperation('');
    setFirstNumber(finalResult);
    setNewNumber(true);
  };

  const clear = () => {
    setDisplay('0');
    setFirstNumber('');
    setOperation('');
    setNewNumber(false);
    setCurrentOperation('');
  };

  const handleDecimal = () => {
    if (newNumber) {
      setDisplay('0.');
      setNewNumber(false);
      return;
    }
    if (!display.includes('.')) {
      setDisplay(display + '.');
    }
  };

  const buttons = [
    ['C', '±', '%', '÷'],
    ['7', '8', '9', '×'],
    ['4', '5', '6', '-'],
    ['1', '2', '3', '+'],
    ['0', '.', '='],
  ];

  return (
    <View className="flex-1 bg-background p-4">
      {/* Display Area */}
      <View className="mb-4 rounded-lg bg-secondary p-4">
        {/* Operation Display */}
        <Text size="lg" className="mb-2 min-h-[30] text-right text-muted-foreground">
          {currentOperation}
        </Text>
        {/* Result Display */}
        <Text size="2xl" className="text-right">
          {display}
        </Text>
      </View>

      {/* Keypad */}
      <View className="flex-1 gap-2">
        {buttons.map((row, i) => (
          <View key={i} className="flex-row gap-2">
            {row.map((btn) => (
              <Button
                key={btn}
                variant={
                  ['÷', '×', '-', '+', '='].includes(btn)
                    ? 'default'
                    : ['C', '±', '%'].includes(btn)
                      ? 'secondary'
                      : 'outline'
                }
                className={`flex-1 ${btn === '0' ? 'flex-[2]' : ''} aspect-square`}
                onPress={() => {
                  if (btn === 'C') clear();
                  else if (btn === '=') calculate();
                  else if (['+', '-', '×', '÷', '%'].includes(btn)) handleOperation(btn);
                  else if (btn === '±') {
                    setDisplay((prev) => (parseFloat(prev) * -1).toString());
                    if (operation) {
                      setCurrentOperation(
                        `${firstNumber} ${operation} ${(parseFloat(display) * -1).toString()}`
                      );
                    }
                  } else if (btn === '.') handleDecimal();
                  else handleNumber(btn);
                }}>
                <Text
                  size="xl"
                  className={
                    ['÷', '×', '-', '+', '='].includes(btn) ? 'text-primary-foreground' : ''
                  }>
                  {btn}
                </Text>
              </Button>
            ))}
          </View>
        ))}
      </View>
    </View>
  );
}
