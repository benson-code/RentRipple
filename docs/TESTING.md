# Testing Guide

## Overview

本專案使用 Vitest 作為測試框架，搭配 React Testing Library 進行組件測試。

## Test Stack

- **Test Runner**: Vitest
- **Test Utilities**: @testing-library/react
- **Test Environment**: jsdom
- **Assertion Library**: Vitest (內建)
- **Mocking**: Vitest (內建)

## Running Tests

### All Tests
```bash
npm test
```

### Watch Mode
```bash
npm test -- --watch
```

### Coverage Report
```bash
npm run test:coverage
```

### UI Mode
```bash
npm run test:ui
```

---

## Test Structure

### Test Files Location

```
src/
├── components/
│   ├── __tests__/
│   │   ├── PropertyDetails.test.jsx
│   │   ├── ImageCarousel.test.jsx
│   │   ├── ContactFooter.test.jsx
│   │   ├── PropertyShowcase.test.jsx
│   │   └── ErrorBoundary.test.jsx
│   └── *.jsx
└── utils/
    ├── __tests__/
    │   ├── sanitize.test.js
    │   └── propertyAPI.test.js
    └── *.js
```

### Naming Convention

- Test files: `*.test.js` or `*.test.jsx`
- Test location: `__tests__/` directory next to source files
- Describe blocks: Component or function name
- Test names: Descriptive of the behavior being tested

---

## Test Coverage

### Current Coverage

| File | Statements | Branches | Functions | Lines |
|------|------------|----------|-----------|-------|
| PropertyDetails.jsx | ✅ High | ✅ High | ✅ High | ✅ High |
| ImageCarousel.jsx | ✅ High | ✅ Medium | ✅ High | ✅ High |
| ContactFooter.jsx | ✅ High | ✅ High | ✅ High | ✅ High |
| PropertyShowcase.jsx | ✅ High | ✅ Medium | ✅ High | ✅ High |
| ErrorBoundary.jsx | ✅ High | ✅ High | ✅ High | ✅ High |
| sanitize.js | ✅ High | ✅ High | ✅ High | ✅ High |
| propertyAPI.js | ✅ High | ✅ High | ✅ High | ✅ High |

### Coverage Goals

- **Statements**: ≥ 80%
- **Branches**: ≥ 75%
- **Functions**: ≥ 80%
- **Lines**: ≥ 80%

---

## Writing Tests

### Component Testing Pattern

```javascript
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import MyComponent from '../MyComponent'

describe('MyComponent', () => {
  it('renders correctly', () => {
    render(<MyComponent prop="value" />)
    expect(screen.getByText('value')).toBeInTheDocument()
  })
})
```

### Router Testing Pattern

```javascript
import { BrowserRouter } from 'react-router-dom'

const renderWithRouter = (component) => {
  return render(<BrowserRouter>{component}</BrowserRouter>)
}

describe('Component with routing', () => {
  it('navigates correctly', () => {
    renderWithRouter(<MyComponent />)
    // Test routing behavior
  })
})
```

### API Mocking Pattern

```javascript
import { vi } from 'vitest'
import * as api from '../api'

vi.mock('../api')

describe('API tests', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('calls API correctly', async () => {
    api.getData.mockResolvedValue({ data: 'test' })
    // Test API interaction
  })
})
```

### Async Testing Pattern

```javascript
import { waitFor } from '@testing-library/react'

it('handles async operations', async () => {
  render(<AsyncComponent />)

  await waitFor(() => {
    expect(screen.getByText('Loaded')).toBeInTheDocument()
  })
})
```

---

## Test Categories

### Unit Tests

測試單一組件或函數的功能。

**Examples:**
- `sanitize.test.js` - 測試 sanitization 函數
- `PropertyDetails.test.jsx` - 測試 PropertyDetails 組件渲染

### Integration Tests

測試多個組件或模組的協作。

**Examples:**
- `PropertyShowcase.test.jsx` - 測試組件整合和資料流
- `propertyAPI.test.js` - 測試 API 整合

### Error Handling Tests

測試錯誤處理和邊界情況。

**Examples:**
- `ErrorBoundary.test.jsx` - 測試錯誤邊界
- API error scenarios in `propertyAPI.test.js`

---

## Testing Best Practices

### ✅ Do

1. **Test behavior, not implementation**
   ```javascript
   // Good
   expect(screen.getByText('Submit')).toBeInTheDocument()

   // Avoid
   expect(component.state.isSubmitting).toBe(false)
   ```

