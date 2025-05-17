import { useState } from 'react';
import { Button } from '../components/button';

export function CounterPage() {
  const [counter, setCounter] = useState<number>(0);

  return (
    <div className="min-h-screen min-w-screen flex flex-col items-center justify-center gap-2">
      <div className="flex items-center justify-center  gap-10 text-white">
        <Button
          className="!w-fit"
          onClick={() => setCounter(counter => counter - 1)}
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
          className="!w-fit"
          onClick={() => setCounter(counter => counter + 1)}
        >
          +
        </Button>
      </div>
    </div>
  );
}
