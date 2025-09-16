# Contributing to Maiths AI Girlfriend Frontend 💖

Thank you for your interest in contributing to the Maiths AI Girlfriend project! We welcome contributions from developers who want to help make AI companionship more beautiful and accessible.

## 🤝 Ways to Contribute

- 🐛 **Bug Reports** - Help us identify and fix issues
- ✨ **Feature Requests** - Suggest new features or improvements
- 💻 **Code Contributions** - Submit bug fixes or new features
- 📖 **Documentation** - Improve our docs and guides
- 🎨 **Design Improvements** - Make the interface even cuter!
- 🌐 **Translations** - Help make Maiths available in more languages

## 🚀 Getting Started

### Prerequisites

- Node.js 16 or higher
- npm or yarn
- Git
- A code editor (VS Code recommended)

### Setting Up Your Development Environment

1. **Fork the repository**
   ```bash
   # Click the "Fork" button on GitHub, then clone your fork
   git clone https://github.com/YOUR-USERNAME/maiths-ai-gf-frontend.git
   cd maiths-ai-gf-frontend
   ```

2. **Add the upstream remote**
   ```bash
   git remote add upstream https://github.com/ORIGINAL-OWNER/maiths-ai-gf-frontend.git
   ```

3. **Install dependencies**
   ```bash
   npm install
   ```

4. **Start the development server**
   ```bash
   npm start
   ```

5. **Verify everything works**
   - Open http://localhost:3000
   - The cute interface should load properly
   - Check browser console for any errors

## 📝 Development Guidelines

### Code Style

We use the following tools to maintain code quality:

- **TypeScript** - For type safety
- **ESLint** - For code linting
- **Prettier** - For code formatting
- **Husky** - For git hooks

Before committing, run:
```bash
npm run lint      # Check for linting issues
npm run format    # Format code with Prettier
npm run type-check # Verify TypeScript types
```

### Component Guidelines

1. **Use TypeScript** - All components should be properly typed
2. **Follow React Hooks** - Use functional components with hooks
3. **Responsive Design** - Ensure components work on all screen sizes
4. **Accessibility** - Use semantic HTML and ARIA attributes
5. **Animation** - Use Framer Motion for smooth animations

### Example Component Structure

```typescript
import React from 'react';
import { motion } from 'framer-motion';

interface MyComponentProps {
  title: string;
  isVisible?: boolean;
  onAction?: () => void;
}

export const MyComponent: React.FC<MyComponentProps> = ({
  title,
  isVisible = true,
  onAction
}) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: isVisible ? 1 : 0 }}
      className="cute-component"
    >
      <h2 className="text-pink-600 font-semibold">{title}</h2>
      {onAction && (
        <button 
          onClick={onAction}
          className="bg-gradient-to-r from-pink-400 to-purple-500 text-white px-4 py-2 rounded-lg"
        >
          Click me! 💖
        </button>
      )}
    </motion.div>
  );
};
```

### Commit Guidelines

