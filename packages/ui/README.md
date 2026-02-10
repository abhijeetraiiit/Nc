# @nc/ui

Shared React component library for the Nc e-commerce platform.

## Components

### Button
Brutal-style button with thick borders and offset shadows.

```tsx
import { Button } from '@nc/ui';

<Button variant="primary" size="md">
  Shop Now
</Button>
```

### Bento Grid
Modern grid layout for content organization.

```tsx
import { BentoGrid, BentoItem } from '@nc/ui';

<BentoGrid columns={3}>
  <BentoItem span={2}>Featured Content</BentoItem>
  <BentoItem>Small Item</BentoItem>
</BentoGrid>
```

### Product Card
Neubrutalism-style product display card.

```tsx
import { ProductCard } from '@nc/ui';

<ProductCard
  title="Red Banarasi Saree"
  price={2499}
  mrp={4999}
  image="/product.jpg"
  badge="Trending"
/>
```

### Trust Score Badge
Displays vendor trust score with visual indicator.

```tsx
import { TrustScoreBadge } from '@nc/ui';

<TrustScoreBadge score={85} showLabel />
```
