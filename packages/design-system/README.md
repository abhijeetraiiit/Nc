# @nc/design-system

Neubrutalism design system for the Nc e-commerce platform.

## Features

- **Bold, High-Contrast Colors** - Black, bright accents, pure white backgrounds
- **Brutal Shadows** - Thick, offset shadows (8px 8px 0px)
- **Thick Borders** - 4-6px solid borders for emphasis
- **Modern Typography** - Inter Variable & Space Grotesk
- **Responsive Breakpoints** - Mobile-first design system

## Usage

```typescript
import { colors, shadows, typography } from '@nc/design-system';

// Use in your components
const Button = styled.button`
  background: ${colors.primary};
  box-shadow: ${shadows.brutal};
  border: ${borders.brutal};
  font-family: ${typography.fontFamily.primary};
`;
```

### Tailwind Integration

```javascript
// tailwind.config.js
const { tailwindTheme } = require('@nc/design-system');

module.exports = {
  theme: {
    extend: tailwindTheme,
  },
};
```

## Design Tokens

### Colors
- Primary: `#000000` (Black)
- Secondary: `#FF3366` (Hot Pink)
- Accent: `#00FF88` (Mint Green)
- Warning: `#FFD700` (Gold)

### Shadows
- `brutal`: `8px 8px 0px #000000`
- `brutalSm`: `4px 4px 0px #000000`
- `brutalLg`: `12px 12px 0px #000000`

### Typography
- Primary Font: Inter Variable
- Display Font: Space Grotesk
- Mono Font: JetBrains Mono
