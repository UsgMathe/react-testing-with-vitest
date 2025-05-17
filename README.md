## Configurar o Vitest:

#### 1. Instalar as dependências necessárias

```bash
npm i -D @testing-library/dom @testing-library/jest-dom @testing-library/react @testing-library/user-event jsdom vitest
```

#### 2. Configurar o `vitest.config.js`

```js
import { defineConfig } from 'vite';

export default defineConfig({
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './vitest-setup.js',
  },
});
```

#### 3. Configurar o `vitest-setup.js`

```js
import '@testing-library/jest-dom/vitest';

import { afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';

afterEach(() => {
  cleanup();
});
```

#### 4. Configurar o `src/types/vitest.d.ts`

```ts
import '@testing-library/jest-dom';

declare module 'vitest' {
  interface Assertion<T = any> extends jest.Matchers<void, T> {}
}
```

#### 5. Configurar o `tsconfig.app.json`

```json
{
  "compilerOptions": {
    "..."
    "types": [
      "vitest",
      "@testing-library/jest-dom"
    ],
    "..."
  },
  "include": [
    "src",
    "src/types"
  ],
  "..."
}
```

- `Exemplo`

```tsx
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';
import { Button } from './button';

describe('Button', () => {
  test('renders with correct content', () => {
    const content = 'Click me!';
    render(<Button>{content}</Button>);
    const button = screen.getByRole('button', { name: content });
    expect(button).toHaveTextContent(content);
  });

  test('calls an callback function on click', () => {
    const callbackFn = vi.fn();
    render(<Button onClick={callbackFn} />);
    const button = screen.getByRole('button');
    fireEvent.click(button);
    expect(callbackFn).toBeCalledTimes(1);
  });
});
```
