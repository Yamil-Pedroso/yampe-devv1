# Contributing to Yampe-devv1

Thank you for your interest in contributing to this portfolio project! This document provides guidelines and instructions for contributing.

## 🌟 Code of Conduct

- Be respectful and constructive in all interactions
- Focus on what is best for the project and community
- Show empathy towards other community members

## 🚀 Getting Started

1. **Fork and Clone**
   ```bash
   git clone https://github.com/YOUR_USERNAME/yampe-devv1.git
   cd yampe-devv1
   ```

2. **Install Dependencies**
   ```bash
   # Backend
   cd portfolio-api
   npm install
   
   # Frontend
   cd ../portfolio-web
   npm install --legacy-peer-deps
   ```
   
   > **Note:** Use `--legacy-peer-deps` for the frontend due to a peer dependency conflict.

3. **Set Up Environment**
   - Follow the setup instructions in [README.md](./README.md)
   - Create appropriate `.env` files from examples

## 📝 Development Guidelines

### Code Style

- **TypeScript**: Use TypeScript for all new code
- **Formatting**: Follow the existing code style in the project
- **Naming**: Use descriptive variable and function names
  - Components: PascalCase (e.g., `MyComponent`)
  - Functions/variables: camelCase (e.g., `myFunction`)
  - Constants: UPPER_CASE (e.g., `API_URL`)

### Frontend (portfolio-web)

- Use functional components with hooks
- Keep components small and focused
- Use Framer Motion for animations consistently
- Follow the existing project structure
- Run linter before committing: `npm run lint`

### Backend (portfolio-api)

- Use Express routing conventions
- Keep routes modular in separate files
- Add appropriate error handling
- Document API endpoints with comments
- Use TypeScript types/interfaces

## 🔧 Making Changes

1. **Create a Branch**
   ```bash
   git checkout -b feature/your-feature-name
   # or
   git checkout -b fix/your-bug-fix
   ```

2. **Make Your Changes**
   - Write clean, readable code
   - Add comments for complex logic
   - Update documentation if needed

3. **Test Your Changes**
   ```bash
   # Frontend
   cd portfolio-web
   npm run build
   npm run lint
   
   # Backend
   cd portfolio-api
   npm run build
   ```

4. **Commit Your Changes**
   ```bash
   git add .
   git commit -m "feat: add new feature" # or "fix: fix bug"
   ```

   Use conventional commit messages:
   - `feat:` - New feature
   - `fix:` - Bug fix
   - `docs:` - Documentation changes
   - `style:` - Formatting, missing semicolons, etc.
   - `refactor:` - Code refactoring
   - `test:` - Adding tests
   - `chore:` - Maintenance tasks

5. **Push and Create PR**
   ```bash
   git push origin feature/your-feature-name
   ```
   Then open a Pull Request on GitHub.

## 🐛 Reporting Bugs

When reporting bugs, please include:

- Clear description of the issue
- Steps to reproduce
- Expected behavior
- Actual behavior
- Screenshots (if applicable)
- Environment details (OS, Node version, etc.)

## 💡 Suggesting Features

Feature suggestions are welcome! Please:

- Check if the feature already exists or is planned
- Explain the use case and benefits
- Provide examples if possible

## 📋 Pull Request Process

1. Ensure your code builds without errors
2. Update documentation if you've changed APIs or added features
3. The PR should work with both development and production environments
4. Link any related issues in the PR description
5. Wait for review and address any feedback

## ❓ Questions?

If you have questions:
- Check the [README.md](./README.md) first
- Open an issue with the "question" label
- Reach out via the contact form on [yampe.dev](https://yampe.dev)

## 🙏 Thank You!

Your contributions help make this project better. Every contribution, no matter how small, is valued and appreciated!
