# Contributing to Nc E-commerce Platform

Thank you for your interest in contributing to Nc! This guide will help you get started.

## Code of Conduct

- Be respectful and inclusive
- Follow best practices
- Write clean, maintainable code
- Add tests for new features
- Update documentation

## Development Workflow

### 1. Fork & Clone
```bash
git clone https://github.com/YOUR_USERNAME/Nc.git
cd Nc
```

### 2. Create a Branch
```bash
git checkout -b feature/your-feature-name
```

Branch naming convention:
- `feature/` - New features
- `fix/` - Bug fixes
- `docs/` - Documentation updates
- `refactor/` - Code refactoring
- `test/` - Test updates

### 3. Make Changes
- Write clean, TypeScript-compliant code
- Follow existing code style
- Add JSDoc comments for functions
- Update tests

### 4. Test Your Changes
```bash
# Type check
npm run type-check

# Lint code
npm run lint

# Run tests
npm run test

# Build to ensure no errors
npm run build
```

### 5. Commit Changes
Use conventional commits:
```bash
git commit -m "feat: add voice search feature"
git commit -m "fix: resolve cart calculation bug"
git commit -m "docs: update API documentation"
```

Commit types:
- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation
- `style:` - Code style (formatting)
- `refactor:` - Code refactoring
- `test:` - Tests
- `chore:` - Build/tooling

### 6. Push & Create PR
```bash
git push origin feature/your-feature-name
```

Create a Pull Request with:
- Clear title
- Description of changes
- Related issue number (if any)
- Screenshots (for UI changes)

## Code Style

### TypeScript
- Use TypeScript strict mode
- Avoid `any` type (use `unknown` if needed)
- Define interfaces for data structures
- Use type guards

### React/Next.js
- Use functional components
- Prefer Server Components when possible
- Use TypeScript with React hooks
- Follow Next.js 15 best practices

### NestJS
- Use dependency injection
- Create DTOs for validation
- Use guards for authorization
- Follow module-based architecture

## Project Structure

```
/
├── apps/           # Frontend applications
├── packages/       # Shared packages
├── services/       # Backend microservices
└── docs/           # Documentation
```

## Testing

### Unit Tests
```typescript
describe('calculateTrustScore', () => {
  it('should return correct trust score', () => {
    const score = calculateTrustScore({
      returnRate: 0.05,
      dispatchSpeed: 0.9,
      authenticity: 0.85,
      customerRating: 4.2
    });
    expect(score).toBeGreaterThan(80);
  });
});
```

### Integration Tests
Test API endpoints with real database connections (test DB).

## Pull Request Guidelines

### PR Checklist
- [ ] Code follows style guidelines
- [ ] Tests added/updated
- [ ] Documentation updated
- [ ] Type check passes
- [ ] Linter passes
- [ ] Build succeeds
- [ ] No breaking changes (or documented)

### Review Process
1. Automated checks run (CI/CD)
2. Code review by maintainers
3. Requested changes addressed
4. PR approved and merged

## Security

### Reporting Vulnerabilities
Do NOT create public issues for security vulnerabilities.

Email: security@nc-ecommerce.in

Include:
- Description of vulnerability
- Steps to reproduce
- Potential impact
- Suggested fix (if any)

## License

By contributing, you agree that your contributions will be licensed under the project's license.

## Questions?

- Open a discussion: https://github.com/abhijeetraiiit/Nc/discussions
- Email: dev@nc-ecommerce.in

Thank you for contributing! 🙏