We follow [Conventional Commits](https://www.conventionalcommits.org/):

```bash
# Format: type(scope): description

feat(chat): add emoji picker to message input
fix(ui): resolve mobile responsiveness issues
docs(readme): update installation instructions
style(theme): improve gradient color combinations
refactor(api): simplify backend service error handling
test(components): add unit tests for ChatMessage component
```

**Types:**
- `feat` - New features
- `fix` - Bug fixes
- `docs` - Documentation changes
- `style` - UI/styling changes
- `refactor` - Code refactoring
- `test` - Adding tests
- `chore` - Maintenance tasks

## 🎨 Design Principles

### Visual Guidelines

1. **Color Palette**
   - Primary: Pink (#EC4899, #F472B6)
   - Secondary: Purple (#8B5CF6, #A855F7)
   - Accent: Light pink/purple gradients
   - Text: Dark gray (#374151) on light backgrounds

2. **Typography**
   - Headers: Bold, friendly fonts
   - Body: Clean, readable fonts
   - Emojis: Use generously for personality! 💖

3. **Animations**
   - Smooth, gentle transitions
   - Playful micro-interactions
   - Floating elements for whimsy
   - Never jarring or overwhelming

4. **User Experience**
   - Intuitive navigation
   - Responsive design
   - Fast loading times
   - Accessible to all users

## 🐛 Reporting Bugs

When reporting bugs, please include:

1. **Clear Description** - What happened vs. what you expected
2. **Steps to Reproduce** - Detailed steps to recreate the issue
3. **Environment Info** - OS, browser, Node.js version
4. **Screenshots** - If applicable, show the issue visually
5. **Console Logs** - Any error messages from browser console

### Bug Report Template

```markdown
**Bug Description:**
A clear description of what the bug is.

**To Reproduce:**
1. Go to '...'
2. Click on '....'
3. Scroll down to '....'
4. See error

**Expected Behavior:**
What you expected to happen.

**Screenshots:**
If applicable, add screenshots.

**Environment:**
- OS: [e.g. macOS, Windows, Linux]
- Browser: [e.g. Chrome, Firefox, Safari]
- Version: [e.g. 22]
- Node.js Version: [e.g. 18.15.0]

**Additional Context:**
Any other context about the problem.
```

## ✨ Feature Requests

We love new ideas! When suggesting features:

1. **Check Existing Issues** - Avoid duplicates
2. **Describe the Problem** - What user need does this address?
3. **Propose a Solution** - How would you implement it?
4. **Consider Alternatives** - Any other ways to solve this?
5. **Mock-ups Welcome** - Visual ideas are helpful!

### Feature Request Template

```markdown
**Is your feature request related to a problem?**
A clear description of what the problem is.

**Describe the solution you'd like:**
A clear description of what you want to happen.

**Describe alternatives you've considered:**
Alternative solutions or features you've considered.

**Additional context:**
Any other context, screenshots, or mockups.

**Would you like to implement this feature?**
Let us know if you're interested in contributing the code!
```

## 🔄 Pull Request Process

1. **Create a Feature Branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```

2. **Make Your Changes**
   - Write clean, documented code
   - Add tests if applicable
   - Update documentation

3. **Test Everything**
   ```bash
   npm test
   npm run build
   npm run lint
   ```

4. **Commit Your Changes**
   ```bash
   git add .
   git commit -m "feat(chat): add amazing new feature"
   ```

5. **Push and Create PR**
   ```bash
   git push origin feature/amazing-feature
   ```
   
   Then create a pull request on GitHub.

### PR Guidelines

- **Clear Title** - Describe what the PR does
- **Detailed Description** - Explain the changes and why
- **Link Issues** - Reference any related issues
- **Screenshots** - Show UI changes visually
- **Test Coverage** - Ensure tests pass
- **Documentation** - Update docs if needed

### PR Template

```markdown
## Description
Brief description of what this PR does.

## Type of Change
- [ ] Bug fix (non-breaking change that fixes an issue)
- [ ] New feature (non-breaking change that adds functionality)
- [ ] Breaking change (would cause existing functionality to not work)
- [ ] Documentation update

## How Has This Been Tested?
- [ ] Unit tests
- [ ] Integration tests
- [ ] Manual testing

## Screenshots (if applicable):
Add screenshots to show the changes.

## Checklist:
- [ ] My code follows the project's style guidelines
- [ ] I have performed a self-review of my code
- [ ] I have commented my code, particularly in hard-to-understand areas
- [ ] I have made corresponding changes to the documentation
- [ ] My changes generate no new warnings
- [ ] Any dependent changes have been merged and published
```

## 🧪 Testing

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage

# Run specific test file
npm test ChatMessage.test.tsx
```

### Writing Tests

We use Jest and React Testing Library:

```typescript
import { render, screen, fireEvent } from '@testing-library/react';
import { ChatMessage } from './ChatMessage';

describe('ChatMessage', () => {
  it('renders user message correctly', () => {
    render(
      <ChatMessage 
        message="Hello Maiths!"
        sender="user"
        timestamp={new Date()}
      />
    );
    
    expect(screen.getByText('Hello Maiths!')).toBeInTheDocument();
  });

  it('shows typing animation for bot messages', () => {
    render(
      <ChatMessage 
        message="Typing..."
        sender="bot"
        timestamp={new Date()}
        isTyping={true}
      />
    );
    
    expect(screen.getByTestId('typing-indicator')).toBeInTheDocument();
  });
});
```

## 📦 Release Process

1. **Version Bump** - Update package.json version
2. **Changelog** - Update CHANGELOG.md with new features/fixes
3. **Build Test** - Ensure production build works
4. **Tag Release** - Create git tag for the version
5. **GitHub Release** - Create release with notes
6. **Deploy** - Update demo site (if applicable)

## 🆘 Getting Help

- **GitHub Discussions** - For questions and general discussions
- **GitHub Issues** - For bugs and feature requests
- **Discord/Slack** - (If we have a community server)
- **Email** - For private questions

## 🎉 Recognition

Contributors will be:
- Listed in our CONTRIBUTORS.md file
- Mentioned in release notes
- Given credit in documentation
- Invited to join our contributor's Discord (if applicable)

## 📜 Code of Conduct

This project follows the [Contributor Covenant Code of Conduct](CODE_OF_CONDUCT.md). By participating, you agree to uphold this code.

### Our Standards

- **Be Respectful** - Treat everyone with kindness
- **Be Inclusive** - Welcome people of all backgrounds
- **Be Constructive** - Focus on helping the project grow
- **Be Patient** - Remember we're all volunteers
- **Have Fun!** - This is about creating something beautiful together 💖

## 💖 Thank You!

Every contribution makes Maiths more wonderful! Whether you're fixing a typo, adding a feature, or just providing feedback, you're helping create better AI companionship experiences.

**Happy coding! 🚀💕**
