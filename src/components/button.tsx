import type { ComponentProps } from 'react';

export function Button({ className, ...props }: ComponentProps<'button'>) {
  return (
    <button
      className={`bg-purple-600 px-5 py-3 min-w-32 max-w-xs w-full text-white font-medium cursor-pointer rounded-lg active:scale-[98%] hover:scale-[99%] hover:bg-purple-700 ${className} transition-[scale,background-color,outline,box-shadow] duration-100  shadow-lg hover:shadow-none`}
      {...props}
    />
  );
}
