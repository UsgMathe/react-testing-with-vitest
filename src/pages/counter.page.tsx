import { useState } from 'react';
import { Button } from '../components/button';

export interface CounterPageProps {
  initial?: number;
  min?: number;
  max?: number;
}
export function CounterPage({ initial = 0, min, max }: CounterPageProps) {
  const [counter, setCounter] = useState<number>(initial);

  const handleIncrement = () => {
    setCounter(counter => {
      if (max && counter >= max) return counter;
      return counter + 1;
    });
  };
  const handleDecrement = () => {
    setCounter(counter => {
      if (min && counter <= min) return counter;
      return counter - 1;
    });
  };

  return (
    <div className="min-h-screen min-w-screen flex flex-col items-center justify-center gap-2">
      <div className="flex items-center justify-center  gap-10 text-white">
        <Button
          disabled={counter == min}
          className="!w-fit"
          onClick={handleDecrement}
        >
          -
        </Button>

        <p
          data-testid="counter"
          className="text-4xl border py-4 px-6 rounded-md  bg-neutral-900 text-purple-500 border-purple-800"
        >
          {counter}
        </p>

        <Button
          disabled={counter == max}
          className="!w-fit"
          onClick={handleIncrement}
        >
          +
        </Button>
      </div>
    </div>
  );
}