2. **Use meaningful test descriptions**
   ```javascript
   // Good
   it('displays error message when form is submitted without required fields', () => {})

   // Avoid
   it('test 1', () => {})
   ```

3. **Test user interactions**
   ```javascript
   import { fireEvent } from '@testing-library/react'

   fireEvent.click(screen.getByRole('button'))
   expect(mockHandler).toHaveBeenCalled()
   ```

4. **Clean up after tests**
   ```javascript
   beforeEach(() => {
     vi.clearAllMocks()
     localStorage.clear()
   })
   ```

5. **Use data-testid sparingly**
   ```javascript
   // Prefer semantic queries
   screen.getByRole('button', { name: /submit/i })

   // Use data-testid only when necessary
   screen.getByTestId('custom-widget')
   ```

### ❌ Don't

1. **Don't test implementation details**
2. **Don't rely on DOM structure**
3. **Don't write tests that break on refactoring**
4. **Don't ignore async warnings**
5. **Don't mock everything**

---

## Common Test Patterns

### Testing Loading States

```javascript
it('shows loading state initially', () => {
  render(<AsyncComponent />)
  expect(screen.getByText('Loading...')).toBeInTheDocument()
})
```

### Testing Error States

```javascript
it('displays error message on failure', async () => {
  mockAPI.getData.mockRejectedValue(new Error('Failed'))

  render(<Component />)

  await waitFor(() => {
    expect(screen.getByText(/error/i)).toBeInTheDocument()
  })
})
```

### Testing Forms

```javascript
import userEvent from '@testing-library/user-event'

it('submits form with user input', async () => {
  const user = userEvent.setup()
  const onSubmit = vi.fn()

  render(<Form onSubmit={onSubmit} />)

  await user.type(screen.getByLabelText('Name'), 'John')
  await user.click(screen.getByRole('button', { name: /submit/i }))

  expect(onSubmit).toHaveBeenCalledWith({ name: 'John' })
})
```

### Testing Accessibility

```javascript
it('has accessible form labels', () => {
  render(<MyForm />)

  expect(screen.getByLabelText('Email')).toBeInTheDocument()
  expect(screen.getByRole('button', { name: 'Submit' })).toBeInTheDocument()
})
```

---

## Mocking

### Mocking Modules

```javascript
vi.mock('../api', () => ({
  getData: vi.fn(),
  postData: vi.fn(),
}))
```

### Mocking Components

```javascript
vi.mock('../ChildComponent', () => ({
  default: () => <div>Mocked Component</div>
}))
```

### Mocking Browser APIs

```javascript
global.fetch = vi.fn()

// In test
fetch.mockResolvedValue({
  ok: true,
  json: async () => ({ data: 'test' })
})
```

### Mocking localStorage

```javascript
beforeEach(() => {
  localStorage.clear()
})

it('saves to localStorage', () => {
  localStorage.setItem('key', 'value')
  expect(localStorage.getItem('key')).toBe('value')
})
```

---

## Debugging Tests

### Run Single Test

```bash
npm test -- ComponentName
```

### Run Single File

```bash
npm test -- ComponentName.test.jsx
```

### Debug in VS Code

Add to `.vscode/launch.json`:
```json
{
  "type": "node",
  "request": "launch",
  "name": "Vitest Debug",
  "runtimeExecutable": "npm",
  "runtimeArgs": ["test", "--", "--run"],
  "console": "integratedTerminal"
}
```

### View Coverage HTML Report

```bash
npm run test:coverage
open coverage/index.html
```

---

## CI/CD Integration

### GitHub Actions Example

```yaml
name: Tests
on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npm test
      - run: npm run test:coverage
```

---

## Troubleshooting

### Tests Fail in CI but Pass Locally

**Possible causes:**
- Environment differences
- Timing issues with async tests
- Missing dependencies

**Solutions:**
- Add `waitFor` for async operations
- Check CI environment variables
- Ensure all dependencies are in package.json

### "Not wrapped in act(...)" Warning

**Solution:**
```javascript
await waitFor(() => {
  expect(screen.getByText('Updated')).toBeInTheDocument()
})
```

### Memory Leaks

**Solution:**
```javascript
afterEach(() => {
  vi.clearAllMocks()
  vi.clearAllTimers()
  cleanup() // If using older versions
})
```

---

## Resources

- [Vitest Documentation](https://vitest.dev/)
- [React Testing Library](https://testing-library.com/react)
- [Testing Best Practices](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)

---

**Last Updated**: 2025-10-05
**Maintained by**: BangkokMRT Team
