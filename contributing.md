# Contributing to StageCraft

Thank you for your interest in contributing to StageCraft! We are building a robust, digital-first ticketing and seat reservation platform designed to handle high-demand events like concerts, sports, and theatre performances. Built to thrive under the spotlight of thousands of concurrent users, our system ensures can pay securely, and receive instant QR code tickets without the chaos of traditional ticketing systems.

## Code of Conduct

By participating in this project, you agree to abide by our commitment to:
- **Sustainability First**: Prioritize environmental impact in all decisions
- **Inclusive Community**: Welcome developers of all backgrounds and experience levels
- **Quality Code**: Maintain high standards for code quality and documentation
- **Transparency**: Be open about challenges and celebrate successes together

## Getting Started

### Prerequisites

Before contributing, ensure you have:
- **Node.js** (v20.19.0 or higher)
- **npm** (v10.0.0 or higher)
- **Git** configured with your GitHub account
- Basic knowledge of React, JavaScript, and TailwindCSS

### Development Setup

1. **Fork the repository**
   ```bash
   # Click "Fork" on GitHub, then clone your fork
   git clone https://github.com/YOUR_USERNAME/StageCraft.git
   cd StageCraft
   ```

2. **Add upstream remote**
   ```bash
   git remote add upstream  clone https://github.com/ZEED2468/StageCraft.git
   cd StageCraft
   ```

3. **Install dependencies**
   ```bash
   # Frontend setup
   cd client
   npm install
   
   # Backend setup (when available)
   cd ../server
   npm install
   ```

4. **Start development servers**
   ```bash
   # Frontend (in client directory)
   npm run dev
   
   # Backend (in server directory, when available)
   npm run dev
   ```

## Branch Strategy

We use a **Git Flow** inspired branching model optimized for continuous integration:

### Branch Types

#### `main` Branch
- **Purpose**: Production-ready code
- **Protection**: Protected branch, requires PR approval
- **Deployment**: Auto-deploys to production environment

#### `develop` Branch
- **Purpose**: Integration branch for features
- **Protection**: Protected branch, requires PR approval
- **Deployment**: Auto-deploys to staging environment

#### Feature Branches: `feat/feature-name`
- **Purpose**: New features and enhancements
- **Naming**: `feat/eco-badges`, `feat/vendor-dashboard`
- **Base**: Created from `develop`
- **Merge**: Back to `develop` via PR

#### Bugfix Branches: `fix/issue-description`
- **Purpose**: Bug fixes for non-critical issues
- **Naming**: `fix/cart-calculation-error`
- **Base**: Created from `develop`
- **Merge**: Back to `develop` via PR

#### Hotfix Branches: `hotfix/critical-issue`
- **Purpose**: Critical production fixes
- **Naming**: `hotfix/security-vulnerability`
- **Base**: Created from `main`
- **Merge**: To both `main` and `develop` via PR

### Branch Naming Conventions

```bash
# Features
feat/landing-page
feat/google-auth
feat/user-registration

# Bug fixes
fix/hero-layout
fix/responsive-header-layout

# Hotfixes
hotfix/payment-security-patch
hotfix/data-validation-error

## Pull Request Process

### Before Creating a PR

1. **Sync with upstream**
   ```bash
   git fetch upstream
   git checkout develop
   git merge upstream/develop
   ```

2. **Create your feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Make your changes**
   - Follow coding standards
   - Write tests for new features
   - Update documentation

4. **Test your changes**
   ```bash
   npm run test
   npm run lint
   npm run build
   ```

5. **Commit your changes**
   ```bash
   git add .
   git commit -m "feat: add CO₂ impact calculation for products"
   ```

### PR Creation Guidelines

#### PR Title Format
Use [Conventional Commits](https://www.conventionalcommits.org/) format:

```
feat: add real-time CO₂ tracking to shopping cart
fix: resolve vendor dashboard loading issue
docs: update API documentation for eco-badges
style: improve responsive design for mobile devices
refactor: optimize product filtering performance
test: add unit tests for impact calculation
```

#### PR Description Template

```markdown
## Description
Brief description of what this PR accomplishes and why it's needed.

## Type of Change
- [ ]  New feature (non-breaking change that adds functionality)
- [ ]  Bug fix (non-breaking change that fixes an issue)
- [ ]  Breaking change (fix or feature that would cause existing functionality to not work as expected)
- [ ]  Documentation update
- [ ]  Style/UI improvement
- [ ]  Performance improvement

## Testing
- [ ] Unit tests added/updated
- [ ] Integration tests added/updated
- [ ] Manual testing completed
- [ ] All existing tests pass

## Screenshots (if applicable)
Add screenshots or GIFs showing the changes

## Sustainability Impact
Describe how this change contributes to the project's sustainability goals

## Checklist
- [ ] Code follows project style guidelines
- [ ] Self-review completed
- [ ] Code is commented where necessary
- [ ] Documentation updated
- [ ] No new warnings introduced
- [ ] Responsive design verified
- [ ] Accessibility standards met
```

### PR Review Process

1. **Automated Checks**
   - ✅ All tests pass
   - ✅ Linting passes
   - ✅ Build succeeds
   - ✅ Security scan passes

2. **Code Review**
   -  At least 1 reviewer approval required
   -  Focus on code quality, sustainability impact
   -  Constructive feedback and suggestions

3. **Merge Requirements**
   - ✅ All conversations resolved
   - ✅ Branch is up to date with base branch
   - ✅ No merge conflicts
